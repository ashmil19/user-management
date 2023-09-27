const userModel = require('../../models/userModel')

const getAllUser = async (req, res) =>{
    try {
        let search = req.query.search || ""
        const query = {
            isAdmin: false,
            $or: [
                {name: { $regex: new RegExp(`^${search}`, "i") }},
                {email: { $regex: new RegExp(`^${search}`, "i") },}
            ]
        }

        const users = await userModel.find(query);
        res.status(200).json({users})

    } catch (error) {
        console.log(error);
    }
}

const editUser = async (req, res) =>{
    try {

        console.log(req.body);
        const {name, email} = req.body
        await userModel.findOneAndUpdate({name},{
            email: email
        })

        res.status(200).json({success: "update.."})
        
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async(req, res) =>{
    try {

        const {id} = req.query;
        await userModel.findByIdAndDelete(id)
        res.status(200).json({message: "user Deleted"})
        
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getAllUser,
    deleteUser,
    editUser,
}