const express = require("express");
const externalPrescription = require("../../model/ExternalPresription");
const userConcern = require("../../model/userConcern");
const ExternalPrescription = require("../../model/ExternalPresription");
const yup = require("yup");
const fs = require("fs");

// External Prescription Validator
const externalPrescriptionValidator = yup
  .object({
    name: yup.string().min(3).max(100).required(),
    age: yup.string().min(1).max(3).required(),
    address: yup.string().min(10).max(200).required(),
    email: yup.string().email().required(),
    phone: yup.string().min(10).max(10).required(),
    specialNotes: yup.string().min(0).max(200),
  })
  .strict();
// .noUnknown();
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getAllUserPrescriptions(req, res) {
  const userPrescriptions = await externalPrescription.findAll();
  res.status(200).json(userPrescriptions);
}

// () for update the external prescrition status
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function updateExternalPrescriptionStatus(req, res) {
  const prescriptionId = Number.parseInt(req.params.id);
  const { status } = req.body;

  try {
    const prescriptionObject = await ExternalPrescription.findByPk(
      prescriptionId
    );
    if (!prescriptionObject) {
      return res.status(404).json({ msg: "Prescription is not found" });
    }

    await prescriptionObject.update({ status: status });
    res.status(200).json({ msg: "Prescription status updated successfully" });
  } catch (error) {
    console.error("Failed to update prescription status:", error);
    res.status(500).json({ msg: "Failed to update prescription status" });
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function uploadPrescription(req, res) {
  try {
    var data = await externalPrescriptionValidator.validate(req.body);
  } catch (validationError) {
    res.status(400).send({ msg: validationError.errors[0] });
    return;
  }

  if (!req.file) {
    res.status(400).send({ msg: "No prescription file given" });
    return;
  }

  try {
    let prescription = await ExternalPrescription.create({
      name: data.name,
      age: data.age,
      address: data.address,
      email: data.email,
      phone: data.phone,
      notes: data.specialNotes,
      file: req.file.filename,
    });
    res.status(200).json(prescription);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "External precription data is invalid!" });
  }
}

module.exports = { uploadPrescription };

// Delete the external prescription
// Delete the external prescription
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function deleteExternalPrescription(req, res) {
  const prescriptionId = Number.parseInt(req.params.id); // Ensure the ID is an integer
  console.log(prescriptionId); // Corrected typo

  try {
    const prescriptionObject = await ExternalPrescription.findByPk(
      prescriptionId
    );

    if (!prescriptionObject) {
      return res.status(404).json({ msg: "Prescription not found" });
    }

    // Correct usage of destroy method on the instance
    await prescriptionObject.destroy();

    res.status(200).json({ msg: "Prescription deleted successfully" });
  } catch (error) {
    console.error("Failed to delete the external prescription", error);
    res.status(500).json({ msg: "Failed to delete the external prescription" });
  }
}

/**
 * Create a new concern from the user.
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function setUserConcern(req, res) {
  // Logging the email to debug; convert to string properly
  console.log(
    "Email received:",
    req.body.email ? req.body.email : "No email provided"
  );

  // Check whether the required fields are present
  if (!req.body.email || !req.body.concern) {
    return res.status(400).send({
      message: "Send all required fields: email and concern",
    });
  }

  // Creating a new concern object
  const newConcern = {
    email: req.body.email,
    concern: req.body.concern,
  };

  try {
    // Insert the new concern into the database
    const concern = await userConcern.create(newConcern);
    console.log("Concern created successfully:", concern);
    res.status(200).send({ message: "Concern successfully submitted" });
  } catch (error) {
    // Log the error and send a server error message
    console.error("Error creating concern:", error.message);
    res.status(500).send({ message: "Concern not successfully created" });
  }
}

//get all the user concerns
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getUserConcerns(req, res) {
  try {
    const userConcerns = await userConcern.findAll({});
    return res.status(200).json({
      count: userConcerns.length,
      data: userConcerns,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
}

// delete the concenrs
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function deleteConcerns(req, res) {
  try {
    //getting the id from the params and convert it as INTEGET TYPE
    const id = Number.parseInt(req.params.id);

    //get the object
    const userConcernModel = await userConcern.findByPk(id);

    //if
    if (!userConcernModel) {
      return res.sendStatus(404).json({ message: "concern is not deleted!" });
    }

    //deleted the ROW using the destory()
    userConcernModel.destroy();

    //send the response
    res.send(200).json({ message: "concern is deleted succesfully!" });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500).json({ message: error.message });
  }
}

// TO GET THE TOTAL NUMBER OF THE EXTERNAL PRESCRIPTIONS
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getTotalExternalPrescriptionsCount(req, res) {
  const sum = await externalPrescription.count();
  res.status(200).json({ count: sum });
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getExternalPrescriptionImage(req, res) {
  let name = req.params.filename;
  if (!name) {
    return res.sendStatus(400);
  }

  if (!fs.existsSync("./uploads/prescriptions/" + name)) {
    return res.sendStatus(404);
  }

  res.sendFile(name, { root: "./uploads/prescriptions" });
}

module.exports = {
  getAllUserPrescriptions,
  setUserConcern,
  getUserConcerns,
  deleteConcerns,
  getTotalExternalPrescriptionsCount,
  setExternalPrescription: uploadPrescription,
  updateExternalPrescriptionStatus,
  deleteExternalPrescription,
  // this is the function for get the external prescription file from the database
  getExternalPrescriptionImage,
};
