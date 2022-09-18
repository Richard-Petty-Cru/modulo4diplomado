const fs = require("fs");
const crypto = require("crypto");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async(req, res) => {
    const users = await Product.find();
    res.status(200).json({
        status: "success",
        timeOfRequest: req.requestTime,
        results: users.length,
        data: {
            users,
        },
    });
});

exports.addUser = catchAsync(async(req, res) => {
    req.body.password = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");

    let newUser = await User.create(req.body);
    newUser = newUser.toObject();
    delete newUser.password;

    res.status(200).json({
        status: "success",
        data: {
            user: newUser,
        },
    });
});

exports.getUserById = catchAsync(async(req, res) => {
    const foundUser = await User.findById(req.params.id);

    if (foundUser) {
        res.status(200).json({
            status: "success",
            data: {
                user: foundUser,
            },
        });
    } else {
        res.status(404).json({
            status: "not found",
        });
    }
});

exports.updateUser = catchAsync(async(req, res) => {
    req.body.password = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");

    let updateIsUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    updateIsUser = updateIsUser.toObject();
    delete updateIsUser.password;


    res.status(200).json({
        status: "success",
        data: {
            user: updateIsUser,
        },
    });

});

exports.deleteUser = catchAsync(async(req, res) => {
    const eliminarUser = await User.findByIdAndDelete(req.params.id);
    const users = await User.find();
    res.status(200).json({
        status: "success",
        data: {
            users: users,
        },
    });
});