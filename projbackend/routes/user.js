const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../controllers/user");
const { isAuthenticated, isAdmin, isSignedIn } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, isAdmin, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, isAdmin, updateUser);
router.get(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  userPurchaseList
);

module.exports = router;
