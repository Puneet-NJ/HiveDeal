import {Strategy as LocalStrategy} from 'passport-local'
import customer from '../models/customer.js'

export const initializingPassport = (passport) =>{

   passport.use(new LocalStrategy(
    {
        usernameField: 'customerEmail',
        passwordField: 'customerPassword'
    }, 
   async (username, password, done) => {
       try {
         const cust = await customer.findOne({customerEmail : username})
         if (!cust) return done(null, false, { message: 'Incorrect email.' })
         if (cust.customerPassword !== password) return done(null, false, { message: 'Incorrect password.' })

         return done(null, cust)
       } catch (err) {
         done(err, false, { message: 'Error during authentication.' })
       }
   }
))

passport.serializeUser((user, done) => {
    // console.log(user)
    done(null, user.id)
})

    passport.deserializeUser(async (id, done)=>{
        try {
            const cust = await customer.findById(id)
            done(null, cust)
        } catch (err) {
            done(err, false)
        }
    })
}


