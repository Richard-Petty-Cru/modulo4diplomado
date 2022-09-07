const fs = require("fs");

exports.getAllProducts = (req, res) => {
    const products = JSON.parse(
        fs.readFileSync(`${__dirname}/../data/products.json`)
    );

    res.status(200).json({
        status: "success",
        timeOfRequest: req.requestTime,
        results: products.length,
        data: {
            products,
        },
    });
};

exports.addProduct = (req, res) => {

    const products = JSON.parse(
        fs.readFileSync(`${__dirname}/../data/products.json`)
    );
    products.push(req.body);
    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

    res.status(200).json({
        status: "success",
        data: {
            products,
        },
    });
};

exports.getProductById = (req, res) => {
    const products = JSON.parse(
        fs.readFileSync(`${__dirname}/../data/products.json`)
    );

    const foundProduct = products.find((p) => p.id == req.params.id);
    if (foundProduct) {
        res.status(200).json({
            status: "success",
            data: {
                product: foundProduct,
            },
        });
    } else {
        res.status(404).json({
            status: "not found",
        });
    }
};

exports.updateProduct = (req, res) => {
    const products = JSON.parse(
        fs.readFileSync(`${__dirname}/../data/products.json`)
    );
    //fs.writeFileSync(`${__dirname}/../data/products.json`, '');
    const foundProduct = products.find((p) => p.id == req.params.id);

    if (foundProduct) {


        products.map(function(dato) {
            if (dato.id == foundProduct.id) {
                dato.name = req.body.name;
                dato.price = req.body.price;
                dato.category = req.body.category;
            }
        });

        res.status(200).json({
            status: "success",
            data: {
                product: products,
            },
        });

        fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

    } else {
        res.status(404).json({
            status: "not found",
        });
    }
};


exports.deleteProduct = (req, res) => {
    const products = JSON.parse(
        fs.readFileSync(`${__dirname}/../data/products.json`)
    );

    const posicion = products.findIndex((p) => p.id == req.params.id);
    if (posicion >= 0) {


        products.splice(posicion, 1);

        res.status(200).json({
            status: "success",
            data: {
                product: posicion,
            },
        });

        fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

    } else {
        res.status(404).json({
            status: "not found",
        });
    }
};