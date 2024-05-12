
const yup = require("yup");
const Shift = require("../../model/Shift");
const Staff = require("../../model/Staff");
const { ShiftType } = require("../../model/ShiftType");
const { sequelize } = require("../../model");
const { getUserID } = require("../../middleware/auth");
const { response } = require("express");


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
    const shifts = await Shift.findAll({ include: [ShiftType, { model: Staff, attributes: ['id', 'name'] }] });
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllShiftsByEmpId = async (req, res) => {
  const id = getUserID(res);

  const staff = await Staff.findByPk(id);
  console.log(staff)
  res.status(200).json(await staff.getShifts({ include: [ShiftType, { model: Staff, attributes: ['id', 'name'] }] }));


}

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
    var data = await shiftValidator.validate(req.body);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  const shift = await Shift.findByPk(id);
  if (!shift) {
    res.status(404).json({ message: "Shift not found" });
    return;
  }
  const employees = await shift.getStaffs()

  const toAdd = [];
  const toRemove = []
  data.employees.forEach(e => {
    if (employees.find(v => v.id == e) === undefined) {
      toAdd.push(e);
    }
  });
  employees.forEach(emp => {
    if (data.employees.find(v => v === emp.id) === undefined) {
      toRemove.push(emp)
    }
  })
  console.log(toRemove)

  await sequelize.transaction(async (t) => {

    for (let i = 0; i < toAdd.length; i++) {
      const staff = await Staff.findByPk(toAdd[i]);
      if (!staff) {
        throw new Error("Staff not found");
      }
      await staff.addShift(shift, { transaction: t });
    };

    for (let i = 0; i < toRemove.length; i++) {
      await toRemove[i].removeShift(shift, { transaction: t })
    }


  })

  await shift.update(data);
  res.status(200).json(shift);

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
  getAllShiftsByEmpId,
  getShiftById,
  createShift,
  updateShift,
  deleteShift,
  getAllEmployees,
};
