import express from 'express' 
import jwt from 'jsonwebtoken' 
import multer from 'multer' 
import Product from '../models/product.js' 
import { Auth } from '../controllers/auth.js' 

const storage = multer.memoryStorage() 
const upload = multer({ storage: storage }) 

const router = express.Router() 

router.post('/login', async (req, res) => {
    const { adminName, adminPass } = req.body 

    try {
        if (adminName == "sada" && adminPass == "sada") {
            jwt.sign({ adminName }, process.env.token, { expiresIn: '1h' }, (err, token) => {
                if (err) { console.log(err) }
                res.send(token) 
            }) 
        } else {
            res.json({
                error: 'Wrong Password'
            }) 
        }

    } catch (err) {
        console.log(err) 
    }
}) 

router.get('/home', Auth, (req, res) => {
    console.log(req.token) 
    jwt.verify(req.token, process.env.token, (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route', err) 
            res.sendStatus(403) 
        } else {
            res.json({
                message: 'Successful log in',
                authorizedData
            }) 
            console.log('SUCCESS: Connected to protected route') 
        }
    }) 
}) 

router.post('/addproduct', Auth, upload.array('images'), async (req, res) => {
    try {
        const { productName, price, sellerName, category } = req.body 

        const images = req.files.map((file) => ({
            data: file.buffer,
            contentType: file.mimetype,
        })) 

        // Create a new product
        const newProduct = await Product.create({
            productName,
            price,
            sellerName,
            category,
            images: images
        }) 

        res.json({
            success: true,
            message: 'Product uploaded successfully',
            data: newProduct
        }) 
    } catch (error) {
        console.error(error) 
        res.json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        }) 
    }
}) 

export default router 
