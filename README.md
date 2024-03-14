![]()
### HiveDeal: MERN E-commerce 


## Features

<p>Admin Features</p> 

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Add a Product | &#10004; | Ability of Add a Product on the System |
| List Products | &#10004; | Ability of List Products |
| Delete a Product | &#10004; | Ability of Delete a Product |
| Users List | &#10004; | Total Number of Users |
| Revenue | &#10004; | Total Revenue |

<b>User Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Create a Cart | &#10004; | Ability of Create a new Cart |
| See Cart | &#10004; | Ability to see the Cart and it items |
| Remove a Cart | &#10004; | Ability of Remove a Cart |
| Add Item | &#10004; | Ability of add a new Item on the Cart |
| Remove a Item | &#10004; | Ability of Remove a Item from the Cart |
| Checkout | &#10004; | Ability to Checkout |

# eCommerce

**HiveDeal** 
This is a full-stack e-commerce project built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to browse products, add them to their cart, and make purchases.

## Setup

1. Clone the repository: `https://github.com/Puneet-NJ/e-commerce`
2. Install dependencies:
    - Backend: 
        - `cd backend`
        - `npm i`
    - Frontend: 
        - `cd frontend && e-commerce`
        - `npm i`
3. Set up environment variables:
Create a `.env` file in the root directory and add the following variables:
` PORT=3000
mongo_URI=YOUR_MONGODB_URL
token=ADMIN_TOKEN(ANY_VALUE)
user_token=USER_TOKEN
adminName=ADMIN_MAIL
adminPass=ADMIN_PASS `

4. Run the development server:
~cd backend~: `npm start`
~cd frontend && cd e-commerce~: `npm start`

5. Access the application:
Server running on `http://localhost:3000` for `backend`
Open `http://localhost:3001` in your webbrowser for `frontend`

## Deployment

The application can be deployed using Vercel. Follow the steps mentioned in the Vercel CLI documentation to deploy the application.

## Contributing

Contributions are welcome! If you find any issues or want to contribute to the project, feel free to open a pull request or submit an issue.