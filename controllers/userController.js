const User = require("../models/User");
const mongoose = require("mongoose")
const generateBearerToken = require("../utils/generateToken");
const { createValidation, updateValidation } = require("../validation/user")

const sadEmoji = "😔"

// Create User Func
const createUser = async (req, res) => {
    const { error } = createValidation(req.body);
    if( error ){
        // Format Validation Error Message 

        return res.status(400).json({
            error: true,
            message: error.details[0].message
        })
    }

    // Check if user is already in the Database
    const userExist = await User.findOne({name: req.body.name, gender: req.body.gender})
    if(userExist){
        return res.status(400).json({
            error: true,
            message: "User already Exist"
        })
    }

    // Create User
    const newUser = {
        name: req.body.name,
        gender: req.body.gender
    }

    const user = new User(newUser)
    user.save()
    res.status(200).json({
        error: false,
        message: "User Registered Successfully",
        user
    })
}

// Get User by _ID then return a token made with the ID
const getUser = async (req, res) => {
    var id = req.params.id
    
    User.findById(id)
        .lean().then((results) => {
            if(results){
                return res.status(200).json({
                    error: false,
                    message: "User fetched successfully :)",
                    user: results,
                    token: generateBearerToken(id)
                })
            }else{
                return res.status(404).json({
                    error: true,
                    message: "User not Found 😔",
                })
            }
        }).catch((err)=> {
            console.log(err)
            return res.status(404).json({
                error: true,
                message: "Error getting User 😔"
            })            
        })
}

// Update User using ID
const updateUser = async (req, res) => {
    if(!req.body.name && !req.body.gender){
        return res.status(400).json({
            error: true,
            message: "Data Entries can not be empty"
        })
    }

    const { error } = updateValidation(req.body)
    if(error){
        return res.status(400).json({
            error: true,
            message: error.details[0].message + " " + sadEmoji
        })
    }

    // req.body already screened
    const user = req.body

    try{
        const id = new mongoose.Types.ObjectId(req.params.id)
        User.updateOne({_id: id}, {$set: user})
            .then(_=>{
                return res.status(200).json({
                    error: false,
                    message: "User Updated Successfully"
                })
    
            })
            .catch(_=>{
                // console.log(_)
                return res.status(400).json({
                    error: true,
                    message: "User update Failed " + sadEmoji
                })
    
            })

    }catch(err){
        return res.status(400).json({
            error: true,
            message: "Something went wrong " + sadEmoji 
        })
    }

}

// Delete User by Id
const deleteUser = async (req, res) => {
    User.deleteOne({_id: req.params.id})
        .then(_=>{
            return res.status(200).json({
                error: false,
                message: "User Deleted Successfully"
            })
        })
        .catch(_=>{
            return res.status(400).json({
                error: true,
                message: "User deletion failed"
            })
        })
}

// Getting users depending on query passed
const getUsers = async (req, res) => {
    User.find(req.query)
        .then(users=>{
            return res.status(200).json({
                error: false,
                message: "Users fetched successfully ",
                user: users
            })
        })
        .catch(_=>{
            return res.status(400).json({
                error: true,
                message: "Error fetching users " + sadEmoji 
            })
        })
}

// Get Male Users (Authentication)
const getMaleUsers = async (req, res) => {
    User.find({gender: "Male"})
        .then(users=>{
            return res.status(200).json({
                error: false,
                message: "Male users fetched successfully",
                users
            })
        })
        .catch(_=>{
            return res.status(400).json({
                error: true,
                message: "Error fetching Male Users " + sadEmoji
            })
        })
}


module.exports = { createUser, getUser, updateUser, deleteUser, getUsers, getMaleUsers }