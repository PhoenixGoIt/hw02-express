import app from './app.js';
import "dotenv/config"
import mongoose from 'mongoose';


const {DB_HOST, PORT} = process.env

mongoose.connect(DB_HOST)
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((error) => console.log(error)).finally(console.log("Database connection successful"))

