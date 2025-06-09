WANDERSTAY - HOTEL BOOKING PLATFORM
===================================

WanderStay is a modern, beautifully designed, fully responsive hotel booking website. 
It allows users to browse top-rated hotels, view immersive image galleries, 
and make secure bookings—all with a seamless and luxurious interface.

Developed with the latest web technologies including Next.js 14, Tailwind CSS, 
and TypeScript, WanderStay delivers high performance and a clean user experience 
on mobile, tablet, and desktop devices.

------------------------------------------------------------
FEATURES
------------------------------------------------------------

1. RESPONSIVE DESIGN
   - Layout optimized for all screen sizes (mobile, tablet, desktop)
   - Tailwind CSS ensures pixel-perfect responsiveness

2. MODERN USER INTERFACE
   - Elegant transitions and hover animations
   - Consistent design language using shadcn/ui and Lucide icons

3. HOTEL LISTINGS
   - Dynamic hotel data with search and filtering options
   - Integrated with Unsplash API for hotel image data

4. IMAGE GALLERY
   - Full-screen, swipeable image slider for each hotel
   - High-resolution images from Unsplash in real time

5. USER AUTHENTICATION
   - Sign up, login, and secure session management
   - Built using NextAuth.js with support for providers like Google and GitHub

6. CONTACT FORM
   - Users can contact the WanderStay team directly via form
   - Ready to integrate with services like Formspree, Nodemailer, or SendGrid

7. REAL-TIME IMAGES
   - Hotels display images fetched on the fly from Unsplash API

------------------------------------------------------------
TECHNOLOGIES USED
------------------------------------------------------------

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- TypeScript
- Lucide Icons (Lucide React)
- shadcn/ui
- NextAuth.js
- Unsplash API

------------------------------------------------------------
PROJECT STRUCTURE
------------------------------------------------------------

wanderstay/

├── app/                 -> Routing and layout using Next.js App Router

├── components/          -> Reusable UI components 

├── lib/                 -> Helper functions and configs

├── public/              -> Static images and files

├── styles/              -> Tailwind CSS global styles

├── types/               -> Custom TypeScript types

├── .env.local           -> Local environment variable definitions

├── tailwind.config.ts   -> Tailwind customization config

├── next.config.js       -> Next.js configuration

└── readme.me            -> You're here!

------------------------------------------------------------
INSTALLATION & SETUP
------------------------------------------------------------

1. PREREQUISITES
   - Node.js version 18.17 or higher
   - npm or yarn package manager
   - Unsplash API Access Key (register for free at https://unsplash.com/developers)
   - (Optional) PostgreSQL or any DB for session handling with NextAuth.js

2. CLONE THE REPOSITORY
   git clone https://github.com/krishnamarora/wanderstay.git
   cd wanderstay

3. INSTALL DEPENDENCIES
   npm install
   # OR
   yarn install

4. CONFIGURE ENVIRONMENT VARIABLES
   Create a `.env.local` file in the root directory and add:

   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_key
   NEXTAUTH_SECRET=your_auth_secret
   DATABASE_URL=your_database_url

5. RUN THE DEVELOPMENT SERVER
   npm run dev
   # OR
   yarn dev

6. OPEN IN BROWSER
   Visit http://localhost:3000

------------------------------------------------------------
DEPLOYMENT
------------------------------------------------------------

Recommended: Vercel (https://vercel.com)

1. Push your code to GitHub
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Set environment variables in Vercel dashboard
5. Click "Deploy"

------------------------------------------------------------
AUTHENTICATION
------------------------------------------------------------

Implemented using NextAuth.js.

Supports:
- Google
- GitHub
- Email + Password
- Custom providers (optional)

Sessions are managed securely using JWT or a database adapter.

------------------------------------------------------------
CONTACT FORM
------------------------------------------------------------

The contact form can be extended to work with:
- Formspree
- Nodemailer
- SendGrid
- EmailJS

Use an API route inside `/app/api/contact` to handle submissions.

------------------------------------------------------------
TESTING SUPPORT (OPTIONAL)
------------------------------------------------------------

For adding testing in future:
- Unit Testing: Jest / Vitest
- E2E Testing: Cypress / Playwright

------------------------------------------------------------
FUTURE ROADMAP
------------------------------------------------------------

- 🌍 Internationalization (multi-language support)
- 💳 Payment integration with Stripe
- 🔔 Email notifications for bookings
- 💬 Real-time live chat with hotel support
- 📍 Google Maps integration for hotel locations

------------------------------------------------------------
CONTRIBUTING
------------------------------------------------------------

We welcome contributions!

1. Fork the repository
2. Create a feature branch: 
   git checkout -b feature/my-feature
3. Make your changes and commit:
   git commit -m "Add new feature"
4. Push to GitHub:
   git push origin feature/my-feature
5. Create a Pull Request 🚀




