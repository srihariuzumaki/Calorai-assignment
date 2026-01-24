# React Native iOS UI Developer - Software Engineering Intern

# Developer Test Task: React Native iOS UI Developer
* * *
## Overview
**Role:** Junior/Intern React Native Developer (Frontend Focus)
**Company:** CalorAI
**Time Budget:** 6-8 hours maximum
**Deadline:** Complete at your own pace (suggested: within 1 day of starting)

[

www.figma.com

https://www.figma.com/design/nvjb77Pfwk9Sr87odJsKPZ/CalorAI---Test-Task---React-Native-IOS?node-id=0-1&t=gmb8LDoZNtdAeJpf-1

](https://www.figma.com/design/nvjb77Pfwk9Sr87odJsKPZ/CalorAI---Test-Task---React-Native-IOS?node-id=0-1&t=gmb8LDoZNtdAeJpf-1)

* * *

## Why We Use Test Tasks

We believe in "working together before working together." This test task lets you showcase your UI implementation skills while giving us a fair, objective way to evaluate all candidates equally. Everyone receives the same project—no tricks, no gotchas.

**Important:** We **heavily encourage and expect AI tool usage** (GitHub Copilot, ChatGPT, Claude, etc.). We value implementation speed and code quality over writing everything manually. Treat AI as your coding partner.
* * *

## Project Brief

### What You're Building

**CalorAI Taste Profile**: A beautiful, swipeable food preference interface

You'll build a 3-screen React Native app that recreates our Figma designs with pixel-perfect accuracy, focusing on iOS-style liquid glass/frosted glass UI components and smooth swipe interactions.
### User Story

> As a new CalorAI user, I want to swipe through foods I love and dislike, so that the app can recommend meals tailored to my taste.
* * *

## Detailed Requirements

### Core Features (Must Have)

| # | Feature | Description | Acceptance Criteria |
| ---| ---| ---| --- |
| 1 | Intro Screen | Welcome screen with glass morphism card and "Start Swiping" CTA | Glass effect renders correctly, matches Figma design, navigation works |
| 2 | Swipe Interface | Tinder-style card swiping for 30 food items | Cards swipe left/right, tap buttons work, progress bar updates, animations are smooth (60fps) |
| 3 | Results Screen | Display generated taste profile summary | Shows user's preferences in organized sections with glass cards, matches Figma layout |
| 4 | Bottom Navigation | Native iOS-style tab bar with frosted glass effect | Glass blur effect works on iOS, graceful fallback on Android, navigation between screens works |
| 5 | Cross-Platform | Works on both iOS and Android via Expo Go | App runs without errors on both platforms, glass effects work on iOS, appropriate alternatives on Android |

### Nice-to-Have (Bonus Points)

- [ ] **Background animations** (animated gradients, particles, subtle motion)
- [ ] **Profile generation logic** (analyze swipes and generate actual personality traits)
- [ ] **Advanced animations** (card rotation during swipe, spring physics, haptic feedback)
- [ ] **Undo last swipe** functionality
- [ ] **Onboarding animation** (fade-in, slide-up effects)

_Note: Focus on core features first. Only tackle bonuses if you have time remaining._
* * *

## Technical Specifications

### Required Tech Stack

| Layer | Technology | Notes |
| ---| ---| --- |
| Framework | React Native (Expo) | Use Expo for easy testing |
| Language | TypeScript OR JavaScript | Your choice |
| Navigation | Any routing library | React Navigation, Expo Router, etc. |
| Gestures | Any swipe library | react-native-gesture-handler, react-native-reanimated, etc. |
| Glass Effects | Any blur library | expo-blur, @react-native-community/blur, etc. |

### Technical Constraints

*   **Must run on Expo Go** (both iOS and Android)
*   **Must use provided food data** (see resources below)
*   **Must match Figma designs** (pixel-perfect is the goal)
*   **No authentication required** (skip login/signup)
*   **No backend/API calls** (all data is hardcoded)
*   **Animations must be smooth** (aim for 60fps)

### Resources Provided

#### 1\. **Figma Design File**
[CalorAI Test Task - React Native iOS](https://www.figma.com/design/nvjb77Pfwk9Sr87odJsKPZ/CalorAI---Test-Task---React-Native-IOS?node-id=1-536&t=AzUlhwrLbvBSqn2R-1)

**Key Screens:**
*   iPhone 16 Pro Max - 7: Intro Screen
*   iPhone 16 Pro Max - 8: Swipe Screen
*   iPhone 16 Pro Max - 9: Results Screen

**Design Notes:**
*   Pay close attention to the **frosted glass cards** (blur + transparency)
*   Note the **dark theme** with gradient backgrounds
*   Bottom navigation uses **iOS-style glass blur**
*   Progress bar has a green accent color
*   Buttons use circular icons with subtle shadows

#### 2\. **Food Data**
See `foods.json` file provided with this task.

#### 3\. **Glass Morphism Specifications**

For the iOS liquid glass effect, use these parameters:

```javascript
// Example using expo-blur
<BlurView
  intensity={20}        // Blur strength
  tint="dark"           // or "light"
  style={{
    backgroundColor: 'rgba(255, 255, 255, 0.1)',  // Semi-transparent
    borderRadius: 16,
    overflow: 'hidden',
  }}
>
  {/* Your content */}
</BlurView>
```

**Key characteristics:**
*   Background blur with 20-30% opacity overlay
*   Rounded corners (12-16px border radius)
*   Subtle border (1px, rgba(255, 255, 255, 0.2))
*   Shadow for depth
* * *

## Definition of Done

Your submission is complete when:

- [ ] App runs on Expo Go without errors (iOS + Android)
- [ ] All 3 core screens are implemented
- [ ] Swipe gestures work smoothly
- [ ] Glass effects render correctly on iOS
- [ ] Bottom navigation works
- [ ] Progress bar updates as user swipes
- [ ] README includes setup instructions
- [ ] Walkthrough video is recorded (5-10 minutes)
* * *

## Submission Requirements

### What to Submit

1. **GitHub Repository**
    *   Clean commit history (show your work progression)
    *   Descriptive commit messages
    *   No single "final commit" with all code
2. [**README.md**](http://README.md) must include:
    *   Project overview
    *   Setup/installation instructions (how to run with Expo Go)
    *   Libraries used and why
    *   Any assumptions or trade-offs you made
    *   Time breakdown (how you spent your hours)
    *   Notes on AI tool usage (which tools, how they helped)
3. **Walkthrough Video** (5-10 minutes)
    *   Demo the working application on a real device (or simulator)
    *   Show it running on both iOS and Android (Expo Go)
    *   Explain your architectural decisions
    *   Highlight the glass morphism implementation
    *   Discuss any challenges and how you solved them
    *   Show any bonus features you implemented
4. **\[Optional\] Expo Build Link**
    *   If you want to share an Expo build link for easy testing, include it in README

### How to Submit

Reply to the hiring manager with:
*   GitHub repo link
*   Video link (Loom, YouTube unlisted, or Google Drive)
*   Any questions or notes about your submission
* * *

## Evaluation Criteria

We'll evaluate your submission on these criteria:

| Criterion | Weight | What We're Looking For |
| ---| ---| --- |
| Code Quality | 30% | Clean, readable, well-organized component code. Proper naming. No code smells. Good file structure. |
| Specs Followed | 25% | Did you build what was requested? Does it match the Figma designs? All core features complete? |
| Documentation | 20% | Clear README. Explained decisions and trade-offs. Time breakdown included. |
| Testing | 15% | Works on real devices (iOS + Android). Video demonstrates functionality. No crashes or errors. |
| Communication | 10% | Clear walkthrough video. Notes on approach. Documented AI usage. |

### Green Flags ✅

*   Clean component structure with good separation of concerns
*   Smooth animations and gestures (60fps)
*   Glass effects that actually look like the Figma designs
*   Works perfectly on both iOS and Android
*   Clean commit history showing iterative development
*   Thoughtful README with setup instructions
*   Clear video walkthrough
*   Smart use of AI tools (documented in README)

### Red Flags ❌

*   Code doesn't run on Expo Go
*   Missing core features
*   Glass effects don't work or look wrong
*   No documentation
*   One giant commit with all code
*   Jerky animations or poor performance
*   Crashes on Android or iOS
* * *

## Communication Guidelines

### Questions Welcome

If something is unclear, **ask**. We'd rather you clarify than assume incorrectly.
**Contact:** _Bhavesh at_ [_bhavesh@calorai.ai_](mailto:bhavesh@calorai.ai)
### Progress Updates (Optional but Appreciated)

Feel free to send a quick update:
*   When you start
*   If you hit a major blocker
*   When you submit
* * *
## FAQs

**Q: What if I can't finish in 8 hours?**
A: Submit what you have. Document what's incomplete and what you'd do next. We value honest time management over heroic overtime.

**Q: Can I use AI tools (Copilot, ChatGPT, Claude, etc.)?**
A: **YES!** We heavily encourage it. This is about building fast and well, not proving you can code without help. Just document which tools you used in your README.

**Q: Can I use libraries/packages?**
A: Yes, use whatever helps you build faster. Popular choices: react-navigation, react-native-gesture-handler, react-native-reanimated, expo-blur. Just document major dependencies in your README.

**Q: Do I need to make it work exactly like Tinder?**
A: The swipe gesture should feel natural, but you don't need to replicate every Tinder interaction. Focus on: swipe left (dislike), swipe right (like), and tap buttons as alternatives.

**Q: What if glass effects don't work on Android?**
A: That's expected! Android doesn't support native blur the same way. Provide a graceful fallback (solid background with slight transparency). Document this in your README.

**Q: Should I write unit tests?**
A: No. This is a UI-focused task. Manual testing (showing it works in your video) is sufficient.

**Q: What if I don't have an iPhone?**
A: Use the iOS simulator in Xcode, or test on Android and document that you tested iOS in simulator. Expo Go works on both.

**Q: Can I change the design?**
A: No. The goal is to match the Figma designs as closely as possible. If you think something could be improved, document it in your README but still implement the original design.
* * *

## Ready to Start?

1. Reply to confirm you're starting
2. Clone the food data and review the Figma file
3. Build something great
4. Submit before you hit 8 hours (or document why it took longer)

Good luck! We're excited to see what you build.
* * *

Appendix

```json
Food.json
{
  "foods": [
    {
      "id": 1,
      "name": "Grilled Salmon",
      "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
      "category": "protein",
      "tags": ["protein", "fish", "omega-3"]
    },
    {
      "id": 2,
      "name": "Chicken Breast",
      "image": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400",
      "category": "protein",
      "tags": ["protein", "lean", "poultry"]
    },
    {
      "id": 3,
      "name": "Steak",
      "image": "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400",
      "category": "protein",
      "tags": ["protein", "red-meat", "indulgent"]
    },
    {
      "id": 4,
      "name": "Tofu",
      "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
      "category": "protein",
      "tags": ["protein", "plant-based", "vegan"]
    },
    {
      "id": 5,
      "name": "Eggs",
      "image": "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400",
      "category": "protein",
      "tags": ["protein", "breakfast", "versatile"]
    },
    {
      "id": 6,
      "name": "Shrimp",
      "image": "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400",
      "category": "protein",
      "tags": ["protein", "seafood", "shellfish"]
    },
    {
      "id": 7,
      "name": "White Rice",
      "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
      "category": "carb",
      "tags": ["carb", "staple", "versatile"]
    },
    {
      "id": 8,
      "name": "Pasta",
      "image": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
      "category": "carb",
      "tags": ["carb", "italian", "comfort"]
    },
    {
      "id": 9,
      "name": "Potatoes",
      "image": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
      "category": "carb",
      "tags": ["carb", "versatile", "comfort"]
    },
    {
      "id": 10,
      "name": "Quinoa",
      "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
      "category": "carb",
      "tags": ["carb", "whole-grain", "healthy"]
    },
    {
      "id": 11,
      "name": "Oatmeal",
      "image": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400",
      "category": "carb",
      "tags": ["carb", "breakfast", "healthy"]
    },
    {
      "id": 12,
      "name": "Bread",
      "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
      "category": "carb",
      "tags": ["carb", "staple", "bakery"]
    },
    {
      "id": 13,
      "name": "Broccoli",
      "image": "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400",
      "category": "vegetable",
      "tags": ["vegetable", "green", "healthy"]
    },
    {
      "id": 14,
      "name": "Spinach",
      "image": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400",
      "category": "vegetable",
      "tags": ["vegetable", "green", "salad"]
    },
    {
      "id": 15,
      "name": "Kale",
      "image": "https://images.unsplash.com/photo-1557844352-761f2565b576?w=400",
      "category": "vegetable",
      "tags": ["vegetable", "green", "healthy"]
    },
    {
      "id": 16,
      "name": "Carrots",
      "image": "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
      "category": "vegetable",
      "tags": ["vegetable", "orange", "sweet"]
    },
    {
      "id": 17,
      "name": "Bell Peppers",
      "image": "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400",
      "category": "vegetable",
      "tags": ["vegetable", "crunchy", "colorful"]
    },
    {
      "id": 18,
      "name": "Avocado",
      "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400",
      "category": "vegetable",
      "tags": ["vegetable", "fat", "healthy"]
    },
    {
      "id": 19,
      "name": "Sweet Potato",
      "image": "https://images.unsplash.com/photo-1591708683044-a7b0a0146a46?w=400",
      "category": "vegetable",
      "tags": ["vegetable", "carb", "healthy"]
    },
    {
      "id": 20,
      "name": "Cheese",
      "image": "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400",
      "category": "other",
      "tags": ["dairy", "fat", "indulgent"]
    },
    {
      "id": 21,
      "name": "Greek Yogurt",
      "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
      "category": "other",
      "tags": ["dairy", "protein", "breakfast"]
    },
    {
      "id": 22,
      "name": "Nuts",
      "image": "https://images.unsplash.com/photo-1508747703725-719777637510?w=400",
      "category": "other",
      "tags": ["snack", "fat", "healthy"]
    },
    {
      "id": 23,
      "name": "Black Beans",
      "image": "https://images.unsplash.com/photo-1566843536060-5a71cd7e8c9e?w=400",
      "category": "other",
      "tags": ["legume", "protein", "fiber"]
    },
    {
      "id": 24,
      "name": "Sushi",
      "image": "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
      "category": "other",
      "tags": ["japanese", "fish", "rice"]
    },
    {
      "id": 25,
      "name": "Pizza",
      "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
      "category": "other",
      "tags": ["italian", "comfort", "indulgent"]
    },
    {
      "id": 26,
      "name": "Salad",
      "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
      "category": "vegetable",
      "tags": ["vegetable", "salad", "healthy"]
    },
    {
      "id": 27,
      "name": "Burger",
      "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
      "category": "other",
      "tags": ["comfort", "protein", "indulgent"]
    },
    {
      "id": 28,
      "name": "Smoothie Bowl",
      "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400",
      "category": "other",
      "tags": ["healthy", "breakfast", "fruit"]
    },
    {
      "id": 29,
      "name": "Tacos",
      "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
      "category": "other",
      "tags": ["mexican", "protein", "comfort"]
    },
    {
      "id": 30,
      "name": "Ramen",
      "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
      "category": "other",
      "tags": ["japanese", "comfort", "noodles"]
    }
  ],
  "cuisines": [
    {
      "id": 1,
      "name": "Italian",
      "emoji": "🇮🇹",
      "description": "Pasta, pizza, Mediterranean flavors"
    },
    {
      "id": 2,
      "name": "Mexican",
      "emoji": "🇲🇽",
      "description": "Spicy, cilantro, lime, beans"
    },
    {
      "id": 3,
      "name": "Japanese",
      "emoji": "🇯🇵",
      "description": "Umami, delicate, fish, rice"
    },
    {
      "id": 4,
      "name": "Mediterranean",
      "emoji": "🫒",
      "description": "Olive oil, fresh, grilled"
    },
    {
      "id": 5,
      "name": "American",
      "emoji": "🇺🇸",
      "description": "Comfort, grilled, hearty"
    }
  ]
}
```

_Questions? Reach out to Bhavesh at_ [_bhavesh@calorai.ai_](mailto:bhavesh@calorai.ai)