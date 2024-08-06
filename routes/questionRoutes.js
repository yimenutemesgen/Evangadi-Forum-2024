const express = require("express");
const router = express.Router();

// Import the functions(Logics) which related to questions from the questionController module
const {
  postNewQuestion
} = require("../controller/questionsController.js");

// Route for creating a new question.
router.post("/", postNewQuestion);


module.exports = router;
