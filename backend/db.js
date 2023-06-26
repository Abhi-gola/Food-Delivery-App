const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://agola4965:Abhishek987@cluster0.qp2mshw.mongodb.net/Foodie?retryWrites=true&w=majority';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
        let fetched_data = mongoose.connection.db.collection("food_items");
        let data = await fetched_data.find({}).toArray()
        let fetched_category = mongoose.connection.db.collection("food_category");
        let cat_data = await fetched_category.find({}).toArray()
        global.food_items = data;
        global.food_category = cat_data;
        } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
};

module.exports = connectToMongoDB;
