const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const SECRET_KEY = process.env.SECRET_KEY;
const SALT_ROUNDS = 10

const generateToken = (userData) => {
  return jwt.sign(userData, SECRET_KEY, { expiresIn: '24h' });
};

const updateToken = (userData) => {
  return jwt.sign(userData, SECRET_KEY)
}

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  if (!token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  token = token.slice(7)

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
        console.log(err)
      return res.status(403).json({ error: "Failed to authenticate token" });
    }

    req.user = decoded;
    next()
  });
};

encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw new Error('Error encrypting password:', err);
  }
}

const accessControl = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
}

module.exports = {
  generateToken,
  verifyToken,
  accessControl,
  encryptPassword,
  updateToken
}
