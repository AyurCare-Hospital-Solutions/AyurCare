const express = require("express");
const router = express.Router();

const wardService = require("../systems/ICMS/wards");

router.post("/ward", async (req, res) => {
    let name = req.query.name;
    // TODO: validate name

    await wardService.create(name);
    res.sendStatus(200);
});

router.get("/ward", async (req, res) => {
    res.status(200).json(await wardService.get());
});

router.patch("/ward/:id", async (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    // TODO: validate

    await wardService.renameWard(id, name);
    res.sendStatus(200);
});

router.delete("/ward/:id", async (req, res) => {
    let id = req.params.id;
    // TODO: validate

    await wardService.delete(id);
    res.sendStatus(200);
});

module.exports = router;