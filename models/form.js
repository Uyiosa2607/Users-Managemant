const mongoose = require("mongoose");
// Define schema
const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  relationship: String,
  country: String,
});

// Create a model
const FormData = mongoose.model("FormData", formDataSchema);

// Export the model
module.exports = FormData;
