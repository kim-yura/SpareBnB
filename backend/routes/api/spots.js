const express = require('express');
const asyncHandler = require('express-async-handler');

const db = require('../../db/models');
const { Booking, Image, Review, Spot, User } = db;

const router = express.Router();



router.get('/', asyncHandler(async (req, res) => {
    const allSpots = await Spot.findAll({
        include: [
            Image,
            Review,
            User
        ]
    });
    return res.json(allSpots);
}));



module.exports = router;
