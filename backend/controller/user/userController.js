const userModel = require("../../models/userModel");

const getUser = async (req, res)=>{
    try {
    
        const { name } = req.query;    
        const userData = await userModel.findOne({name: name})
        res.status(200).json({user: userData})
        
    } catch (error) {
        console.log(error)
    }
}

const uploadImage = async (req, res)=>{
    try {

        const {id} = req.body

        const imageFile = req.file.filename

        await userModel.findByIdAndUpdate(id,{profileImage: imageFile})

        res.sendStatus(200);

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUser,
    uploadImage
}