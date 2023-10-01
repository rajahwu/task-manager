const express = require("express");

const app = express();
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.json({ title: "Home" });
});


app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})