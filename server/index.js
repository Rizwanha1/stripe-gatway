const cors = require('cors');
const express = require('express')
const uuid = require('uuid')
const publicKey = 'pk_test_51KDF8oCBbduDchXTUlkHVBMh8Zu30FkMJvvQH1rfYY0OwhDabjHunickAVqpVKIrGJxSFgO8lVpXh4hYVWsnRetH00v8kPJ9Sh';
const secretKey = 'sk_test_51KDF8oCBbduDchXTlcW1dCtkePIDTzyEUcPNy7YqQfUm7nRUladVBNjPNvXKKWwCQ4MMtYkO3eYNCHzWBTZPIeQF00gkq3iHlo';
const stripe = require('stripe')(secretKey)
const app = express();


// middlewares
app.use(express.json())
app.use(cors())


// routes
app.get('/',(request,response)=>{
    response.send('Get Route is working')
})

app.post('/payment',(request,response)=>{
    const { product, token} = request.body;
    console.log('PRODUCT', product);
    console.log('PRODUCT', product.price);
    // not chage twice if error occures
    const idempontencyKey = uuid()
    return stripe.customers.create({
        email:'token.email',
        source : token.id,
    }).then(customer => {
        stripe.charges.create({
            amount : product.price*100,
            currency : 'USD',
            customer: customer.id,
            receipt_email : token.email,
            description: `product.name`,
            shipping : {
                name:token.card.name,
                address:{
                    country : token.card.address_country,
                }
            }
        },{idempontencyKey})
    }).then(result => response.status(200).json(result)).catch(error => console.log(error))
})

// listenpart
const listenPort = 8080
app.listen(listenPort,()=> `Server is Listing at port ${listenPort}`)

