
import express from 'express'
import jwt from 'jsonwebtoken'
import { Auth } from '../../controllers/auth.js'
import product from '../../models/product.js'

const router = express.Router()
router.get('/home' , Auth , (req,res)=>{
    try {
        jwt.verify(req.token , process.env.token ,async (err ,data) =>{
            const maxOrdered = await product.find().sort({totalItems: +1}).limit(1)
            res.json(maxOrdered)
        })
    } catch (error) {
        
    }
})

export default router