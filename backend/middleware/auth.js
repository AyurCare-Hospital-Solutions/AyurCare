
const express = require("express");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const Staff = require("../model/Staff")

// FIXME: use random bytes 
const secret = Buffer.from("test1234")//randomBytes(64)

let roles = {
    doctor: { name: "Doctor", home: "opcms" },
    medicalStaff: { name: "Medical Staff", home: "icms", perms: ["test"] },
    hrAdmin: { name: "HR Administrator", home: "hrms" }
}


/**
 * 
 * @param {string} permission permission required to access the route 
 * @returns a middleware that check user permissions
 */
const auth = (permission) => {
    /**
    * 
    * @param {express.Request} req 
    * @param {express.Response} res 
    * @param {()=>any} next 
    */
    return (req, res, next) => {
        const tokenHeader = req.headers.authorization;

        if (!tokenHeader) {
            res.status(401).json({ "msg": "JWT token is missing" });
            return;
        }

        try {
            var token = jwt.verify(tokenHeader, secret, { algorithms: ["HS512"] });
        } catch (e) {
            res.status(401).json({ "msg": "Invalid JWT authorization" });
            return;
        }

        const rolePerms = roles[token.role];
        if (!rolePerms || !rolePerms.name || !rolePerms.perms) {
            res.status(401).json({ msg: "Invalid role" });
            return;
        }

        if (rolePerms.perms.indexOf(permission) === -1) {
            res.status(401).json({ msg: "Unauthorized" });
            return;
        }

        let userID = Number(token.id);
        if (!Number.isInteger(userID)) {
            res.status(401).json({ msg: "Invalid user id" });
            return;
        }

        res.locals["userId"] = userID;

        next()
    }
}


/**
 * 
 * @param {Staff} staff - the staff member to create the token for.
 */
const createToken = (staff) => {
    const role = roles[staff.type];

    const home = role ? role.home : "/";
    const name = role ? role.name : staff.type;

    return {
        jwt: jwt.sign({ id: staff.id, role: staff.type, name: staff.name, role: name, system: home }, secret, {
            algorithm: "HS512",
            expiresIn: "6h"
        })
    }
}

/**
 * 
 * @param {express.Response} res
 */
const getUserID = (res) => {
    return res.locals["userId"];
}

module.exports = { roles, getUserID, createToken, auth };
