import express from 'express'

import customer from '../models/customer.js'
import passport from 'passport'

const router = express.Router()

// router.get('/' , (req,res)=>{
//     res.render('login')
// })

router.post('/' ,passport.authenticate("local"), async(req,res) =>{
    const {customerEmail, customerPassword} = req.body
   try{
    const customerData = await customer.findOne({customerEmail})


    if(customerData.customerEmail == customerEmail && customerData.customerPassword == customerPassword){
        jwt.sign({customerEmail}, process.env.user_token, { expiresIn: '1h' },(err, token)=> {
            if(err){
              return res.send(err)
            }
            else{
                res.send(token)
            }
    
        })

        req.userId = customerData._id
    }
   }
   catch(err){
    console.log(err)
   }
})


export default router