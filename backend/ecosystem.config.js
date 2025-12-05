module.exports = {
    apps: [
        {
            name: 'restaurant-backend',
            script: 'server.js',
            env: {
                NODE_ENV: 'production',
                PORT: 5000,
                MONGO_URI: 'mongodb://127.0.0.1:27017/restaurant_db'
            },
        },
    ],
};
