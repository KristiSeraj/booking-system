const express = require('express');
const connectDB = require("./server/config/db");
const app = express();
const allRoutes = require('./server/routes/index');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', allRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})