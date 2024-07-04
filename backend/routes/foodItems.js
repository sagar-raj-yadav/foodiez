const express = require('express');
const router = express.Router();

// GET /api/data
router.get('/data', async (req, res) => {
    try {
        // Use the global foodItemsCollection and foodCategoryCollection to access the collections
        const foodItems = await global.foodItemsCollection.find().toArray();
        const foodCategory = await global.foodCategoryCollection.find().toArray();

        // Return both collections in an array
        res.json([foodItems, foodCategory]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
