const { Router } = require("express");
const authController = require('../controllers/authController');

const router = Router();

/**
 * GET - /signup
 * Signup Page
 */
router.get("/signup", authController.signup_get);

/**
 * GET - /login
 * Login Page
 */
router.get("/login", authController.login_get);

/**
 * POST - /signup
 * create a new user in db
 */
router.post("/signup",authController.signup_post);

/**
 * POST - /login
 * autheticate the user
 */
router.post("/login", authController.login_post);
/**
 * GET - /logout
 * Log out a user
 */
router.get("/logout", () => {});

module.exports = router;
