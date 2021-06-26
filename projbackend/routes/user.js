const express = require('express');
const router = express.Router()

const {getUserById,getUser,updateUser} = require('../controllers/user');
const {isAuthenticated,isAdmin,isSignedIn} = require('../controllers/auth');



router.param("userId",getUserById);


router.get("/user/:userId",isSignedIn,isAuthenticated,isAdmin,getUser);
router.get("/user/:userId",isSignedIn,isAuthenticated,isAdmin,updateUser);


module.exports = router;