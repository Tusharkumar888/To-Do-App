require('dotenv').config();
const express = require('express')
const router = require('./routes/mainRoute')
const { default: mongoose } = require('mongoose')
const  cors  = require("cors");
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/v1',router)

app.get('/',(req,res)=>{
  res.json({mess:"hello "})
})

const PORT = process.env.PORT || 500;



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});