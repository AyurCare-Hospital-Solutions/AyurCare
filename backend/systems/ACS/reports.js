const {express} = require("express")
const { sequelize } = require("../../model")
const { QueryTypes } = require("sequelize")
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const generateReportData = async (req, res) => {
    const staffCount = await getStaffCountByGroup()
    res.status(200).json(staffCount)
}


const getStaffCountByGroup = async(req,res) => {
    const staffCount = await sequelize.query(`SELECT designation as label, COUNT(*) AS value
    FROM Staffs
    GROUP BY designation;`,{type: QueryTypes.SELECT})

    return staffCount
}

module.exports = {generateReportData}