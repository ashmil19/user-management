require('dotenv').config();
const jwt = require('jsonwebtoken');
const userModel = require("../../models/userModel");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userData = await userModel.findOne({ name: name })

    if(userData){
        res.status(400).json({message: "This username already Exists"});
        return
    }

    const newUser = userModel({
        name,
        email,
        password
    })

    await newUser.save()

    res.status(200).json({message: "Account created successfully"})

  } catch (error) {
    console.log(error);
  }
};


const handleLogin = async (req, res)=>{
  try {

    const { name, password} = req.body;
    
    const userData = await userModel.findOne({ name:name })

    if(!userData){
      res.status(400).json({message: "The account is not exist"})
      return
    }

    if(password !== userData.password){
      res.status(400).json({message: "The Password is Wrong"})
      return
    }

    const accessToken = jwt.sign(
      {"username": userData.name},
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s'}
    )
    
    const refreshToken = jwt.sign(
      {"username": userData.name},
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d'}
    )

    userData.refreshToken = refreshToken
    await userData.save();

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
    res.status(200).json({isAdmin: userData.isAdmin, accessToken ,message: "your account is verified"})
    
  } catch (error) {
    console.log(error)
  }
}


const handleRefreshToken = async (req, res)=>{
  try {

    const cookies = req.cookies

    console.log('hai',req.cookies.jwt);
    if(!cookies?.jwt) return res.sendStatus(401); 
    const refreshToken = cookies.jwt
    
    const userData = await userModel.findOne({ refreshToken: refreshToken })
    console.log(userData);
    if(!userData) return res.sendStatus(403)

    //evalute jwt
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded)=>{
        if(err || userData.name !== decoded.username) return res.sendStatus(403);
        const accessToken = jwt.sign(
          {"username": decoded.name},
          process.env.ACCESS_TOKEN_SECRET,
          {expiresIn: '30s'}
        );
        res.json({ accessToken })
      }
    )
    
  } catch (error) {
    console.log(error)
  }
}

const handleLogout = async (req, res)=>{
  try {

    const cookies = req.cookies

    if(!cookies?.jwt) return res.sendStatus(204); //NO content
    const refreshToken = cookies.jwt
    
    // is refreshToken in db
    const userData = await userModel.findOne({ refreshToken: refreshToken })
    if(!userData){
      res.clearCookie('jwt', {httpOnly: true})
      return res.sendStatus(204)
    }

    // Delete refreshToken in db
    await userModel.deleteOne({refreshToken: refreshToken})

    res.clearCookie('jwt', { httpOnly: true })
    res.sendStatus(204)
    
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createUser,
  handleLogin,
  handleRefreshToken,
  handleLogout
};
