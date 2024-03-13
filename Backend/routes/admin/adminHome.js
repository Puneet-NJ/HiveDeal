
import express from 'express'
import jwt from 'jsonwebtoken'
import { adminAuth } from '../../controllers/auth.js'

const router = express.Router()
router.get('/home' , adminAuth , (req,res)=>{
    try {
        jwt.verify(req.token , process.env.token ,(err ,data) =>{
            const maxOrdered = 
        })
    } catch (error) {
        
    }
})

export default router