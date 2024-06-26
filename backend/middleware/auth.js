
const express = require("express");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");

// FIXME: use random bytes 
const secret = Buffer.from("test1234")//randomBytes(64)

const roles = {
    doctor: { name: "Doctor", home: "opcms" },
    medicalStaff: { name: "Medical Staff", home: "icms" },
    hrAdmin: { name: "HR Administrator", home: "hrms" },
    imsAdmin: { name: "IMS Manager", home: "ims" },
    pharmacist: { name: "Pharmacist", home: "pms" },
    dmmsAdmin: { name: "DMMS Manager", home: "dmms" },
    acsAdmin: { name: "User Manager", home: 'acs' },
    prsAdmin: { name: "Reception", home: "prs" }
}

const authNoOp = (req, res, next) => {




    next()
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
    const role = roles[staff.stfType];
    if (!role) {
        throw "Invalid role type"
    }

    const home = role.home;
    const name = role.name;

    return {
        jwt: jwt.sign({ id: staff.id, role: staff.stfType, name: staff.name, role: name, system: home }, secret, {
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
    const userId = res.locals["userId"]
    if (!userId) {
        console.log("Fallback auth")
        return 1;
    }

    return res.locals["userId"];
}

module.exports = { roles, getUserID, createToken, auth, authNoOp };
