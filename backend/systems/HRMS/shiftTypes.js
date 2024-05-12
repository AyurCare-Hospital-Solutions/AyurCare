const yup = require("yup");
const { ShiftType } = require("../../model/ShiftType");

const shiftTypeValidator = yup
  .object({
    name: yup.string().required(),
    startTime: yup.string().required(),
    endTime: yup.string().required(),
  })
  .noUnknown();

/**
 * Get all shift types
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllShiftTypes = async (req, res) => {
  res.status(200).json(await ShiftType.findAll());
};

/**
 * Get shift type by id
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getShiftTypeById = async (req, res) => {
  const id = req.params.id;
  const shiftType = await ShiftType.findByPk(id);
  if (!shiftType) {
    res.status(404).json({ message: "Shift type not found" });
    return;
  }
  res.status(200).json(shiftType);
};

/**
 * Create a new shift type
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createShiftType = async (req, res) => {
  try {
    const data = await shiftTypeValidator.validate(req.body);
    const shiftType = await ShiftType.create(data);
    res.status(201).json(shiftType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Update shift type by id
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateShiftType = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await shiftTypeValidator.validate(req.body);
    const shiftType = await ShiftType.findByPk(id);
    if (!shiftType) {
      res.status(404).json({ message: "Shift type not found" });
      return;
    }
    await shiftType.update(data);
    res.status(200).json(shiftType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete shift type by id
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteShiftType = async (req, res) => {
  const id = req.params.id;
  const shiftType = await ShiftType.findByPk(id);
  if (!shiftType) {
    res.status(404).json({ message: "Shift type not found" });
    return;
  }
  await shiftType.destroy();
  res.sendStatus(204);
};

module.exports = {
  getAllShiftTypes,
  getShiftTypeById,
  createShiftType,
  updateShiftType,
  deleteShiftType,
};
