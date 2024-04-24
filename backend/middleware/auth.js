
const express = require("express");


let roles = {
    role1: { name: "Role 1" },
    role2: { name: "Role 2" },
}


/**
 * 
 * @param {express.Response} res
 */
const getUserID = (res) => {
    return 1;
}

module.exports = { roles, getUserID };
