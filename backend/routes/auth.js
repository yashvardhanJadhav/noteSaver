const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const getUserID = require('../middleware/getUser')

const WEB_TOKEN_SECRET = "TheseIsJSONWebTokenSecret";

// THESE IS REQUEST FOR CREATE A USER BY "POST" /api/auth/createUser
router.post('/createUser', [

    body('name', 'Name is of atlsast 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password is of atleast 3 characters').isLength({ min: 3 })

], async (req, res) => {

    // TRY CATCH BLOCK FOR INTERNAL ERROR OCCURENCE
    let success = false
    try {
        // CHECKING USER THAT ALREADY EXIST  
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "User with these email already exist" })            
        }

        // CHECKING ERROR IN EXPRESS VALIDATOR
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        // CREATING A GENSALT
        const salt = await bcrypt.genSalt(10)
        const secretPassword = await bcrypt.hash(req.body.password, salt)

        //CREATING A NEW USER 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secretPassword
        })

        // CREATING A JSON WEB TOKEN BY USERS ID AS STRING AND SECOND GIVING A SECRET AS WEB_TOKEN_SECRET
        const data = {
            user: {
                id: user.id
            }
        }
        success = true
        const token = jwt.sign(data, WEB_TOKEN_SECRET);
        res.json({ success, token })
    }
    catch (error) {
        success = false
        res.status(500).json({ success, error: "Some Internal Occured" })
    }
})


router.post('/login', [

    body('email', 'Enter a Valid Email').isEmail(),
    body('email', 'Password can not be blank').exists(),

], async (req, res) => {
    try {

        // CHECKING USER THAT ALREADY EXIST  
        let success = false;
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success, error: "Please login with correct Credentials!" })
        }
       

        // COMPARING THE BCRYPT PASSWORD WITH THE GIVEN PASSWORD
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ success, error: "Please login with correct Credentials!" })
        }

        // CHECKING ERROR IN EXPRESS VALIDATOR
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        // CREATING A JSON WEB TOKEN BY USERS ID AS STRING AND SECOND GIVING A SECRET AS WEB_TOKEN_SECRET
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, WEB_TOKEN_SECRET);
        success = true;
        res.json({ success, token })
    }
    catch (error) {
        success = false
        res.status(500).json({ success, error: "Some Internal Occured" })
    }
})


// GETTING USER DETAILS WHEN USER TRY TO LOGGED IN BY  "POST" /api/auth/getuser
// MAKING A MIDDLEWARE OF getUserID FOR TAKING USER ID FROM JSON WEB TOKEN
router.post('/getuser', getUserID, async (req, res) => {
    try {
        const userId = req.user.id;

        // TAKING USER DETAILS BY THEIR BY USERID EXCEPTING PASSWORD
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }
    catch (error) {
        res.status(500).json({ error: "Some Internal Occured" })
    }
})

module.exports = router