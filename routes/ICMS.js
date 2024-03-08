const express = require("express");

const router = express.Router();
router.get("", async (req, res) => {
    res.sendStatus(200).json({ ok: true })
})

module.exports = router;