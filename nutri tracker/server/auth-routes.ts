import type { Express } from "express";
import { storage } from "./storage";

export function setupAuthRoutes(app: Express, authMiddleware: any) {
  // User Profile routes
  app.get("/api/profile", authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.getUserProfile(userId);
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.post("/api/profile", authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.createUserProfile({ ...req.body, userId });
      res.status(201).json(profile);
    } catch (error) {
      console.error("Error creating profile:", error);
      res.status(500).json({ message: "Failed to create profile" });
    }
  });

  app.put("/api/profile", authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.updateUserProfile(userId, req.body);
      res.json(profile);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Food routes
  app.get("/api/foods/search", authMiddleware, async (req: any, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ message: "Search query is required" });
      }
      const foods = await storage.searchFoods(q);
      res.json(foods);
    } catch (error) {
      console.error("Error searching foods:", error);
      res.status(500).json({ message: "Failed to search foods" });
    }
  });

  app.get("/api/foods/popular", authMiddleware, async (req: any, res) => {
    try {
      const foods = await storage.getPopularFoods();
      res.json(foods);
    } catch (error) {
      console.error("Error fetching popular foods:", error);
      res.status(500).json({ message: "Failed to fetch popular foods" });
    }
  });

  app.post("/api/foods", authMiddleware, async (req: any, res) => {
    try {
      const food = await storage.createFood(req.body);
      res.status(201).json(food);
    } catch (error) {
      console.error("Error creating food:", error);
      res.status(500).json({ message: "Failed to create food" });
    }
  });

  // Meal routes
  app.get("/api/meals", authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { date } = req.query;
      const meals = await storage.getUserMealsByDate(userId, date as string || new Date().toISOString().split('T')[0]);
      res.json(meals);
    } catch (error) {
      console.error("Error fetching meals:", error);
      res.status(500).json({ message: "Failed to fetch meals" });
    }
  });

  app.post("/api/meals", authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const meal = await storage.createMeal({ ...req.body, userId });
      res.status(201).json(meal);
    } catch (error) {
      console.error("Error creating meal:", error);
      res.status(500).json({ message: "Failed to create meal" });
    }
  });

  app.post("/api/meals/:id/foods", authMiddleware, async (req: any, res) => {
    try {
      const mealId = parseInt(req.params.id);
      const mealFood = await storage.addFoodToMeal({ ...req.body, mealId });
      res.status(201).json(mealFood);
    } catch (error) {
      console.error("Error adding food to meal:", error);
      res.status(500).json({ message: "Failed to add food to meal" });
    }
  });

  app.delete("/api/meals/:id", authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const mealId = parseInt(req.params.id);
      await storage.deleteMeal(mealId, userId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting meal:", error);
      res.status(500).json({ message: "Failed to delete meal" });
    }
  });

  // Nutrition routes
  app.get("/api/nutrition/daily", authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { date } = req.query;
      const nutrition = await storage.getUserDailyNutrition(userId, date as string);
      res.json(nutrition);
    } catch (error) {
      console.error("Error fetching daily nutrition:", error);
      res.status(500).json({ message: "Failed to fetch daily nutrition" });
    }
  });

  // Recommendation routes
  app.get("/api/recommendations", authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const recommendations = await storage.getUserRecommendations(userId);
      res.json(recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      res.status(500).json({ message: "Failed to fetch recommendations" });
    }
  });

  app.post("/api/recommendations", authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const recommendation = await storage.createRecommendation({ ...req.body, userId });
      res.status(201).json(recommendation);
    } catch (error) {
      console.error("Error creating recommendation:", error);
      res.status(500).json({ message: "Failed to create recommendation" });
    }
  });
}