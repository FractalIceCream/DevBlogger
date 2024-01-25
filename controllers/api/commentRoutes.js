const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//get all comments
router.get('/', withAuth, async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        user_id: req.session.user_id
      }
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
})

//post new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // res.redirect('/home');
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;