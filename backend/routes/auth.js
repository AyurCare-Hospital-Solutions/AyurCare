const express = require("express");
const Staff = require("../model/Staff");
const { object, string } = require("yup");
const router = express.Router();
const { createToken } = require("../middleware/auth");

const loginValidator = object({
    email: string().email().max(100).required(),
    password: string().min(4).max(100).required()
});

const tokenExpiry = 4 * 60 * 60 * 1000

router.post("/login", async (req, res) => {

    try {
        var data = await loginValidator.validate(req.body);
    } catch (validationError) {
        res.status(400).send({ msg: validationError.errors[0] });
        return;
    }

    const user = await Staff.findOne({ where: { email: data.email } });
    if (user) {
        // FIXME: re-enable password check
        if (true || await bcrypt.compare(data.password, user.password)) {
            let authToken = createToken(user.id, user.name, "admin")
            res.status(200).cookie("auth", authToken, { httpOnly: true, maxAge: tokenExpiry, }).json({
                user: user.name,
                role: "admin",
                expires: Date.now() + tokenExpiry
            });
        } else {
            res.status(400).json({ msg: "Incorrect username or password" })
        }
    } else
        res.status(400).json({ msg: "Incorrect username or password" });
})

module.exports = router;
