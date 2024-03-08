const Ward = require("../../model/ward");

async function getWards() {
    return await Ward.findAll();
}

async function createWard(name) {
    await Ward.create({ name: name });
}

async function renameWard(id, newName) {
    let ward = await Ward.findByPk(id);
    if (ward === null) {
        return false;
    }

    ward.name = newName;
    await ward.save();
}



async function deleteWard(id) {
    let ward = await Ward.findByPk(id);
    if (ward === null) {
        return false;
    }

    await ward.destroy();
}

module.exports = { create: createWard, get: getWards, renameWard: renameWard, delete: deleteWard }