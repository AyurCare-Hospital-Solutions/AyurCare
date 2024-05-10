const express = require("express");
const Staff = require("../model/Staff");
const { object, string } = require("yup");
const router = express.Router();
const { createToken, auth } = require("../middleware/auth");
const bcrypt = require("bcrypt");

const loginValidator = object({
    email: string().email().max(100).required(),
    password: string().min(4).max(100).required()
});


router.post("/login", async (req, res) => {

    try {
        var data = await loginValidator.validate(req.body);
    } catch (validationError) {
        res.status(400).send({ msg: validationError.errors[0] });
        return;
    }

    const user = await Staff.findOne({ where: { email: data.email } });
    if (user && data.password) {
        if (await bcrypt.compare(data.password, user.password)) {
            res.status(200).json(createToken(user));
        } else {
            res.status(400).json({ msg: "Incorrect username or password" })
        }
    } else
        res.status(400).json({ msg: "Incorrect username or password" });
})

module.exports = router;
