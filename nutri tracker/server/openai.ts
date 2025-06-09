import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface UserNutritionProfile {
  age?: number | null;
  heightCm?: number | null;
  weightKg?: number | null;
  fitnessGoal?: string | null;
  activityLevel?: string | null;
  allergies?: string | null;
  healthConditions?: string | null;
  dailyCalorieGoal?: number | null;
  dailyProteinGoal?: number | null;
  dailyCarbGoal?: number | null;
  dailyFatGoal?: number | null;
  dailyFiberGoal?: number | null;
}

interface NutritionData {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
}

interface MealHistory {
  recentMeals: string[];
  favoriteIngredients: string[];
  avoidedFoods: string[];
}

export async function generateMealRecommendations(
  userProfile: UserNutritionProfile,
  currentNutrition: NutritionData,
  mealHistory: MealHistory,
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' = 'lunch'
): Promise<{
  recommendations: Array<{
    title: string;
    description: string;
    type: string;
    priority: number;
    estimatedCalories: number;
    estimatedProtein: number;
    estimatedCarbs: number;
    estimatedFat: number;
    ingredients: string[];
    cookingTime: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }>;
}> {
  try {
    const prompt = `As a nutrition AI assistant, generate 3 personalized meal recommendations for ${mealType}.

User Profile:
- Age: ${userProfile.age || 'not specified'}
- Height: ${userProfile.heightCm || 'not specified'}cm
- Weight: ${userProfile.weightKg || 'not specified'}kg
- Fitness Goal: ${userProfile.fitnessGoal || 'not specified'}
- Activity Level: ${userProfile.activityLevel || 'not specified'}
- Allergies: ${userProfile.allergies || 'none specified'}
- Health Conditions: ${userProfile.healthConditions || 'none specified'}

Daily Goals:
- Calories: ${userProfile.dailyCalorieGoal || 2000}
- Protein: ${userProfile.dailyProteinGoal || 50}g
- Carbs: ${userProfile.dailyCarbGoal || 250}g
- Fat: ${userProfile.dailyFatGoal || 65}g
- Fiber: ${userProfile.dailyFiberGoal || 25}g

Current Daily Intake:
- Calories: ${currentNutrition.totalCalories}
- Protein: ${currentNutrition.totalProtein}g
- Carbs: ${currentNutrition.totalCarbs}g
- Fat: ${currentNutrition.totalFat}g
- Fiber: ${currentNutrition.totalFiber}g

Recent Meals: ${mealHistory.recentMeals.join(', ') || 'none'}
Favorite Ingredients: ${mealHistory.favoriteIngredients.join(', ') || 'none specified'}
Foods to Avoid: ${mealHistory.avoidedFoods.join(', ') || 'none'}

Requirements:
1. Consider remaining daily nutrition needs
2. Accommodate allergies and health conditions
3. Align with fitness goals
4. Provide variety from recent meals
5. Include favorite ingredients when possible
6. Suggest appropriate portion sizes for goals

Respond with JSON in this exact format:
{
  "recommendations": [
    {
      "title": "Meal Name",
      "description": "Brief description focusing on nutrition benefits",
      "type": "meal_suggestion",
      "priority": 1-3,
      "estimatedCalories": number,
      "estimatedProtein": number,
      "estimatedCarbs": number,
      "estimatedFat": number,
      "ingredients": ["ingredient1", "ingredient2"],
      "cookingTime": "X minutes",
      "difficulty": "easy|medium|hard"
    }
  ]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a professional nutritionist and meal planning expert. Provide personalized, healthy meal recommendations based on user profiles and nutritional needs. Always respond with valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000
    });

    const result = JSON.parse(response.choices[0].message.content || '{"recommendations": []}');
    return result;

  } catch (error) {
    console.error("Error generating meal recommendations:", error);
    throw new Error("Failed to generate meal recommendations");
  }
}

export async function generateNutritionInsights(
  userProfile: UserNutritionProfile,
  weeklyNutrition: NutritionData[],
  currentStreak: number
): Promise<{
  insights: Array<{
    title: string;
    description: string;
    type: string;
    priority: number;
    actionable: boolean;
  }>;
}> {
  try {
    const avgNutrition = weeklyNutrition.reduce((acc, day) => ({
      totalCalories: acc.totalCalories + day.totalCalories,
      totalProtein: acc.totalProtein + day.totalProtein,
      totalCarbs: acc.totalCarbs + day.totalCarbs,
      totalFat: acc.totalFat + day.totalFat,
      totalFiber: acc.totalFiber + day.totalFiber,
    }), { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0, totalFiber: 0 });

    const dayCount = weeklyNutrition.length || 1;
    avgNutrition.totalCalories /= dayCount;
    avgNutrition.totalProtein /= dayCount;
    avgNutrition.totalCarbs /= dayCount;
    avgNutrition.totalFat /= dayCount;
    avgNutrition.totalFiber /= dayCount;

    const prompt = `As a nutrition AI analyst, provide personalized insights based on this user's weekly nutrition data.

User Profile:
- Fitness Goal: ${userProfile.fitnessGoal || 'not specified'}
- Activity Level: ${userProfile.activityLevel || 'not specified'}
- Health Conditions: ${userProfile.healthConditions || 'none specified'}

Daily Goals:
- Calories: ${userProfile.dailyCalorieGoal || 2000}
- Protein: ${userProfile.dailyProteinGoal || 50}g
- Carbs: ${userProfile.dailyCarbGoal || 250}g
- Fat: ${userProfile.dailyFatGoal || 65}g
- Fiber: ${userProfile.dailyFiberGoal || 25}g

Weekly Average Intake:
- Calories: ${avgNutrition.totalCalories.toFixed(0)}
- Protein: ${avgNutrition.totalProtein.toFixed(1)}g
- Carbs: ${avgNutrition.totalCarbs.toFixed(1)}g
- Fat: ${avgNutrition.totalFat.toFixed(1)}g
- Fiber: ${avgNutrition.totalFiber.toFixed(1)}g

Tracking Streak: ${currentStreak} days

Provide 3-5 personalized insights focusing on:
1. Progress toward goals
2. Nutritional balance
3. Areas for improvement
4. Positive reinforcement
5. Actionable recommendations

Respond with JSON in this exact format:
{
  "insights": [
    {
      "title": "Insight Title",
      "description": "Detailed insight with specific recommendations",
      "type": "nutrition_insight",
      "priority": 1-5,
      "actionable": true/false
    }
  ]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a certified nutritionist providing personalized insights based on nutrition data. Focus on actionable advice and positive reinforcement. Always respond with valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.6,
      max_tokens: 1500
    });

    const result = JSON.parse(response.choices[0].message.content || '{"insights": []}');
    return result;

  } catch (error) {
    console.error("Error generating nutrition insights:", error);
    throw new Error("Failed to generate nutrition insights");
  }
}

export async function analyzeFood(
  foodName: string,
  servingSize: string
): Promise<{
  nutritionEstimate: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  healthScore: number;
  benefits: string[];
  concerns: string[];
}> {
  try {
    const prompt = `Analyze this food item and provide nutritional information:

Food: ${foodName}
Serving Size: ${servingSize}

Provide detailed nutritional analysis including:
1. Estimated nutrition per serving
2. Health score (1-10, where 10 is most nutritious)
3. Health benefits
4. Any nutritional concerns

Respond with JSON in this exact format:
{
  "nutritionEstimate": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fat": number,
    "fiber": number
  },
  "healthScore": number (1-10),
  "benefits": ["benefit1", "benefit2"],
  "concerns": ["concern1", "concern2"]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a food nutrition expert. Provide accurate nutritional estimates and health assessments for food items. Always respond with valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 1000
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result;

  } catch (error) {
    console.error("Error analyzing food:", error);
    throw new Error("Failed to analyze food");
  }
}