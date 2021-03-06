// -------------------- IMPORTS -------------------- //

const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Booking, Review, Spot, User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// -------------------- VALIDATION -------------------- //

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// -------------------- ROUTES -------------------- //

router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByPk(userId, {
    include: [
      Booking,
      Review,
      Spot
    ]
  });
  return res.json(user);
}));


// -------------------- EXPORTS -------------------- //

module.exports = router;
