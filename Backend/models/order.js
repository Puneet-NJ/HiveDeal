import mongoose from 'mongoose'






const orderSchema = mongoose.Schema(
    {
        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'customerCart'
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'customer'
        },
    contact: String,
    house: String,
    street: String,
    landmark: String,
    city: String,


    orderValues:
     [
        {
            product:
            
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
                
            
            totalItems: Number,
            date: 
            {
                type: Date,
                default: Date.now()
            }
        }
        
    ]
})





// {
//     customer:
//     {
//       name: 'sadasd',
//       email: 'sadasd'
//     },
//     prod:
//     [
//       {
//         products: 
//         [
//           {id: 'addas' , name: 'dadaas'},
//           {id: 'sadasda', name: 'dadasadasd'}
//         ],
//         date: 'asdasda'
//       },
//       {
//          products: 
//         [
//           {id: 'addas' , name: 'dadaas'},
//           {id: 'sadasda', name: 'dadasadasd'}
//         ],
//         date: 'asdasda'
//       }
//     ]
//   }


const order = mongoose.model('order' ,orderSchema)
export default order