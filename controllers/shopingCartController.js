const catchAsync = require("../utils/catchAsync");
const ShopingCart = require("../models/shopingCart");
const Product = require("../models/Products");
const User = require("../models/User");

exports.addProductoCart = catchAsync(async(req, res) => {


    let usuario_autenticado = req.user;
    let request = req.body;
    const carritos = await ShopingCart.find({
        status: "PENDING"
    });


    if (carritos.length > 0) {


        let dats_primer_carrito = carritos[0];
        let id_carrito = dats_primer_carrito.id;
        let productos_carrito = dats_primer_carrito.products;

        let id_producto_add = request.id_producto;

        let dats_producto = await Product.findById(id_producto_add);

        if (dats_producto) {

            //VERIFICAR SI EL PRODUCTO YA ESTA EL CARRITO 

            flag_existencia_producto = productos_carrito.findIndex(e => e.id_producto == id_producto_add);
            if (flag_existencia_producto == -1) { //SI NO EXISTE EL PRODCUTO EN CARRITO
                let nuevo_producto_carrito = {
                    id_producto: dats_producto.id,
                    precio_venta: request.precio_venta,
                    cantidad: request.cantidad,
                };

                productos_carrito.push(nuevo_producto_carrito);

                let carrito_actualizado = {
                    user: usuario_autenticado.userName,
                    status: 'PENDING',
                    products: productos_carrito
                }

                const update_carrito = await ShopingCart.findByIdAndUpdate(id_carrito, carrito_actualizado, { new: true });

                res.status(200).json({
                    status: "Producto agregado correctamente",
                    timeOfRequest: req.requestTime,
                    results: carritos.length,
                    data: {
                        update_carrito,
                    },
                });
            } else {


                productos_carrito.map(producto => {
                    if (producto.id_producto == id_producto_add) {
                        producto.cantidad = producto.cantidad + 1;
                    }
                    return producto;
                });


                let carrito_actualizado = {
                    user: usuario_autenticado.userName,
                    status: 'PENDING',
                    products: productos_carrito
                }

                const update_carrito = await ShopingCart.findByIdAndUpdate(id_carrito, carrito_actualizado, { new: true });

                res.status(200).json({
                    status: "El producto ya estaba agregado, se aumento la cantidad mas 1",
                    timeOfRequest: req.requestTime,
                    results: carritos.length,
                    data: {
                        update_carrito,
                    },
                });

            }


        } else {
            res.status(200).json({
                status: "Error el id de producto no existe",
                timeOfRequest: req.requestTime
            });
        }
    } else {
        //CREAR UN CARRITO

        let id_producto_add = request.id_producto;

        let dats_producto = await Product.findById(id_producto_add);
        if (dats_producto) {
            let nuevo_carrito = {
                user: usuario_autenticado.userName,
                status: 'PENDING',
                products: [{
                    id_producto: dats_producto.id,
                    precio_venta: request.precio_venta,
                    cantidad: request.cantidad
                }]
            }

            const newCarrito = await ShopingCart.create(nuevo_carrito);

            res.status(200).json({
                status: "Carrito creado correctamente y se agrego el producto",
                timeOfRequest: req.requestTime,
                results: carritos.length,
                data: {
                    newCarrito,
                },
            });
        } else {
            res.status(200).json({
                status: "Error el id de producto no existe",
                timeOfRequest: req.requestTime
            });
        }


    }
});

exports.deleteProductoCart = catchAsync(async(req, res) => {

    let usuario_autenticado = req.user;

    const carritos = await ShopingCart.find({
        status: "PENDING"
    });

    if (carritos.length > 0) {
        let dats_primer_carrito = carritos[0];
        let id_carrito = dats_primer_carrito.id;
        let id_producto_delete = req.params.id;

        const productos_carrito = dats_primer_carrito.products;

        let posicion_producto_delete = productos_carrito.findIndex(producto => producto.id_producto == id_producto_delete);

        if (posicion_producto_delete >= 0) {
            productos_carrito.splice(posicion_producto_delete, 1);

            let carrito_actualizado = {
                user: usuario_autenticado.userName,
                status: 'PENDING',
                products: productos_carrito
            };

            const update_carrito = await ShopingCart.findByIdAndUpdate(id_carrito, carrito_actualizado, { new: true });

            res.status(200).json({
                status: "El producto fue quitado del carrito",
                timeOfRequest: req.requestTime,
                results: carritos.length,
                data: {
                    update_carrito,
                },
            });

        } else {
            res.status(400).json({
                status: "El producto no existe en el carrito",
                timeOfRequest: req.requestTime,
            });
        }
    } else {
        res.status(400).json({
            status: "No hay carritos con estado pendiente",
            timeOfRequest: req.requestTime,
        });
    }


});



exports.payCart = catchAsync(async(req, res) => {

    let usuario_autenticado = req.user;

    const carritos = await ShopingCart.find({
        status: "PENDING"
    });

    if (carritos.length > 0) {
        let dats_primer_carrito = carritos[0];
        let id_carrito = dats_primer_carrito.id;

        const productos_carrito = dats_primer_carrito.products;

        if (productos_carrito.length > 0) {

            let carrito_actualizado = {
                user: usuario_autenticado.userName,
                status: 'PAID',
                products: productos_carrito
            }

            const update_carrito = await ShopingCart.findByIdAndUpdate(id_carrito, carrito_actualizado, { new: true });

            res.status(200).json({
                status: "Carrito pagado correctamente",
                timeOfRequest: req.requestTime,
                results: carritos.length,
                data: {
                    update_carrito,
                },
            });


        } else {
            res.status(400).json({
                status: "El carrito no tiene productos cargados",
                timeOfRequest: req.requestTime,
            });
        }

    } else {
        res.status(400).json({
            status: "No hay carritos con estado pendiente",
            timeOfRequest: req.requestTime,
        });
    }


});