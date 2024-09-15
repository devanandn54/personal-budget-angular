const express = require("express");
const app = express();
const port = 3000;

app.use('/', express.static('public'))

const budget = {
    myBudget: [
    {
        title: 'Eat out',
        budget: 50
    },
    {
        title: 'Rent',
        budget: 485
    },
    {
        title: 'Grocery',
        budget: 150
    }
]
};
app.get('/home', (req, res) => {
    res.send("Hello from Devanand");

})

app.get('/budget', (req, res) => {
    res.send(budget);
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})