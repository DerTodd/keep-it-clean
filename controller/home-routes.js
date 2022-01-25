
const router = require("express").Router();
const { User, Chore, UserChore } = require("../model");
const withAuth = require('../utils/auth');


//Get routes to display username by ID
router.get("/user/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: ["username"],
    });
    
    const usersYo = userData.get({ plain: true });
    
    res.render("homepage", {
      usersYo,logged_in: req.session.loggedIn 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET route to display all usernames of the members in db

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: ["username"],
    });
    //res.status(200).json(userData);



    // Serialize data so the template can read it
    const users = userData.map((user) => user.get({ plain: true }));

const choreData = await Chore.findAll({
    attributes: [
        'chore_name',
        'value',
        'description'
      ],
});

const choresData = choreData.map((data) =>
data.get({ plain: true })
);

const letMeHaveIt = choresData.concat(users)

    // Pass serialized data and session flag into template

    res.render('homepage', { 
        users, choresData, letMeHaveIt
    // logged_in: req.session.logged_in 

    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET route to display all names of the chores in db

router.get('/chores', withAuth, async (req,res) => {
    try {
        
        const userData = await User.findAll({
          include: { all: true, nested: true }});
        
        //res.status(200).json(userData);
    // Serialize data so the template can read it
    const users = userData.map((user) => user.get({ plain: true }));

        const choreData = await Chore.findAll({
            attributes: [
                'id',
                'chore_name',
                'value',
                'description',
                'button'
              ],
        });
        
       const choresData = choreData.map((data) =>
        data.get({ plain: true })
        );
        
        const showMe = await UserChore.findAll({
            
            include:  User,
            include: Chore,
           
        });
        
        const showMeData = showMe.map((data) =>
        data.get({ plain: true })
        );
        console.log(showMeData)
    res.render('choresmain', { choresData,
       users,
        showMeData,
        logged_in: req.session.logged_in
      });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

router.get('/userChores/:id', async (req,res) => {
  try {
      const userData = await UserChore.findByPk(req.params.id, {
        //attributes: ['username'] 
      });
      res.status(200).json(userData);
  } catch (err) {
      res.status(500).json(err);
  }
})

router.get('/userChores', async (req,res) => {
  try {
      const userData = await UserChore.findAll({
        //attributes: ['username'] 
      });
      res.status(200).json(userData);
  } catch (err) {
      res.status(500).json(err);
  }
})

router.get("/welcome", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: ["username"],
    });
    //res.status(200).json(userData);



    // Serialize data so the template can read it
    const users = userData.map((user) => user.get({ plain: true }));

const choreData = await Chore.findAll({
    attributes: [
        'chore_name',
        'value',
        'description'
      ],
});

const choresData = choreData.map((data) =>
data.get({ plain: true })
);

const letMeHaveIt = choresData.concat(users)

    // Pass serialized data and session flag into template

    res.render('welcome', { 
        users, choresData, letMeHaveIt
    // logged_in: req.session.logged_in 

    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/chores');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;
