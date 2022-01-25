const router = require('express').Router();
const { User } = require('../../model');


// GET route that checkes for all user data in the db
router.get('/', async (req,res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET route that check for user by ID
router.get('/:id', async (req,res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
          attributes: ['username'] 
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/:id', async (req,res) => {
  try {
    console.log(req.body)
    const updateUser = await User.update(
     
      {
        points: req.body.points,
        
    },

    { where: { id: req.params.id } }
    );

    res.status(200).json(updateUser);
  } catch (err) {
    res.status(400).json(err);
  }
});


// POST route for new users signup
router.post('/', async (req, res) => {
  try {
    console.log("Hello");
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
  

// POST route to login user
router.post('/', async (req, res) => {
  try {
    console.log("Hello")
    console.log(req.body.email)
    console.log(req.body.password)
    const userLogin = await User.findOne({ where: { email: req.body.email } });

    if (!userLogin) {
      res.status(404).json({ message: 'Please try again. Invalid email or password.'});
      return;
    }

    // checks the password entered and compares the email address entered
    const validPassword = userLogin.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Please try again. Invalid email or password.'});
      return;
    } else {
        res.status(200).json({message: "You are now logged in!"})
    }

      req.session.save(() => {
      req.session.user_id = userLogin.id;
      req.session.logged_in = true;
      
      res.json({ user: userLogin, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(500).json(err);
  }
});




router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
