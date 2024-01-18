const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            }
        });

        res.render('dashboard', {blogs});
    } catch (error) {
        
    }
})

router.get('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id);

        res.render({blogData});
    } catch (error) {
        res.status(500).json('unable to retrieve blog');
    }
})


router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {where: {
        id: req.body.id,
        user_id: req.session.user_id
      }}
    );
    if (!blogData) {
      res.status(404).json({message: 'post update could not be achieved!'});
      return;
    }
    res.status(200).json({message: 'post updated'});

  } catch (error) {
    res.status(500).json(error);
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json({message: 'deleted post'});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;