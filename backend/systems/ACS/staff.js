const yup = require("yup");
const Staff = require("../../model/Staff");
const express = require("express");

// Validation schema using Yup
const staffValidator = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  dateHired: yup.date().required(),
  qualification: yup.string().required(),
  designation: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(/^\d{10}$/).required(), // Assuming 10-digit phone number
  homePhone: yup.string().matches(/^\d{10}$/).required(), // Assuming 10-digit phone number
  // Add more validations for other fields as needed
}).noUnknown();

/**
 * Get all staff members
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllStaff = async (req, res) => {
  try {
    const allStaff = await Staff.findAll();
    res.status(200).json(allStaff);
  } catch (error) {
    console.error("Error while fetching staff:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
* Get leave type by id
* @param {express.Request} req
* @param {express.Response} res
*/
const getStaffById = async (req, res) => {
 let id = Number.parseInt(req.params.id);
 if (!Number.isInteger(id)) {
   res.status(400).json({ message: "Invalid id" });
   return;
 }
 let staff = await Staff.findByPk(id);
 if (staff === null) {
   res.status(404).json({ message: "Staff not found" });
   return;
 }
 res.status(200).json({ ...staff.toJSON() });
};

/**
 * Add a new staff member
 * @param {express.Request} req
 * @param {express.Response} res
 */
const addStaff = async (req, res) => {
  try {
    // Validate request body against the schema
    const validatedData = await staffValidator.validate(req.body, { abortEarly: false });

    // Create new staff member
    const newStaff = await Staff.create(validatedData);

    // Return the newly added staff member
    res.status(200).json(newStaff);
  } catch (error) {
    console.error("Error while adding staff:", error);

    if (error.name === "ValidationError") {
      // Validation failed, return validation errors
      const validationErrors = error.errors.map((err) => err.message);
      res.status(400).json({ errors: validationErrors });
    } else {
      // Other errors, return internal server error
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

/**
 * Delete a staff member by ID
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteStaff = async (req, res) => {
  const { id } = req.params; // Extract staff ID from request parameters
  try {
    // Find the staff member by ID
    const staff = await Staff.findByPk(id);

    // If staff member doesn't exist, return 404 Not Found
    if (!staff) {
      return res.status(404).json({ error: "Staff member not found" });
    }

    // Delete the staff member
    await staff.destroy();

    // Return success message
    res.status(200).json({ message: "Staff member deleted successfully" });
  } catch (error) {
    console.error("Error while deleting staff member:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Update a staff member by ID
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateStaff = async (req, res) => {
  const { id } = req.params; // Extract staff ID from request parameters
  try {
    // Find the staff member by ID
    let staff = await Staff.findByPk(id);

    // If staff member doesn't exist, return 404 Not Found
    if (!staff) {
      return res.status(404).json({ error: "Staff member not found" });
    }

    // Validate request body against the schema
    await staffValidator.validate(req.body, { abortEarly: false });
    const validatedData = staffValidator.cast(req.body);
    

    // Update the staff member with new data
    staff = await staff.update(validatedData);

    // Return the updated staff member
    res.status(200).json(staff);
  } catch (error) {
    console.error("Error while updating staff member:", error);

    if (error.name === "ValidationError") {
      // Validation failed, return validation errors
      const validationErrors = error.errors.map((err) => err.message);
      res.status(400).json({ errors: validationErrors });
    } else {
      // Other errors, return internal server error
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = { getAllStaff, addStaff, deleteStaff, updateStaff, getStaffById };
