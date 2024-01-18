const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


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

// router.get('/:id', withAuth, async (req, res) => {
//     try {
//         const blogData = await Blog.findByPk(req.params.id);

//         res.render({blogData});
//     } catch (error) {
//         res.status(500).json('unable to retrieve blog');
//     }
// })


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

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const blogData = await Blog.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!blogData) {
//       res.status(404).json({ message: 'No blog found with this id!' });
//       return;
//     }

//     res.status(200).json(blogData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;