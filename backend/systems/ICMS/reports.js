const { QueryTypes } = require("sequelize")
const { sequelize } = require("../../model")
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getReports = async (req, res) => {
    const discharge_per_day = await sequelize.query(`SELECT DATE_FORMAT(discharge_date, '%d/%m/%Y') as label, COUNT(*) as value FROM IPDAdmissions WHERE discharge_date is not NULL GROUP BY DATE_FORMAT(discharge_date, '%d/%m/%Y');`, { type: QueryTypes.SELECT });

    const admissions_per_day = await sequelize.query(`SELECT DATE_FORMAT(createdAt, '%d/%m/%Y') as label, COUNT(*) as value FROM IPDAdmissions GROUP BY DATE_FORMAT(createdAt, '%d/%m/%Y');`, { type: QueryTypes.SELECT });

    const priority_wait_list = (await sequelize.query(`SELECT is_priority as label, COUNT(*) as value FROM IPDWaitLists WHERE was_admitted = 0 GROUP BY is_priority`, { type: QueryTypes.SELECT })).map(v => { return { label: v.label ? "Priority" : "Normal", value: v.value } });


    const beds_per_ward = await sequelize.query(`SELECT ward.name as label, COUNT(bed.id) as value FROM Wards as ward, Beds as bed WHERE bed.WardId = ward.id GROUP BY ward.id, ward.name;`, { type: QueryTypes.SELECT });


    res.status(200).json({ discharge_per_day, admissions_per_day, priority_wait_list, beds_per_ward });
}


module.exports = { getReports }