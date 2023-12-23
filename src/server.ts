import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { customLogger } from './examples/middleware/custom_middleware'
import { protect } from './modules/auth'

const app = express()

/**
 * USE MIDDLEWARE
 */
app.use(cors()) //Cross-Origin Resource Sharing - server use this to know who can access this api(default everybody can access this)
app.use(morgan('dev')) //Log incoming request
app.use(express.json()) //Allow client to send JSON
app.use(express.urlencoded({extended: true})) //Make client to encode url to object instead of string
//ex: 'google.com?a=1,thing=otherthing' query string behind "?" will become object for us
app.use(customLogger('Dwcks Dinh')) //Use custom middleware

app.get('/', protect, (req, res) => {
    res.status(200)
    res.json({
        message: "just message"
    })
})

app.use('/api', protect, router)

export default app