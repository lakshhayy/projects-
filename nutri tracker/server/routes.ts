import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { setupLocalAuth, isAuthenticated as isLocalAuthenticated } from "./localAuth";
import { generateMealRecommendations, generateNutritionInsights, analyzeFood } from "./openai";

// Fallback recommendation system when AI is unavailable
function generateFallbackRecommendations(mealType: string, userProfile: any, nutrition: any) {
  const recommendations = [];
  
  const calorieGoal = userProfile?.dailyCalorieGoal || 2000;
  const proteinGoal = userProfile?.dailyProteinGoal || 50;
  const remainingCalories = Math.max(0, calorieGoal - nutrition.totalCalories);
  const remainingProtein = Math.max(0, proteinGoal - nutrition.totalProtein);
  
  if (mealType === 'breakfast') {
    recommendations.push({
      title: "High-Protein Breakfast Bowl",
      description: "Start your day with sustained energy from protein and fiber-rich ingredients.",
      type: "meal_suggestion",
      priority: 1,
      estimatedCalories: Math.min(400, remainingCalories * 0.25),
      estimatedProtein: Math.min(25, remainingProtein * 0.3),
      estimatedCarbs: 30,
      estimatedFat: 15,
      ingredients: ["Greek yogurt", "berries", "granola", "nuts", "honey"],
      cookingTime: "5 minutes",
      difficulty: "easy"
    });
  } else if (mealType === 'lunch') {
    recommendations.push({
      title: "Balanced Protein Salad",
      description: "A nutrient-dense meal that provides sustained energy for your afternoon.",
      type: "meal_suggestion", 
      priority: 1,
      estimatedCalories: Math.min(500, remainingCalories * 0.4),
      estimatedProtein: Math.min(30, remainingProtein * 0.4),
      estimatedCarbs: 35,
      estimatedFat: 20,
      ingredients: ["chicken breast", "mixed greens", "quinoa", "avocado", "olive oil"],
      cookingTime: "15 minutes",
      difficulty: "easy"
    });
  } else if (mealType === 'dinner') {
    recommendations.push({
      title: "Lean Protein with Vegetables",
      description: "A satisfying dinner that completes your daily nutrition goals.",
      type: "meal_suggestion",
      priority: 1,
      estimatedCalories: Math.min(600, remainingCalories * 0.35),
      estimatedProtein: Math.min(35, remainingProtein * 0.4),
      estimatedCarbs: 40,
      estimatedFat: 18,
      ingredients: ["salmon", "broccoli", "sweet potato", "olive oil", "herbs"],
      cookingTime: "25 minutes",
      difficulty: "medium"
    });
  } else {
    recommendations.push({
      title: "Healthy Energy Snack",
      description: "A quick snack to fuel your body between meals.",
      type: "meal_suggestion",
      priority: 1,
      estimatedCalories: Math.min(200, remainingCalories * 0.1),
      estimatedProtein: Math.min(10, remainingProtein * 0.2),
      estimatedCarbs: 15,
      estimatedFat: 8,
      ingredients: ["apple", "almond butter", "cinnamon"],
      cookingTime: "2 minutes", 
      difficulty: "easy"
    });
  }
  
  return recommendations;
}

