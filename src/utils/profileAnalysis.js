// Utility function to analyze user preferences and generate personality insights

export const analyzePreferences = (preferences) => {
    const { loved, hated, superLiked } = preferences;

    // If no data, return defaults
    if (loved.length === 0) {
        return {
            topCategory: 'Not enough data',
            dietStyle: 'Exploring',
            adventurousness: 0,
            healthScore: 50,
            insights: []
        };
    }

    // 1. Find most liked category
    const categoryCount = {};
    loved.forEach(food => {
        categoryCount[food.category] = (categoryCount[food.category] || 0) + 1;
    });
    const topCategory = Object.keys(categoryCount).reduce((a, b) =>
        categoryCount[a] > categoryCount[b] ? a : b
    );

    // 2. Determine diet style based on patterns
    const proteinCount = loved.filter(f => f.category === 'protein').length;
    const vegCount = loved.filter(f => f.category === 'vegetable').length;
    const carbCount = loved.filter(f => f.category === 'carb').length;

    let dietStyle = 'Balanced Eater';
    if (proteinCount > vegCount + carbCount) {
        dietStyle = 'Protein Lover';
    } else if (vegCount > proteinCount + carbCount) {
        dietStyle = 'Veggie Enthusiast';
    } else if (carbCount > proteinCount + vegCount) {
        dietStyle = 'Carb Connoisseur';
    }

    // 3. Calculate adventurousness (based on variety of categories)
    const uniqueCategories = new Set(loved.map(f => f.category)).size;
    const adventurousness = Math.min(100, (uniqueCategories / 6) * 100); // 6 possible categories

    // 4. Calculate health score
    const healthyFoods = ['Grilled Salmon', 'Chicken Breast', 'Tofu', 'Broccoli', 'Spinach', 'Kale', 'Quinoa', 'Avocado', 'Sweet Potato', 'Greek Yogurt'];
    const healthyCount = loved.filter(f => healthyFoods.includes(f.name)).length;
    const healthScore = Math.min(100, (healthyCount / loved.length) * 100);

    // 5. Generate insights
    const insights = [];

    if (superLiked.length > 0) {
        insights.push({
            icon: '⭐',
            title: 'Super Favorites',
            description: `You absolutely love ${superLiked[0].name}${superLiked.length > 1 ? ` and ${superLiked.length - 1} more` : ''}`
        });
    }

    if (healthScore > 70) {
        insights.push({
            icon: '🥗',
            title: 'Health Conscious',
            description: 'You prefer nutritious, wholesome foods'
        });
    } else if (healthScore < 30) {
        insights.push({
            icon: '🍕',
            title: 'Comfort Food Fan',
            description: 'You enjoy indulgent, satisfying meals'
        });
    }

    if (adventurousness > 70) {
        insights.push({
            icon: '🌍',
            title: 'Adventurous Eater',
            description: 'You love trying diverse cuisines'
        });
    } else if (adventurousness < 30) {
        insights.push({
            icon: '🏠',
            title: 'Classic Tastes',
            description: 'You stick to what you know and love'
        });
    }

    if (topCategory === 'protein') {
        insights.push({
            icon: '💪',
            title: 'Protein Focused',
            description: 'You prioritize protein-rich foods'
        });
    } else if (topCategory === 'vegetable') {
        insights.push({
            icon: '🥬',
            title: 'Plant-Based',
            description: 'Vegetables are your go-to choice'
        });
    }

    return {
        topCategory: topCategory.charAt(0).toUpperCase() + topCategory.slice(1),
        dietStyle,
        adventurousness: Math.round(adventurousness),
        healthScore: Math.round(healthScore),
        insights: insights.slice(0, 3) // Return top 3 insights
    };
};

// Get favorite cuisines based on food tags
export const getFavoriteCuisines = (lovedFoods) => {
    const cuisineCount = {};

    lovedFoods.forEach(food => {
        if (food.tags) {
            food.tags.forEach(tag => {
                if (['italian', 'mexican', 'japanese', 'mediterranean', 'american'].includes(tag)) {
                    cuisineCount[tag] = (cuisineCount[tag] || 0) + 1;
                }
            });
        }
    });

    return Object.entries(cuisineCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([cuisine]) => cuisine.charAt(0).toUpperCase() + cuisine.slice(1));
};
