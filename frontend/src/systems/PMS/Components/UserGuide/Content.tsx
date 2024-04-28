import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const Content = () => {
  return (
    <Container maxWidth="lg">
      <Box mt={4} mb={2}>
        <Typography variant="h3" gutterBottom>
          Getting Started 🚀
        </Typography>
        <Typography variant="subtitle1">
          This document provides an overview of the AYURCARE'S Pharmacy
          Management System. It guides you through the system's sections, their
          functionalities, and keyboard shortcuts for efficient navigation.
        </Typography>
      </Box>
      <Divider light />

      {/* Subsection 2a: System Sections */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Describe the Pharmacy Management Sections 🔍
        </Typography>

        <List>
          <ListItem>
            <ListItemText
              primary="Dashboard 📊👀"
              secondary={
                <React.Fragment>
                  Your central hub for{" "}
                  <strong>quick insights and navigation</strong>. The Dashboard
                  provides an at-a-glance view of <strong>critical data</strong>{" "}
                  including medicine counts, inventory levels, and other key
                  metrics. Designed for <strong>efficiency</strong>, it allows
                  users to quickly understand the current status of various
                  aspects of the pharmacy and navigate easily to any section of
                  the system with just one click. Whether you’re tracking stock,
                  reviewing recent transactions, or checking on prescriptions,
                  the Dashboard simplifies your workflow by bringing all{" "}
                  <strong>essential information</strong> together in one place.
                  This description emphasizes the dashboard's role as a central,
                  accessible hub that aggregates{" "}
                  <strong>crucial operational data</strong> and provides
                  shortcuts to other sections, enhancing user{" "}
                  <strong>efficiency</strong> and{" "}
                  <strong>decision-making</strong>.
                </React.Fragment>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Medicines Management 🏥"
              secondary={
                <React.Fragment>
                  Manage and browse your pharmacy's extensive database of
                  medications. This section allows you to{" "}
                  <strong>add, update, and remove medications</strong>,
                  providing detailed information on dosages, interactions, and
                  availability to ensure <strong>efficient patient care</strong>
                  .
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Keep (Note Taker) 🗒️"
              secondary={
                <React.Fragment>
                  Effortlessly record and access important notes and reminders.
                  The Keep section is designed for healthcare professionals to{" "}
                  <strong>
                    jot down critical information, observations, and follow-up
                    tasks
                  </strong>{" "}
                  to enhance communication and documentation accuracy.
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Inventory Request 📦"
              secondary={
                <React.Fragment>
                  Request and track inventory seamlessly. This module
                  facilitates the{" "}
                  <strong>efficient handling of inventory requests</strong>,
                  ensuring that stock levels are maintained and updated in
                  real-time to meet the demands of the pharmacy smoothly.
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Internal Prescription 📄"
              secondary={
                <React.Fragment>
                  Handle prescriptions within your healthcare facility. Internal
                  Prescription allows medical staff to{" "}
                  <strong>create, approve, and manage prescriptions</strong> for
                  in-house patients, streamlining the process from diagnosis to
                  dispensation.
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="External Prescription 📤"
              secondary={
                <React.Fragment>
                  Process and dispatch prescriptions to external entities. This
                  section provides tools for managing prescriptions that need to
                  be <strong>filled outside your facility</strong>, including
                  sending orders to external pharmacies and coordinating with
                  healthcare providers.
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Customer Support 🤝"
              secondary={
                <React.Fragment>
                  Dedicated support for all pharmacy-related inquiries. Our
                  Customer Support section ensures that all your queries are{" "}
                  <strong>handled promptly and efficiently</strong>, providing a
                  reliable point of contact for both patients and healthcare
                  professionals.
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Reports 📈"
              secondary={
                <React.Fragment>
                  Generate detailed reports to drive strategic decision-making.
                  Access{" "}
                  <strong>comprehensive analytics and reporting tools</strong>{" "}
                  to monitor sales, track inventory levels, and analyze customer
                  behavior patterns to optimize operational efficiency and
                  service delivery.
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Box>
      <Divider light />

      {/* Subsection 2b: Keyboard Shortcuts */}
      <Box mt={4} mb={4}>
        <Typography variant="h5" gutterBottom>
          Keymap (Keyboard Shortcuts) 🔍
        </Typography>
        <Grid container spacing={2} sx={{ mb: "70px" }}>
          {/* Common Shortcuts */}
          <Grid item xs={12} md={6} mt={3}>
            <Typography variant="h6" gutterBottom>
              Common Shortcuts
            </Typography>
            <Typography variant="body2">
              These shortcuts are applicable everywhere in the application.
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="/ (Slash)"
                  secondary="Focus on the search bar."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="D "
                  secondary="Open the dashboard view. 🖥️"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="M"
                  secondary="Navigate to the medicines section.  💊"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="I "
                  secondary="Go to Internal prescription. 📄"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="E "
                  secondary="Access External Prescription. 📤"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="R "
                  secondary="Open the Reports section. 📊"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="K "
                  secondary="Open the Keep (note taker). 🗒️"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="U "
                  secondary="Go to the User Guide.📘"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="C "
                  secondary="Access Customer Support. 🤝"
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={6} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Page Specific Shortcuts
      </Typography>
      <Typography variant="body2">
        These shortcuts are applicable only to specific pages within the application.
      </Typography>

      {/* Report Page Shortcuts */}
      <Typography sx={{ mt: 1, mb: 0.5 }} variant="subtitle1" gutterBottom>
        Report Page
      </Typography>
      <List sx={{ pl: 2, pt: 0, pb: 0, mt: 0 }}>
        <ListItem>
          <ListItemText
            primary="P 📑"
            secondary="Trigger the preview of the report in the Report Section."
          />
        </ListItem>
        {/* Add additional shortcuts for the Report Page here if necessary */}
      </List>

      {/* Example for another page - Add similar blocks for other pages with specific shortcuts */}
      <Typography sx={{ mt: 2 }} variant="subtitle1" gutterBottom>
        Medicine Page
      </Typography>
      <List sx={{ pl: 2 }}>
        <ListItem>
          <ListItemText
            primary="A"
            secondary="Add new medicine to the inventory 📦"
          />
        </ListItem>
        {/* Additional shortcuts for the Medicine Page can be added here */}
      </List>
      

      {/* Additional Page-specific sections can be added here in a similar manner */}
    </Grid>
        </Grid>
      </Box>

      <Container maxWidth="lg">
        <Box
          mt={4}
          mb={2}
          style={{ borderTop: "1px solid #ccc", paddingTop: "20px" }}
        >
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ textAlign: "right" }}
          >
            Written by <strong>Vinushan Vimalraj</strong>
          </Typography>
        </Box>
      </Container>
    </Container>
  );
};

export default Content;