// Fallback nutrition insights when AI is unavailable
function generateFallbackInsights(userProfile: any, weeklyNutrition: any[], currentStreak: number) {
  const insights = [];
  
  const avgCalories = weeklyNutrition.reduce((sum, day) => sum + day.totalCalories, 0) / weeklyNutrition.length;
  const avgProtein = weeklyNutrition.reduce((sum, day) => sum + day.totalProtein, 0) / weeklyNutrition.length;
  const calorieGoal = userProfile?.dailyCalorieGoal || 2000;
  const proteinGoal = userProfile?.dailyProteinGoal || 50;
  
  if (avgCalories < calorieGoal * 0.8) {
    insights.push({
      title: "Increase Daily Calories",
      description: "Your average daily intake is below your goal. Consider adding healthy snacks or larger portions to meet your energy needs.",
      type: "nutrition_insight",
      priority: 2,
      actionable: true
    });
  }
  
  if (avgProtein < proteinGoal * 0.7) {
    insights.push({
      title: "Boost Protein Intake", 
      description: "Add more protein-rich foods like lean meats, eggs, legumes, or dairy to support your fitness goals.",
      type: "nutrition_insight",
      priority: 2,
      actionable: true
    });
  }
  
  if (currentStreak >= 5) {
    insights.push({
      title: "Great Tracking Consistency",
      description: `Excellent work maintaining a ${currentStreak}-day tracking streak! Consistency is key to reaching your nutrition goals.`,
      type: "nutrition_insight",
      priority: 5,
      actionable: false
    });
  }
  
  insights.push({
    title: "Weekly Progress Review",
    description: "Regular tracking helps identify patterns and make informed adjustments to your nutrition plan.",
    type: "nutrition_insight", 
    priority: 3,
    actionable: true
  });
  
  return insights;
}

