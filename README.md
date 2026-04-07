# KINEX Web 🏋️‍♂️

Kinex is an AI-powered fitness web application migrated from iOS. It features personalized workout programs, a Gemini-powered AI nutrition scanner, and daily fitness tracking. 

## 🚀 How to Run locally

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`. 

3. **Build for production**
   ```bash
   npm run build
   ```
   This will create a `dist` folder ready to be deployed to any static hosting provider.

## 📁 Project Structure

*   **`/src/pages/`**: Contains all the main views of the application:
    *   `Auth.tsx`: Login and Sign Up screen (Email/Google).
    *   `Onboarding.tsx`: 6-step onboarding wizard for new users to calculate their daily calorie goals.
    *   `Home.tsx`: Dashboard with "Focus of the day" and quick actions.
    *   `Programs.tsx`: Catalog of all workout programs (Powerlifting, Bodybuilding, etc.).
    *   `Workout.tsx`: Workout schedule, history, and active workout tracking.
    *   `Nutrition.tsx`: Food scanner utilizing Gemini AI to log macros.
    *   `Calculators.tsx`: 1 Rep Max and Daily Calorie calculation tools.
    *   `Profile.tsx`: User settings and subscription details.
*   **`/src/components/`**: Reusable UI components (like `BottomNav.tsx`).
*   **`/src/hooks/`**: Custom React hooks (`useAuth.tsx` handles Firebase logic).
*   **`/src/exercises/` & `/public/exercises/`**: Contains all 80 GIF animations for the exercises.

## ☁️ Deployment & Domain 

Since KINEX is now a standalone web platform, here is how you can deploy it and acquire a domain anonymously:

### 1. Purchasing an anonymous domain
If you want to buy a domain without identity verification (using Crypto or just keeping your data private):
*   **Njalla** (~$15/year): The best option for complete anonymity. They buy the domain for you, so your name is nowhere on the register. They accept cryptocurrency.
*   **Porkbun** (~$9/year): Very cheap, allows card payments, and provides **free WHOIS privacy** by default, hiding your real name and address from the public internet.
*   **Cloudflare Registrar**: Cheapest option (at wholesale cost), with built-in CDN.

### 2. Deployment (Free Hosting)
You can deploy the `dist` folder to **Vercel** or **Netlify** for free:
1. Push your code to a private GitHub repository.
2. Go to [Vercel](https://vercel.com/) and connect your GitHub account.
3. Import the KINEX repository. Vercel will automatically detect that it's a Vite projected.
4. Click **Deploy**.
5. Go to Project Settings -> Domains, and add the domain you purchased from Porkbun/Njalla.

## 🔐 Environment Variables

The project currently uses Firebase and Gemini. While the keys are in the code for development, before deploying to production, you should:
1. Create a `.env` file in the root directory.
2. Add your keys:
   ```env
   VITE_GEMINI_API_KEY=AIzaS...
   VITE_FIREBASE_API_KEY=AIzaS...
   ```
3. Update `gemini.ts` and `firebaseConfig.ts` to use `import.meta.env.VITE_GEMINI_API_KEY`.

---

## 📝 Implementation Notes & Plan
*(As requested by the user, here is the full breakdown of the implemented features)*

*   **Auth**: Handled by Firebase. Email/password and Google Sign-in are supported. Apple Sign-in was removed as it requires an Apple Developer account and is mostly native to iOS.
*   **Database**: Firestore is used to save user profiles (weight, height, goals, metric/imperial preferences).
*   **UI/UX**: The UI accurately recreates the premium, dark-mode, neon-accented iOS design using Tailwind CSS. 
*   **GIFs**: The 450MB of `.webp`/`.gif` files are present. **Note:** In production, you might want to serve these assets from a cloud bucket (like AWS S3 or Firebase Storage) or use a CDN to prevent the GitHub repository from becoming overwhelmingly large.

You can now zip this folder, adjust your `.env` keys if necessary, and deploy!
