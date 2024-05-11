
const yup = require("yup");
const Shift = require("../../model/Shift");
const Staff = require("../../model/Staff");
const { ShiftType } = require("../../model/ShiftType");
const { sequelize } = require("../../model");


const shiftValidator = yup
  .object({
    date: yup.date().required(),
    type: yup.number().required(),
    employees: yup.array().of(yup.number()).required(),
  })
  .noUnknown();

/**
 * Get all shifts
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.findAll();
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get shift by id
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getShiftById = async (req, res) => {
  const id = req.params.id;
  try {
    const shift = await Shift.findByPk(id);
    if (!shift) {
      res.status(404).json({ message: "Shift not found" });
      return;
    }
    res.status(200).json(shift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create a new shift
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createShift = async (req, res) => {
  try {
    var data = await shiftValidator.validate(req.body);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

  await sequelize.transaction(async (t) => {
    const shift = await Shift.create({ ShiftTypeId: data.type, date: data.date }, { transaction: t });
    for (let i = 0; i < data.employees.length; i++) {
      const staff = await Staff.findByPk(data.employees[i]);
      if (!staff) {
        throw new Error("Staff not found");
      }
      console.log(staff.id, shift.id)
      await staff.addShift(shift, { transaction: t });
    };
  });
  res.status(201).json({ message: "Shift created" });

};

/**
 * Update shift by id
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateShift = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await shiftValidator.validate(req.body);
    const shift = await Shift.findByPk(id);
    if (!shift) {
      res.status(404).json({ message: "Shift not found" });
      return;
    }
    await shift.update(data);
    res.status(200).json(shift);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete shift by id
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteShift = async (req, res) => {
  const id = req.params.id;
  try {
    const shift = await Shift.findByPk(id);
    if (!shift) {
      res.status(404).json({ message: "Shift not found" });
      return;
    }
    await shift.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all employees
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllEmployees = async (req, res) => {
  try {
    const staff = await Staff.findAll({ attributes: ['id', 'name'] });
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllShifts,
  getShiftById,
  createShift,
  updateShift,
  deleteShift,
  getAllEmployees,
};
