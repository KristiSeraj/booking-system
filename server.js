const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("hello world!")
})

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server started on port ${process.env.PORT || 8080}`);
})