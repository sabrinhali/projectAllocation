const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({

  className: {
      type: String,
      required: true,
  },
  
  groupNumber: {
      type: String,
      required: true,
  },

  topic: {
      type: String,
      required: true,
      unique: true,
  },

  technology: {
      type: String,
      required: true,
  },
  supervisor: {
      type: String,
      required: true,
  },
  mobile: {
      type: Number,
      required: true,
  },
  year: {
      type: Number,
      required: true,
  },

  
});

module.exports = mongoose.model("projects", projectSchema);
