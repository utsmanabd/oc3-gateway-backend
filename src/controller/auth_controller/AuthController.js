const model = require("../../model/auth.model");
const bcrypt = require('bcrypt')
const saltRounds = 10
const { generateToken } = require("../../services/auth.service");

const login = async (req, res) => {
    const { nik, password } = req.body;
  
    if (!nik || !password) {
      return res.status(400).json({ error: true, message: 'Please provide both nik and password.' });
    }
  
    let user = await model.login(nik);

    if(!user.length > 0){
      return res.status(401).json({ error: true, message: 'Account not found!' });
    }

    const hashedPasswordFromDB = user[0].hashedPassword;
    const isMatch = await bcrypt.compare(password, hashedPasswordFromDB)

    if (isMatch) {
      const payload = {
        id: user[0].id,
        nik: user[0].nik,
        name: user[0].name,
        role_id: user[0].role_id,
        role_detail: user[0].role_detail,
        photo: user[0].photo
      };
    
      const token = generateToken(payload);
      res.json({ error: false, token, userData: payload });
    } else {
      res.status(401).json({ error: true, message: "Password doesn't match, authentication failed"})
    }
    
  };
  
  module.exports = {
      login,
  }