import { 
  insertUserProfileSchema,
  insertFoodSchema,
  insertMealSchema,
  insertMealFoodSchema,
  insertRecommendationSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware - use local auth in development
  const isLocalDev = process.env.NODE_ENV === 'development' && !process.env.REPLIT_DOMAINS;
  const authMiddleware = isLocalDev ? isLocalAuthenticated : isAuthenticated;
  
  if (isLocalDev) {
    await setupLocalAuth(app);
  } else {
    await setupAuth(app);
  }

  // Auth routes
  app.get('/api/auth/user', authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // User Profile routes
  app.get('/api/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.getUserProfile(userId);
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.post('/api/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profileData = insertUserProfileSchema.parse({ ...req.body, userId });
      
      const existingProfile = await storage.getUserProfile(userId);
      let profile;
      
      if (existingProfile) {
        profile = await storage.updateUserProfile(userId, profileData);
      } else {
        profile = await storage.createUserProfile(profileData);
      }
      
      res.json(profile);
    } catch (error) {
      console.error("Error saving profile:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid profile data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to save profile" });
    }
  });

  // Food routes
  app.get('/api/foods/search', async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const foods = await storage.searchFoods(q);
      res.json(foods);
    } catch (error) {
      console.error("Error searching foods:", error);
      res.status(500).json({ message: "Failed to search foods" });
    }
  });

  app.get('/api/foods/popular', async (req, res) => {
    try {
      const foods = await storage.getPopularFoods();
      res.json(foods);
    } catch (error) {
      console.error("Error fetching popular foods:", error);
      res.status(500).json({ message: "Failed to fetch popular foods" });
    }
  });

  app.get('/api/foods/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid food ID" });
      }
      
      const food = await storage.getFood(id);
      if (!food) {
        return res.status(404).json({ message: "Food not found" });
      }
      
      res.json(food);
    } catch (error) {
      console.error("Error fetching food:", error);
      res.status(500).json({ message: "Failed to fetch food" });
    }
  });

  app.post('/api/foods', isAuthenticated, async (req, res) => {
    try {
      const foodData = insertFoodSchema.parse(req.body);
      const food = await storage.createFood(foodData);
      res.status(201).json(food);
    } catch (error) {
      console.error("Error creating food:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid food data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create food" });
    }
  });

  // Meal routes
  app.get('/api/meals', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { date } = req.query;
      
      if (!date || typeof date !== 'string') {
        return res.status(400).json({ message: "Date is required" });
      }
      
      const meals = await storage.getUserMealsByDate(userId, date);
      res.json(meals);
    } catch (error) {
      console.error("Error fetching meals:", error);
      res.status(500).json({ message: "Failed to fetch meals" });
    }
  });

  app.post('/api/meals', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const mealData = insertMealSchema.parse({ ...req.body, userId });
      
      const meal = await storage.createMeal(mealData);
      res.status(201).json(meal);
    } catch (error) {
      console.error("Error creating meal:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid meal data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create meal" });
    }
  });

  app.post('/api/meals/:id/foods', isAuthenticated, async (req: any, res) => {
    try {
      const mealId = parseInt(req.params.id);
      if (isNaN(mealId)) {
        return res.status(400).json({ message: "Invalid meal ID" });
      }
      
      const mealFoodData = insertMealFoodSchema.parse({ ...req.body, mealId });
      const mealFood = await storage.addFoodToMeal(mealFoodData);
      res.status(201).json(mealFood);
    } catch (error) {
      console.error("Error adding food to meal:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid meal food data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add food to meal" });
    }
  });

  app.delete('/api/meals/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const mealId = parseInt(req.params.id);
      
      if (isNaN(mealId)) {
        return res.status(400).json({ message: "Invalid meal ID" });
      }
      
      await storage.deleteMeal(mealId, userId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting meal:", error);
      res.status(500).json({ message: "Failed to delete meal" });
    }
  });

  // Nutrition summary route
  app.get('/api/nutrition/daily', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { date } = req.query;
      
      if (!date || typeof date !== 'string') {
        return res.status(400).json({ message: "Date is required" });
      }
      
      const nutrition = await storage.getUserDailyNutrition(userId, date);
      res.json(nutrition);
    } catch (error) {
      console.error("Error fetching daily nutrition:", error);
      res.status(500).json({ message: "Failed to fetch daily nutrition" });
    }
  });

  // Recommendations routes
  app.get('/api/recommendations', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const recommendations = await storage.getUserRecommendations(userId);
      res.json(recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      res.status(500).json({ message: "Failed to fetch recommendations" });
    }
  });

  app.post('/api/recommendations', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const recommendationData = insertRecommendationSchema.parse({ ...req.body, userId });
      
      const recommendation = await storage.createRecommendation(recommendationData);
      res.status(201).json(recommendation);
    } catch (error) {
      console.error("Error creating recommendation:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid recommendation data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create recommendation" });
    }
  });

  // AI-powered meal recommendations with fallback
  app.post("/api/ai/meal-recommendations", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { mealType = 'lunch' } = req.body;
      
      // Get user profile and nutrition data
      const userProfile = await storage.getUserProfile(userId);
      const today = new Date().toISOString().split('T')[0];
      const nutrition = await storage.getUserDailyNutrition(userId, today);
      
      // Get recent meals for context
      const recentMeals = await storage.getUserMealsByDate(userId, today);
      const mealHistory = {
        recentMeals: recentMeals.map(meal => meal.name || meal.mealType).filter(Boolean),
        favoriteIngredients: [], // Could be enhanced with user preferences
        avoidedFoods: userProfile?.allergies ? userProfile.allergies.split(',').map(a => a.trim()) : []
      };
      
      try {
        // Try AI recommendations first
        const aiRecommendations = await generateMealRecommendations(
          userProfile || {},
          nutrition,
          mealHistory,
          mealType
        );
        res.json(aiRecommendations);
      } catch (aiError) {
        console.log("AI service unavailable, using fallback recommendations");
        
        // Fallback to rule-based recommendations
        const fallbackRecommendations = generateFallbackRecommendations(
          mealType,
          userProfile,
          nutrition
        );
        res.json({ recommendations: fallbackRecommendations });
      }
    } catch (error) {
      console.error("Error generating meal recommendations:", error);
      res.status(500).json({ message: "Failed to generate meal recommendations" });
    }
  });

  // AI nutrition insights with fallback
  app.post("/api/ai/nutrition-insights", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Get user profile
      const userProfile = await storage.getUserProfile(userId);
      
      // Get weekly nutrition data (last 7 days)
      const weeklyNutrition = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const dayNutrition = await storage.getUserDailyNutrition(userId, dateStr);
        weeklyNutrition.push(dayNutrition);
      }
      
      // Calculate tracking streak (simplified - could be enhanced)
      const currentStreak = weeklyNutrition.filter(day => day.totalCalories > 0).length;
      
      try {
        // Try AI insights first
        const insights = await generateNutritionInsights(
          userProfile || {},
          weeklyNutrition,
          currentStreak
        );
        res.json(insights);
      } catch (aiError) {
        console.log("AI service unavailable, using fallback insights");
        
        // Fallback to rule-based insights
        const fallbackInsights = generateFallbackInsights(
          userProfile,
          weeklyNutrition,
          currentStreak
        );
        res.json({ insights: fallbackInsights });
      }
    } catch (error) {
      console.error("Error generating nutrition insights:", error);
      res.status(500).json({ message: "Failed to generate nutrition insights" });
    }
  });

  // AI food analysis
  app.post("/api/ai/analyze-food", isAuthenticated, async (req: any, res) => {
    try {
      const { foodName, servingSize } = req.body;
      
      if (!foodName || !servingSize) {
        return res.status(400).json({ message: "Food name and serving size are required" });
      }
      
      const analysis = await analyzeFood(foodName, servingSize);
      res.json(analysis);
    } catch (error) {
      console.error("Error analyzing food:", error);
      res.status(500).json({ message: "Failed to analyze food" });
    }
  });

  // Initialize demo data route (for development)
  app.post('/api/init-demo-data', async (req, res) => {
    try {
      // Create some basic foods for demo
      const demoFoods = [
        {
          name: "Chicken Breast",
          servingSize: "100g",
          caloriesPerServing: 165,
          proteinPerServing: 31,
          carbsPerServing: 0,
          fatPerServing: 3.6,
          fiberPerServing: 0,
          category: "protein",
          isVerified: true
        },
        {
          name: "Brown Rice",
          servingSize: "1 cup cooked",
          caloriesPerServing: 216,
          proteinPerServing: 5,
          carbsPerServing: 45,
          fatPerServing: 1.8,
          fiberPerServing: 3.5,
          category: "grains",
          isVerified: true
        },
        {
          name: "Broccoli",
          servingSize: "1 cup chopped",
          caloriesPerServing: 34,
          proteinPerServing: 2.8,
          carbsPerServing: 7,
          fatPerServing: 0.4,
          fiberPerServing: 2.3,
          category: "vegetables",
          isVerified: true
        },
        {
          name: "Salmon",
          servingSize: "100g",
          caloriesPerServing: 208,
          proteinPerServing: 22,
          carbsPerServing: 0,
          fatPerServing: 12,
          fiberPerServing: 0,
          category: "protein",
          isVerified: true
        },
        {
          name: "Sweet Potato",
          servingSize: "1 medium",
          caloriesPerServing: 112,
          proteinPerServing: 2,
          carbsPerServing: 26,
          fatPerServing: 0.1,
          fiberPerServing: 3.9,
          category: "vegetables",
          isVerified: true
        },
        {
          name: "Greek Yogurt",
          servingSize: "1 cup",
          caloriesPerServing: 150,
          proteinPerServing: 20,
          carbsPerServing: 9,
          fatPerServing: 4,
          fiberPerServing: 0,
          category: "dairy",
          isVerified: true
        },
        {
          name: "Oats",
          servingSize: "1 cup cooked",
          caloriesPerServing: 154,
          proteinPerServing: 6,
          carbsPerServing: 28,
          fatPerServing: 3,
          fiberPerServing: 4,
          category: "grains",
          isVerified: true
        },
        {
          name: "Apple",
          servingSize: "1 medium",
          caloriesPerServing: 95,
          proteinPerServing: 0.5,
          carbsPerServing: 25,
          fatPerServing: 0.3,
          fiberPerServing: 4.4,
          category: "fruits",
          isVerified: true
        }
      ];

      for (const food of demoFoods) {
        try {
          await storage.createFood(food);
        } catch (error) {
          // Food might already exist, continue
          console.log(`Food ${food.name} might already exist`);
        }
      }

      res.json({ message: "Demo data initialized successfully" });
    } catch (error) {
      console.error("Error initializing demo data:", error);
      res.status(500).json({ message: "Failed to initialize demo data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
