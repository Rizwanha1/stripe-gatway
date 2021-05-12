import React from 'react';
import { Box, Button } from '@mui/material';
import StripeCheckout from 'react-stripe-checkout';
const Stripegateway = ({ price, productName }) => {
    const makePaymentFunction = (token) => {
        const body = {
            token,
            // product,
        }
        const headers = {
            "Content-Type": "application/json"
        }

        return fetch('http://localhost:8080/payment', {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response)
            const { status } = response
            console.log('status', status);
        })
            .catch(error => console.log('error', error))
    }

    return (
        <StripeCheckout
            stripeKey={'pk_test_51KDF8oCBbduDchXTUlkHVBMh8Zu30FkMJvvQH1rfYY0OwhDabjHunickAVqpVKIrGJxSFgO8lVpXh4hYVWsnRetH00v8kPJ9Sh'}
            token={makePaymentFunction}
            name={productName}
            amount={price * 100}
            shippingAddress
            billingAddress
            zipCode
            alipay
            bitcoin
        >
            <Button variant='filled' color='primary' sx={{ background: '#61DAFB', '&:hover':{background:'#1E1E1E', color:'white'}}}>
                Buy  {price}$
            </Button>
        </StripeCheckout>
    );
}

export default Stripegateway;
