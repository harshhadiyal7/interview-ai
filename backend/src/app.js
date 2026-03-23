const express = require('express');
const cookieParser = require("cookie-parser")
const app = express();
const cors = require('cors')

app.use(express.json());    
app.use(cookieParser())
app.use(cors({ 
    origin: "http://localhost:5173",
    credentials: true
 }))

//require all routes here
const authRouter = require('./routes/auth.routes');

//use all routes here
app.use('/api/auth', authRouter);



module.exports = app;