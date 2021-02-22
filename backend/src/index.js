require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3001

const parking = require('./routes/parking')

app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
)

app.use('/api/', parking)

app.listen(process.env.PORT || port, () => {
    console.log(`App running on port ${port}.`)
})
