const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { ensureGuest } = require('../middleware/auth');

// ─── GET /auth/register ────────────────────────────────────────────────────────
router.get('/register', ensureGuest, (req, res) => {
  res.render('register', { errors: [], formData: {} });
});

// ─── POST /auth/register ───────────────────────────────────────────────────────
router.post(
  '/register',
  ensureGuest,
  [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),

    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Enter a valid email address')
      .normalizeEmail(),

    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    body('password2')
      .custom((val, { req }) => {
        if (val !== req.body.password) throw new Error('Passwords do not match');
        return true;
      })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('register', {
        errors: errors.array(),
        formData: { name: req.body.name, email: req.body.email }
      });
    }

    const { name, email, password } = req.body;

    try {
      // Check if email already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.render('register', {
          errors: [{ msg: 'Email is already registered.' }],
          formData: { name, email }
        });
      }

      // Create new user (password hashed in model pre-save hook)
      const user = new User({ name, email, password });
      await user.save();

      req.flash('success_msg', '✅ Registration successful! Please log in.');
      res.redirect('/auth/login');
    } catch (err) {
      console.error(err);
      res.render('register', {
        errors: [{ msg: 'Server error. Please try again.' }],
        formData: { name, email }
      });
    }
  }
);

// ─── GET /auth/login ───────────────────────────────────────────────────────────
router.get('/login', ensureGuest, (req, res) => {
  res.render('login');
});

// ─── POST /auth/login ──────────────────────────────────────────────────────────
router.post('/login', ensureGuest, (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
});

// ─── GET /auth/logout ──────────────────────────────────────────────────────────
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash('success_msg', 'You have been logged out successfully.');
    res.redirect('/auth/login');
  });
});

module.exports = router;
