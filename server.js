// sk_test_51M9yHdJlyqEYKjmZIUQoKNLiO8QVN2vPLlQgF3BDV4DM3nz7kjZsQ6SGzkaGhH5KiWRGPa0a4L5f13D5R8KdoZQD00QBvTEsIZ
// Coffee : price_1M9yiSJlyqEYKjmZYp3mHQ1Q
// Tea : price_1M9yo7JlyqEYKjmZ1ihcuJbD
// Milk : price_1M9ypMJlyqEYKjmZisjS5y7g
const express = require('express');
var cors = require ('cors');
const stripe = require('stripe')('sk_test_51M9yHdJlyqEYKjmZIUQoKNLiO8QVN2vPLlQgF3BDV4DM3nz7kjZsQ6SGzkaGhH5KiWRGPa0a4L5f13D5R8KdoZQD00QBvTEsIZ');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async(req,res)=>{
    /*
    req.body.items
    [
        {
            id:1,
            quantity:3
        }
    ]
    stripe wants
    [
        {
            price:1,
            quantity:3
        }
    ]
     */
    console.log(req.body);
    const items = req.body.items;
    let lineItems =[];
    items.forEach((item)=>{
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });
    const session = await stripe.checkout.sessions.create ({
        line_items: lineItems,
        mode: 'paymnet',
        success_url: 'https://localhost:3000/success',
        cancel_url: 'https://localhost:3000/cancel'
    });
    res.send(JSON.stringify)({
        url: session.url
    })
});
app.listen(4000,()=>console.log('Listening on port 4000!'));