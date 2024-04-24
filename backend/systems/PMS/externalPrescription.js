const express = require("express");
const externalPrescription = require("../../model/ExternalPresription");
const userConcern = require("../../model/userConcern");
const ExternalPrescription = require("../../model/ExternalPresription");

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
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function setExternalPrescription(req, res) {
  try {
    if (
      !req.body.name ||
      !req.body.age ||
      !req.body.phone ||
      !req.body.address ||
      !req.body.email
      // !req.body.file
    ) {
      return res.status(400).send({
        message: "Send all required fields!",
      });
    }

    const prescriptionObject = {
      name: req.body.name,
      age: req.body.age,
      phone: req.body.phone,
      address: req.body.address,
      email: req.body.email,
      notes: req.body.notes,
      // file: req.body.file,
    };

    console.log(prescriptionObject);

    const prescription = await externalPrescription.create(prescriptionObject);

    return res.status(201).send(prescription);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
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

module.exports = {
  getAllUserPrescriptions,
  setUserConcern,
  getUserConcerns,
  deleteConcerns,
  getTotalExternalPrescriptionsCount,
  setExternalPrescription,
  updateExternalPrescriptionStatus,
  deleteExternalPrescription,
};
