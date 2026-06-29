const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } = require('../middleware/auth');
const User = require('../models/User');

// ─── GET /dashboard ────────────────────────────────────────────────────────────
// Protected route — only accessible after login
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});

// ─── GET /dashboard/admin ──────────────────────────────────────────────────────
// Admin-only protected route
router.get('/admin', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.render('admin', { users });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading admin panel.');
    res.redirect('/dashboard');
  }
});

// ─── GET /dashboard/profile ────────────────────────────────────────────────────
router.get('/profile', ensureAuthenticated, (req, res) => {
  res.render('profile', { user: req.user });
});

module.exports = router;
