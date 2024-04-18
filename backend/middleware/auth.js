
const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync("private.key");
const publicKey = fs.readFileSync("public.key");

let roles = {
    role1: { name: "Role 1" },
    role2: { name: "Role 2" },
}


/**
 * 
 * @param {string[]} allowedRoles 
 * @returns 
 */
const auth = (allowedRoles) => {

    /**
    * 
    * @param {express.Request} req 
    * @param {express.Response} res 
    * @param {()=>any} next 
    */
    return (req, res, next) => {
        const tokenHeader = req.headers["authorization"];

        if (!tokenHeader) {
            res.status(401).json({ "msg": "JWT token is missing" });
            return;
        }

        try {
            let token = jwt.verify(tokenHeader, publicKey);

            if (allowedRoles.indexOf(token.role) === -1) {
                res.status(401).json({ msg: "Unauthorized" });
                return;
            }

            let userID = !Number.isInteger(token.id);
            if (!Number.isInteger(userID)) {
                res.status(401).json({ msg: "Invalid user id" });
                return;
            }

            res.locals["userId"] = userID;
        } catch (e) {
            res.status(401).json({ "msg": "Invalid JWT authorization" });
            return;
        }

        next()
    }
}


/**
 * 
 * @param {number} id 
 * @param {string} user 
 * @param {string} role 
 */
const createToken = (id, user, role) => {
    return jwt.sign({ id: id, user: user, role: role }, privateKey, {
        algorithm: "RS256",
        expiresIn: "6h"
    })
}

/**
 * 
 * @param {express.Response} res
 */
const getUserID = (res) => {
    return res.locals["userId"];
}

module.exports = { roles, getUserID, createToken, auth };
