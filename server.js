const mongoose = require("mongoose");

const Product = require('./models/Products');



const app = require("./app");
const port = process.env.PORT;


mongoose.connect(process.env.DATABASE, {}).then((con) => {
    console.log('Conectado a la base de datos');

    // const p = new Product({
    //     productName: "producto 2",
    //     price: 10,
    //     description: 'descripcion de producto 1'
    // });

    // p.save().then(() => {
    //     console.log('guardado');
    // });

});


app.listen(port, () => {
    console.log(`App running on port ${port}`);
});