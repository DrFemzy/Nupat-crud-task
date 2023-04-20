const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser")
const env = require("dotenv")
const helmet = require("helmet")

env.config();

const app = express()

// Database Connection
require("./utils/connectDB")

// Routers
const userRouter = require("./routes/userRoutes")

app.use(cors())
app.use(helmet())
app.use(bodyParser.json());

app.use("/api/user", userRouter)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Start Server on port 8080
const server = app.listen(process.env.PORT || 8080, function(){
    const port = server.address().port;

    console.log("App started on port: ", port)
})