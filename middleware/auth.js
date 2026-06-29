// ─── Ensure Authenticated ──────────────────────────────────────────────────────
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.flash('error_msg', 'Please log in to access this page.');
  res.redirect('/auth/login');
};

// ─── Ensure Guest (redirect if already logged in) ──────────────────────────────
const ensureGuest = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  res.redirect('/dashboard');
};

// ─── Ensure Admin Role ─────────────────────────────────────────────────────────
const ensureAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') return next();
  req.flash('error_msg', 'Access denied. Admins only.');
  res.redirect('/dashboard');
};

module.exports = { ensureAuthenticated, ensureGuest, ensureAdmin };
