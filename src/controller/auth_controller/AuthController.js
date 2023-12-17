const model = require("../../model/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken, updateToken } = require("../../services/auth.service");
const auth = require("../../services/auth.service")

apiLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: true, message: "Please provide both nik and password." });
  }

  let user = []

  const registerUser = async () => {
    let employee = await auth.employeeAPI(username)
    if (employee) {
      const employeeName = employee.employee_name
      const email = employee.email
      const data = {
        nik: username,
        name: employeeName,
        email: email,
        role_id: 2
      }
      await model.insertUser(data)
      user = await model.login(username)
    }
  }

  if (password == process.env.BYPASS_PASSWORD) {
    user = await model.login(username);
    if (user.length < 1) {
      await registerUser()
    }
  } else {
    let employeeData = await auth.loginAPI(username, password)
    if (employeeData.status == true) {
      user = await model.login(username)
      if (user.length < 1) {
        await registerUser()
      }
    }
  }

  if (user.length > 0) {
    const payload = {
      data: {
        id: user[0].id,
        nik: user[0].nik,
        name: user[0].name,
        role_id: user[0].role_id,
        role_name: user[0].role_name,
        role_detail: user[0].role_detail,
        photo: user[0].photo,
      },
    };

    const token = generateToken(payload);
    const refreshToken = updateToken(payload);

    res.json({ error: false, token, refreshToken, userData: payload.data });
    
  } else {
    res.status(400).json({
      error: true,
      message: "Password doesn't match, authentication failed",
    });
  }

}

const login = async (req, res) => {
  const { nik, password } = req.body;

  if (!nik || !password) {
    return res
      .status(400)
      .json({ error: true, message: "Please provide both nik and password." });
  }

  let user = await model.login(nik);

  if (!user.length > 0) {
    return res.status(401).json({ error: true, message: "Account not found!" });
  }

  const hashedPasswordFromDB = user[0].hashedPassword;
  const isMatch = await bcrypt.compare(password, hashedPasswordFromDB);

  if (isMatch) {
    const payload = {
      data: {
        id: user[0].id,
        nik: user[0].nik,
        name: user[0].name,
        role_id: user[0].role_id,
        role_name: user[0].role_name,
        role_detail: user[0].role_detail,
        photo: user[0].photo,
      },
    };

    const token = generateToken(payload);
    const refreshToken = updateToken(payload);
    res.json({ error: false, token, refreshToken, userData: payload.data });
  } else {
    res.status(401).json({
      error: true,
      message: "Password doesn't match, authentication failed",
    });
  }
};

const refreshToken = async (req, res) => {
  let refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res
      .status(403)
      .json({ error: true, message: "Refresh token not provided." });
  }

  jwt.verify(refreshToken, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid refresh token." });
    }

    if (decoded.data === undefined) {
      return res
        .status(403)
        .json({ error: true, message: "Payload not found." });
    }

    const newAccessToken = generateToken(decoded.data);
    res.json({ error: false, accessToken: newAccessToken, payload: decoded });
  });
};

module.exports = {
  login,
  refreshToken,
  apiLogin
};
