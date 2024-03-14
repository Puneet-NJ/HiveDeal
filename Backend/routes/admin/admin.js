import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import Product from "../../models/product.js";
import { Auth } from "../../controllers/auth.js";

const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 10 * 1024 * 1024,
	},
});

const router = express.Router();

router.post("/login", async (req, res) => {
	const { adminName, adminPass } = req.body;

	try {
		if (
			adminName == process.env.adminName &&
			adminPass == process.env.adminPass
		) {
			jwt.sign(
				{ adminName },
				process.env.token,
				{ expiresIn: "1h" },
				(err, token) => {
					if (err) {
						console.log(err);
					}
					return res.json({
						admin: true,
						auth: true,
						token: token,
					});
				}
			);
		} else {
			return res.json({
				admin: false,
				auth: false,
				error: "Wrong Password",
			});
		}
	} catch (err) {
		console.log(err);
	}
});

// router.get('/home', Auth, (req, res) => {
//     console.log(req.token)
//     jwt.verify(req.token, process.env.token, (err, authorizedData) => {
//         if (err) {
//             console.log('ERROR: Could not connect to the protected route', err)
//             res.sendStatus(403)
//         } else {
//             res.json({
//                 message: 'Successful log in',
//                 authorizedData
//             })
//             console.log('SUCCESS: Connected to protected route')
//         }
//     })
// })

router.post("/addproduct", Auth, upload.array("images"), async (req, res) => {
	try {
		jwt.verify(req.token, process.env.token, async (err, data) => {
			const { productName, price, sellerName, category, images } = req.body;

			if (err) {
				return res.json("forbidden");
			}

			// const images = req.file;
			const data1 = images?.split(",")[1];
			const type = images?.split(",")[0];

			const binaryData = Buffer.from(data1, "base64");

			// Create the image object
			const image = {
				data: binaryData,
				contentType: type,
			};

			// Create a new product
			const newProduct = await Product.create({
				productName,
				price,
				sellerName,
				category,
				images: [image], // Store the single image in an array
			});

			res.json({
				success: true,
				message: "Product uploaded successfully",
				data: newProduct,
			});
		});
	} catch (error) {
		console.error(error);
		res.json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
});

export default router;
