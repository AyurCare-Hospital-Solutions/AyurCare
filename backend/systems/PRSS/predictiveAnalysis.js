const express = require("express");
const axios = require("axios");
const https = require("https");
const moment = require("moment");
const Patient = require("../../model/Patient");
const cheerio = require("cheerio");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
// get the all patients details
async function getPatients(req, res) {
  const patients = await Patient.findAll();
  return patients;
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
// function get the all predictive details
async function getPredictiveDetails(req, res) {
  try {
    const patients = await getPatients(); // Await the result of getPatients()

    // Calculate age for each patient
    const today = moment();
    const ageData = patients.map((patient) => {
      const age = today.diff(patient.dob, "years");
      return { name: patient.name, age: age };
    });

    // Perform age group analysis
    const ageGroups = {
      children: { minAge: 0, maxAge: 18, count: 0 },
      adults: { minAge: 18, maxAge: 65, count: 0 },
      seniors: { minAge: 65, maxAge: Infinity, count: 0 },
    };

    ageData.forEach((patient) => {
      for (const group in ageGroups) {
        if (
          patient.age >= ageGroups[group].minAge &&
          patient.age < ageGroups[group].maxAge
        ) {
          ageGroups[group].count++;
          break;
        }
      }
    });

    // Call AI API for predictive analytics
    const response = await axios.post(
      "https://api.newurl.com/predict",
      ageData,
      {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    const predictiveAnalyticsResults = response.data;

    // HTML content from predictiveAnalyticsResults
    const htmlContent = predictiveAnalyticsResults;

    // Load the HTML content into cheerio
    const $ = cheerio.load(htmlContent);

    // Extract useful information
    const title = $("title").text();
    const refreshMeta = $('noscript meta[http-equiv="refresh"]').attr(
      "content"
    );
    const redirectURL = refreshMeta ? refreshMeta.split("url=")[1] : null;

    res.json({
      ageData: ageData,
      ageGroups: ageGroups,
      title: $("title").text(),
      redirectURL: redirectURL,
      htmlContent: htmlContent,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getPredictiveDetails };
