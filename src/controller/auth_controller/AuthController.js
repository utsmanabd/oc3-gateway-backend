const model = require("../../model/auth.model");
const { generateToken } = require("../../services/auth.service");

const login = async (req, res) => {
    const { nik, password } = req.body;
  
    if (!nik || !password) {
      return res.status(400).json({ error: true, message: 'Please provide both nik and password.' });
    }
  
    let user = await model.login(nik, password);
    if(!user.length > 0){
      return res.status(401).json({ error: true, message: 'Account not found!' });
    }
  
    // Generate a JWT token and send it in the response
    const payload = {
      id: user.id,
      nik: user.nik,
      name: user.name,
      role_id: user.role_id,
      role_detail: user.role_detail,
      permissions: user.permissions
    };
  
    const token = generateToken(payload);
    res.json({ error: false, token, userData: user[0] });
  };
  
  module.exports = {
      login,
  }