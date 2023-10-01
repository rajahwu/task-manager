const express = require("express");

const app = express();
app.use(express.json());

const port = 3000;
const { User } = require('./db/models');

app.get("/", (req, res) => {
  res.json({ title: "Home" });
});

app.get('/users', async (req, res) => {
  // const users = await db.Users.findAll()
  console.log(User)
  res.json({users: "users"})
})


app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})