const userModel = require('../../models/userModel')

const getAllUser = async (req, res) =>{
    try {
        
        const users = await userModel.find();
        res.status(200).json({users})

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getAllUser,
}