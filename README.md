# 😋 CalorAI Taste Profile

A premium, interactive food preference discovery application built for the CalorAI Developer Test. This app allows users to build a personal taste profile through an intuitive swipe interface and discover tailored meal recommendations and detailed recipes.

---

## 🌟 Key Features

### 🛠️ Core Functionality (Must-Have)
- **Glassmorphism Intro Screen:** A high-end welcome screen featuring advanced CSS backdrop filters and smooth page transitions.
- **Tinder-Style Swipe Interface:** Fluid interaction logic for 30 diverse food items with dynamic progress tracking.
- **Taste Profile Results:** A comprehensive breakdown of user preferences, including health scores and trait analysis.
- **iOS-Style Navigation:** A frosted glass bottom tab bar with liquid-motion active state indicators.
- **Smart Result Sections:** Organized "Loved", "Hated", and "Super Liked" sections with interactive horizontal scrolling.

### 🚀 Standout Features (Bonus & Beyond)
- **👨‍🍳 Chef's Recommendation Engine:** An intelligent logic layer that analyzes your favorite proteins, carbs, and veggies to construct 3 unique meal types (Power Bowl, Lean Green, Comfort Plate) with custom "match reasons."
- **📖 Premium Recipe Discovery:** A searchable grid of all 30 foods. Each item features a full, professional recipe with detailed ingredients and step-by-step instructions.
- **🧠 Taste Personality Analysis:** Rule-based logic that determines your "Diet Style" (e.g., Protein Lover) and "Adventurousness" based on category diversity.
- **✨ Advanced Micro-Interactions:**
    - **Card Physics:** Included rotation, spring physics, and scale effects using Framer Motion.
    - **Undo Support:** Quickly reverse your last swipe to correct accidental likes/dislikes.
- **🎨 Visual Excellence:**
    - **Exact Spec Glassmorphism:** Implemented the required 20px blur, 0.2 border opacity, and custom box-shadows for depth.
    - **Animated Backgrounds:** Subtle, pulse-animated gradients and glowing orbs to enhance the premium dark-mode feel.

---

## 💻 Tech Stack

- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS (Vanilla CSS for Glassmorphism)
- **Animations:** Framer Motion (Gestures & Page Transitions)
- **Navigation:** React Router 7
- **Formatting:** React Markdown (for professional recipe rendering)

---

## 🏗️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/srihariuzumaki/Calorai-assignment.git
   cd react-assignment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173`

---

## 📝 Developer Notes & Design Decisions

### 🌍 Platform Choice
While the original prompt mentioned React Native, I chose to build this as a **React Web Application** to ensure the most stable and impressive demonstration of the glassmorphism and swipe physics in a browser environment. I used:
- `backdrop-filter: blur(20px)` as the web equivalent to `expo-blur`.
- `framer-motion` to replicate haptic-like spring physics and 60fps card rotations.

### 🤖 AI Tool Usage
This project was developed with the assistance of **Antigravity (Google DeepMind)**. AI was used for:
- Accelerating the initial project setup.
- Generating the comprehensive, professional recipe data for `foods.json`.
- Architecting the rule-based logic for the recommendation engine.



---

## 👨‍💻 Submission
**Candidate:** Srihari Kulkarni
**Role:** React/Frontend Engineering Intern
**Portfolio:** [GitHub Profile](https://github.com/srihariuzumaki)

*Built with passion for food and clean UI.* 🍕✨
