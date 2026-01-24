/**
 * Meal Recommendation Engine
 * Generates structured meal suggestions based on liked/hated food items and categories.
 */

const MEAL_TEMPLATES = [
    {
        id: 'power_bowl',
        name: 'The Power Performance Bowl',
        description: 'A high-energy combination designed to keep you fueled.',
        structure: ['protein', 'vegetable', 'carb'],
        icon: '🥣',
        baseMacros: { protein: 35, carbs: 45, fats: 15 }
    },
    {
        id: 'lean_green',
        name: 'Lean & Green Refresh',
        description: 'Light, nutrient-dense, and focused on recovery.',
        structure: ['protein', 'vegetable', 'vegetable'],
        icon: '🥗',
        baseMacros: { protein: 30, carbs: 20, fats: 10 }
    },
    {
        id: 'comfort_classic',
        name: 'Hearty Comfort Plate',
        description: 'Satisfying flavors that feel like home.',
        structure: ['carb', 'protein', 'other'],
        icon: '🍽️',
        baseMacros: { protein: 25, carbs: 55, fats: 20 }
    }
];

export const generateRecommendations = (preferences) => {
    const { loved, hated } = preferences;
    const recommendedMeals = [];

    // Helper to get loved items by category
    const getLovedByCategory = (cat) => loved.filter(item => item.category === cat);

    // Check if we have enough data
    if (loved.length < 3) return [];

    MEAL_TEMPLATES.forEach(template => {
        const ingredients = [];
        let missingCategory = false;

        template.structure.forEach(cat => {
            const options = getLovedByCategory(cat);
            // Try to find an option that isn't already used
            const choice = options.find(opt => !ingredients.includes(opt.name));

            if (choice) {
                ingredients.push(choice.name);
            } else if (options.length > 0) {
                ingredients.push(options[0].name); // Fallback to first if all used
            } else {
                missingCategory = true;
            }
        });

        // Only recommend if we can satisfy the structure
        if (!missingCategory) {
            recommendedMeals.push({
                ...template,
                ingredients,
                matchReason: `Based on your love for ${ingredients[0]} and ${ingredients[1]}`,
                calories: Math.floor(Math.random() * (650 - 450 + 1)) + 450
            });
        }
    });

    return recommendedMeals.slice(0, 3);
};
