# NutriTrack - AI-Powered Nutrition Assistant

A comprehensive nutrition tracking application with AI-powered meal recommendations, built with React, TypeScript, Express, and PostgreSQL.

## Features

- **Smart Meal Logging** - Track your daily food intake with detailed nutrition breakdowns
- **AI Meal Recommendations** - Get personalized meal suggestions based on your goals and preferences
- **Nutrition Analytics** - Weekly progress tracking and insights
- **Food Database** - Search foods and analyze nutrition content
- **Goal Setting** - Set and track daily nutrition targets
- **Progress Visualization** - Charts and statistics for your nutrition journey

## Quick Start for Local Development

### Prerequisites

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **PostgreSQL** (v12 or higher) - [Download here](https://www.postgresql.org/download/)
3. **Git** - [Download here](https://git-scm.com/)

### Setup Instructions

1. **Clone the project**
   ```bash
   git clone <your-repo-url>
   cd nutritrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   ```sql
   -- Connect to PostgreSQL and run:
   CREATE DATABASE nutritrack;
   CREATE USER nutritrack_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE nutritrack TO nutritrack_user;
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   DATABASE_URL=postgresql://nutritrack_user:your_password@localhost:5432/nutritrack
   SESSION_SECRET=your-super-secret-session-key-here
   NODE_ENV=development
   
   # Optional: Add OpenAI API key for AI features (works without it)
   OPENAI_API_KEY=your-openai-api-key
   ```

5. **Initialize database schema**
   ```bash
   npm run db:push
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Access the application**
   Open [http://localhost:5000](http://localhost:5000) in your browser

## Local Development Authentication

The app automatically detects local development mode and provides a simple login interface. No complex OAuth setup required!

1. When you first visit the app, you'll see a local login form
2. Enter any email (e.g., `demo@test.com`)
3. Add your name and click "Enter App"
4. You're ready to start tracking your nutrition!

## Adding Demo Data

After logging in, you can add sample foods to the database:

```bash
curl -X POST http://localhost:5000/api/init-demo-data
```

This adds common foods like chicken breast, brown rice, and broccoli to get you started.

## Project Structure

```
nutritrack/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Main application pages
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and API client
├── server/           # Express backend
│   ├── db.ts           # Database connection
│   ├── routes.ts       # API routes
│   ├── localAuth.ts    # Local development auth
│   └── openai.ts       # AI integration
├── shared/           # Shared types and schemas
└── package.json      # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open database studio (if available)

## AI Features

The app includes intelligent features powered by OpenAI:

- **Meal Recommendations** - Personalized suggestions based on your nutrition goals
- **Nutrition Insights** - Weekly analysis of your eating patterns
- **Food Analysis** - Instant nutrition breakdown for any food item

If you don't have an OpenAI API key, the app automatically falls back to rule-based recommendations that still provide valuable suggestions.

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: OpenAI GPT-4o (with intelligent fallbacks)
- **Authentication**: Session-based (simplified for local dev)

## Troubleshooting

### Common Issues

1. **Port 5000 already in use**
   ```bash
   # Kill process using port 5000
   lsof -ti:5000 | xargs kill -9
   ```

2. **Database connection errors**
   - Ensure PostgreSQL is running
   - Verify credentials in `.env` file
   - Check database exists: `psql -l`

3. **Missing dependencies**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Build errors**
   - Ensure Node.js version is 18+
   - Clear cache: `npm cache clean --force`

### Development Tips

- The app automatically reloads when you make changes
- Database schema changes require running `npm run db:push`
- AI features work with or without OpenAI API key
- Local authentication bypasses complex OAuth setup

## Production Deployment

For production deployment, you'll need to:

1. Set up proper authentication (OAuth providers)
2. Configure production database
3. Set secure environment variables
4. Use a process manager like PM2

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

This project is licensed under the MIT License.