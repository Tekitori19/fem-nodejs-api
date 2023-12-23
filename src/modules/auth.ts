import jwt from 'jsonwebtoken'


export const createJWT = (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        process.env.JWT_SECRET
    )
    return token
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization
    if (!bearer) {
        res.status(401)
        res.json({ message: 'unauthorization' })
        return
    }
 
    const [ _, token] = bearer.split(' ')
    console.log(token, process.env.JWT_SECRET);
    
    if (!token) {
        res.status(401)
        res.json({ message: 'cant access this token' })
        return
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        console.log(payload)
        next()
    } catch (error) {
        console.log(error)
        res.status(401)
        res.json({ message: 'unauthorization' })
        return
    }

}