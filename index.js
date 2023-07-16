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

app.get('/api/v1/data', (req, res) => {
  const { data } = app.locals;
  res.status(200).json({ data });
});

app.post('/api/v1/data', (req, res) => {
  const { image, category, id, notes } = req.body;
  const requiredProperties = ['image', 'category', 'id'];

  // for (let requiredParameter of requiredProperties) {
  //   if (req.body[requiredParameter] === undefined) {
  //     return res.status(422).json({
  //       message: `You are missing a required parameter of ${requiredParameter}`
  //     });
  //   }
  // }

    // Check that the userID is a number
    // if (typeof userID !== 'number') {
    //   return res.status(422).json({
    //     message: `Invalid userID data type. userID must be a number.`
    //   })
    // }

    app.locals.data.push({ id, title, description })
    res.status(201).json({ 
      message: "",
      // newData: {
      //   id, 
      //   title,
      //   description,
      // }
    });
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