const router = require('express').Router();
const { UserChore } = require('../../model');


// GET route that checkes for all user data in the db
router.get('/', async (req,res) => {
    try {
        const userData = await UserChore.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET route that check for user by ID

router.delete('/:id', async (req, res) => {
    try {
      const userChoreData = await UserChore.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!userChoreData) {
        res.status(404).json({ message: 'No chore found with this id!' });
        return;
      }
  
      res.status(200).json(userChoreData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// POST route for new users signup
router.post('/assignchore', async (req, res) => {
  console.log(req.body);
    try {
        const createChore = await UserChore.create({
            user_id: req.body.user_id,
            chore_id: req.body.chore_id
          });
        res.status(200).json(createChore)
    } catch (err) {
        res.status(500).json(err)
    }
});
  


module.exports = router;