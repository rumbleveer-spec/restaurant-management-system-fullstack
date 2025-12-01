module.exports = {
    apps: [
        {
            name: 'restaurant-backend',
            script: 'server.js',
            env: {
                NODE_ENV: 'production',
                PORT: 5000,
                MONGO_URI: 'mongodb+srv://Ankitrajput:Ankitgravity77@cluster0.xw6m4.mongodb.net/restaurant-db?retryWrites=true&w=majority'
            },
        },
    ],
};
