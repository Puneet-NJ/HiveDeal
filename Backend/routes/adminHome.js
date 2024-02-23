
import express from 'express'
import jwt from 'jsonwebtoken'
import { adminAuth } from '../controllers/auth.js'

const router = express.Router()
router.get('/home' , adminAuth , (req,res)=>{
    console.log(req.token)
    jwt.verify(req.token, process.env.token, (err, authorizedData) => {
        if(err){
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route', err);
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can send the autorized data 
            res.json({
                message: 'Successful log in',
                authorizedData
            });
            console.log('SUCCESS: Connected to protected route');
        }
    })
})

export default router