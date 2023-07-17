const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3003;
const app = express();
const data = require('./data/data');

app.locals = {
  title: 'Data',
  data,
}

app.use(cors());
app.use(express.json());

app.get('/api/v1/data/closet', (req, res) => {
  const { data } = app.locals;
  const closetData = data[0].closet 
  res.status(200).json({ closetData });
});

app.get('/api/v1/data/outfits', (req, res) => {
  const { data } = app.locals;
  const outfitData = data[0].outfits
  res.status(200).json({ outfitData });
});


app.post('/api/v1/data/closet', (req, res) => {
  const { image, category, id, notes } = req.body;
  const requiredProperties = ['image', 'category', 'id'];

  for (let requiredParameter of requiredProperties) {
    if (req.body[requiredParameter] === undefined) {
      return res.status(422).json({
        message: `You are missing a required parameter of ${requiredParameter}`
      });
    }
  }

//will need to change push if more than 1 user
    app.locals.data[0].closet[category].push({ id, image, category, notes })
    res.status(201).json({ 
      message: `${id} Item added!`,
      newData: {
        id, 
        image,
        category,
        notes,
      }
    });
    console.log(newData)
})

// app.delete('/api/v1/data/:id', (req, res) => {
//   const  { id } = req.params;
//   const { data } = app.locals;

//   const filteredIdeas = ideas.filter(idea => {
//     return idea.id !== parseInt(id)
//   })

//   app.locals.ideas = filteredIdeas;

//   res.status(200).json({
//     message: `Idea #${id} has deleted`,
//     ideas: filteredIdeas
//   })
// })

app.listen(port, () => {
  console.log(`${app.locals.title} is now running on http://localhost:${port} !`)
});