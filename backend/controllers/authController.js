const jwt = require('jsonwebtoken');

// Hardcoded credentials as requested
const USERNAME = 'Ankitrajput';
const PASSWORD = 'Ankitgravity77';
const JWT_SECRET = process.env.JWT_SECRET || 'ankit_secret_key_123';

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (username === USERNAME && password === PASSWORD) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ success: true, token, username });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
};
