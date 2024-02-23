import jwt from "jsonwebtoken" 

export const isAuth = (req,res,next) => {
  if(req.user) next()
  else return res.json('Unaurthorized')
}

export const Auth = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token
        
        next();
    } else {
      
        res.sendStatus(403)
    }
};






