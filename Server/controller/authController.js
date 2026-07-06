const Pool = require('../config/db');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/Jwt');


const register = async (req, res) => {
    let { name, email, password, role } = req.body;
    console.log(req.body);

    if (!role) {
        role = "User";
    }

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
      let hashPassword = await bcrypt.hash(password, 10);
      let query = `INSERT INTO Users (name,email,password,role) VALUES ($1,$2,$3,$4)`;
      await Pool.query(query, [name, email, hashPassword, role]);
      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
    if(err.code === '23505'){
        res.status(400).json({message:"Email already exists"})
    }
    else{
        console.error(err);
    res.status(500).json({
      message: err.message
    })
    }
 }
    }



   const login = async (req, res) => {
  try {
    const { email, password } = req.body;
   

     const test = await Pool.query("SELECT NOW()");
  console.log("DB Connected:", test.rows);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const result = await Pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
      console.log("result:",result)
    const user = result.rows[0];
    console.log("user:",user)
    if (!user) {
      return res.status(404).json({ message: "Invalid user Name" });
    }

    const match = await bcrypt.compare(password, user.password);
       console.log("match:",match)
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user);
   
    res.json({ user,token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };