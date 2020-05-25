const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

/* POST reg page. */
router.post('/', async (req, res) => {
  const { username, email, password, passwordRep } = req.body;
  try {
    if (password === passwordRep) {
      const user = await new User({
        name: username,
        password,
        email,
      }).save();

      req.session.user = {
        name: user.name,
        id: user._id,
        email: user.email
      };

      req.session.auth = true;
      
      return res.json({
        success: true,
      });
    }
  } catch (error) {
    res.json(error.message)
  }
});

module.exports = router;
