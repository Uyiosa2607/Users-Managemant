const express = require("express");

const fetch = require("node-fetch");

const FormData = require("../models/form");

const { default: mongoose } = require("mongoose");

const route = express.Router();

const port = process.env.PORT || 3000;

route.get("/", async (req, res) => {

  const domain = req.get('host');

  try {
    const response = await fetch(`http://${domain}/users`);

    const users = await response.json();

    res.render("main", { users: users });

  } catch (error) {
    console.error("Error:", error);

    res.render("error", { error: "Failed to fetch users" });
  }
});

route.get("/add", (req, res) => {
  res.render("add");
});

route.get("/api-page", (req, res) => {
  res.render("test");
});

route.post("/submit", (req, res) => {
  const { name, email, country, relationship } = req.body;

  const formData = new FormData({
    name,
    email,
    country,
    relationship,
  });

  // Save the form data to MongoDB
  formData
    .save()
    .then(() => {
      res.json({ msg: "User saved to DataBase" });
    })
    .catch((error) => {
      res.status(500).json({ msg: "Error saving form data" });
    });
});

route.get("/users", (req, res) => {
  FormData.find()

    .then((data) => {
      res.json(data);
    })

    .catch((error) => {
      res.status(500).send("Error retrieving user data.");
    });
});

route.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID and delete it
    const deletedUser = await FormData.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


route.get("/edit-user/:id", (req, res) => {
  const documentId = req.params.id;

  FormData.findById(documentId)
    .then((document) => {
      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }
      const userData = document;
      
      res.render("edit", { data: userData });

    })

    .catch((error) => {
      console.error("Error retrieving document:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});


route.put("/user/update/:id", (req, res) => {
  const documentId = req.params.id;
  const updatedData = req.body;

  FormData.findByIdAndUpdate(documentId, updatedData, { new: true })
    .then((updatedDocument) => {
      res.json(updatedDocument);
    })
    .catch((err) => {
      console.error("Failed to update document:", err);
      res.status(500).json({ error: "Failed to update document" });
    });
});

module.exports = route;
