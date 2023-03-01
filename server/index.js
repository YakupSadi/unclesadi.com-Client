const express = require('express')
const app = express()

app.use(express.json())
require('dotenv').config()

// Port
const port = process.env.PORT || 4000

// Db
const connectDB = require('./db/connect')

// Cors
const cors = require('cors');
app.use(cors());

// Cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Middleware
const errorHandler = require('./middleware/error')
app.use(errorHandler)


// Routers
const Admin = require('./routers/admin')
app.use('/api/v1/', Admin)


// Listen
const start = async () => {
  try 
  {
      await connectDB(process.env.MONGO_URL)
      app.listen(port, () => console.log(` Server is listening on port: http://localhost:${port} `))
  }
  catch (err)
  {
      console.log(err)
  }
}
start()