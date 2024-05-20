const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const user = require("../backend/routes/user.route");

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser : true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
        console.log("Server running on port: " , PORT);
    })
})
.catch(err => {
    console.log("Error connecting to Database", err);
});

 
app.use(cors({
    //origin: 'http://localhost:4200'
    //origin: 'http://192.168.1.101:4200'
    origin: "https://liontosdionisis.github.io"
}));



app.use("/api/user", user);

module.exports = app;

