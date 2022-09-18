const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
    console.log('uncaughtException');
    console.log('Shutting down');
    process.exit(1);
});

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


const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});


process.on("unhandledRejection", (err) => {
    console.log('unhandledRejection', err);
    console.log('Shutting down');
    server.close(() => {
        process.exit(1);
    })
});