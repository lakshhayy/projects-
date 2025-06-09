import {
  users,
  userProfiles,
  foods,
  meals,
  mealFoods,
  recommendations,
  type User,
  type UpsertUser,
  type UserProfile,
  type InsertUserProfile,
  type Food,
  type InsertFood,
  type Meal,
  type InsertMeal,
  type MealFood,
  type InsertMealFood,
  type Recommendation,
  type InsertRecommendation,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql, ilike } from "drizzle-orm";

export interface IStorage {
  // User operations - mandatory for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // User profile operations
  getUserProfile(userId: string): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: string, profile: Partial<InsertUserProfile>): Promise<UserProfile>;

  // Food operations
  searchFoods(query: string): Promise<Food[]>;
  getFood(id: number): Promise<Food | undefined>;
  createFood(food: InsertFood): Promise<Food>;
  getPopularFoods(): Promise<Food[]>;

  // Meal operations
  getUserMealsByDate(userId: string, date: string): Promise<(Meal & { mealFoods: (MealFood & { food: Food })[] })[]>;
  createMeal(meal: InsertMeal): Promise<Meal>;
  addFoodToMeal(mealFood: InsertMealFood): Promise<MealFood>;
  deleteMeal(id: number, userId: string): Promise<void>;
  getUserDailyNutrition(userId: string, date: string): Promise<{
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    totalFiber: number;
  }>;

  // Recommendation operations
  getUserRecommendations(userId: string): Promise<Recommendation[]>;
  createRecommendation(recommendation: InsertRecommendation): Promise<Recommendation>;
  updateRecommendation(id: number, updates: Partial<InsertRecommendation>): Promise<Recommendation>;
}

export class DatabaseStorage implements IStorage {
  // User operations - mandatory for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // User profile operations
  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId));
    return profile;
  }

  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const [newProfile] = await db
      .insert(userProfiles)
      .values(profile)
      .returning();
    return newProfile;
  }

  async updateUserProfile(userId: string, profile: Partial<InsertUserProfile>): Promise<UserProfile> {
    const [updatedProfile] = await db
      .update(userProfiles)
      .set({ ...profile, updatedAt: new Date() })
      .where(eq(userProfiles.userId, userId))
      .returning();
    return updatedProfile;
  }

  // Food operations
  async searchFoods(query: string): Promise<Food[]> {
    return await db
      .select()
      .from(foods)
      .where(ilike(foods.name, `%${query}%`))
      .limit(20);
  }

  async getFood(id: number): Promise<Food | undefined> {
    const [food] = await db.select().from(foods).where(eq(foods.id, id));
    return food;
  }

  async createFood(food: InsertFood): Promise<Food> {
    const [newFood] = await db.insert(foods).values(food).returning();
    return newFood;
  }

  async getPopularFoods(): Promise<Food[]> {
    return await db
      .select()
      .from(foods)
      .where(eq(foods.isVerified, true))
      .limit(10);
  }

  // Meal operations
  async getUserMealsByDate(userId: string, date: string): Promise<(Meal & { mealFoods: (MealFood & { food: Food })[] })[]> {
    const userMeals = await db
      .select()
      .from(meals)
      .where(and(eq(meals.userId, userId), eq(meals.date, date)))
      .orderBy(meals.createdAt);

    const mealsWithFoods = await Promise.all(
      userMeals.map(async (meal) => {
        const mealFoodItems = await db
          .select()
          .from(mealFoods)
          .leftJoin(foods, eq(mealFoods.foodId, foods.id))
          .where(eq(mealFoods.mealId, meal.id));

        return {
          ...meal,
          mealFoods: mealFoodItems.map(item => ({
            ...item.meal_foods,
            food: item.foods!
          }))
        };
      })
    );

    return mealsWithFoods;
  }

  async createMeal(meal: InsertMeal): Promise<Meal> {
    const [newMeal] = await db.insert(meals).values(meal).returning();
    return newMeal;
  }

  async addFoodToMeal(mealFood: InsertMealFood): Promise<MealFood> {
    const [newMealFood] = await db.insert(mealFoods).values(mealFood).returning();
    
    // Update meal totals
    await db.execute(sql`
      UPDATE meals 
      SET 
        total_calories = total_calories + ${mealFood.calories},
        total_protein = total_protein + ${mealFood.protein},
        total_carbs = total_carbs + ${mealFood.carbs},
        total_fat = total_fat + ${mealFood.fat},
        total_fiber = total_fiber + ${mealFood.fiber || 0}
      WHERE id = ${mealFood.mealId}
    `);

    return newMealFood;
  }

  async deleteMeal(id: number, userId: string): Promise<void> {
    await db
      .delete(meals)
      .where(and(eq(meals.id, id), eq(meals.userId, userId)));
  }

  async getUserDailyNutrition(userId: string, date: string): Promise<{
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    totalFiber: number;
  }> {
    const [result] = await db
      .select({
        totalCalories: sql<number>`COALESCE(SUM(${meals.totalCalories}), 0)`,
        totalProtein: sql<number>`COALESCE(SUM(${meals.totalProtein}), 0)`,
        totalCarbs: sql<number>`COALESCE(SUM(${meals.totalCarbs}), 0)`,
        totalFat: sql<number>`COALESCE(SUM(${meals.totalFat}), 0)`,
        totalFiber: sql<number>`COALESCE(SUM(${meals.totalFiber}), 0)`,
      })
      .from(meals)
      .where(and(eq(meals.userId, userId), eq(meals.date, date)));

    return result || {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      totalFiber: 0,
    };
  }

  // Recommendation operations
  async getUserRecommendations(userId: string): Promise<Recommendation[]> {
    return await db
      .select()
      .from(recommendations)
      .where(and(eq(recommendations.userId, userId), eq(recommendations.isActive, true)))
      .orderBy(recommendations.priority, desc(recommendations.createdAt))
      .limit(10);
  }

  async createRecommendation(recommendation: InsertRecommendation): Promise<Recommendation> {
    const [newRecommendation] = await db
      .insert(recommendations)
      .values(recommendation)
      .returning();
    return newRecommendation;
  }

  async updateRecommendation(id: number, updates: Partial<InsertRecommendation>): Promise<Recommendation> {
    const [updatedRecommendation] = await db
      .update(recommendations)
      .set(updates)
      .where(eq(recommendations.id, id))
      .returning();
    return updatedRecommendation;
  }
}

export const storage = new DatabaseStorage();
