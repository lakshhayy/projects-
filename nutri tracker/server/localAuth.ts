import type { Express, RequestHandler } from "express";
import session from "express-session";
import { storage } from "./storage";

// Simple local development authentication
export function getLocalSession() {
  return session({
    secret: process.env.SESSION_SECRET || 'local-dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to false for local development
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    },
  });
}

export async function setupLocalAuth(app: Express) {
  app.use(getLocalSession());

  // Simple login endpoint for local development
  app.post('/api/local-login', async (req, res) => {
    try {
      const { email, firstName, lastName } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      // Create or get user
      const userId = email.replace('@', '_').replace('.', '_'); // Simple ID generation
      
      const user = await storage.upsertUser({
        id: userId,
        email: email,
        firstName: firstName || 'Local',
        lastName: lastName || 'User',
        profileImageUrl: null,
      });

      // Set session
      (req as any).session.user = {
        claims: {
          sub: userId,
          email: email,
          first_name: firstName || 'Local',
          last_name: lastName || 'User',
          profile_image_url: null,
        }
      };

      res.json({ message: "Logged in successfully", user });
    } catch (error) {
      console.error("Local login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Logout endpoint
  app.post('/api/local-logout', (req, res) => {
    (req as any).session.destroy(() => {
      res.json({ message: "Logged out successfully" });
    });
  });

  // Get current user endpoint
  app.get('/api/auth/user', async (req, res) => {
    try {
      const sessionUser = (req as any).session?.user;
      if (!sessionUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = sessionUser.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const sessionUser = (req as any).session?.user;
  
  if (!sessionUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Attach user to request for compatibility
  (req as any).user = sessionUser;
  next();
};