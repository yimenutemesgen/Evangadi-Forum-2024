const express = require("express");
const router = express.Router();

// Import the functions (logics) related to questions from the questionController module
const {
  getSingleQuestion,
  postNewQuestion
} = require("../controller/questionsController.js");

// Route for fetching a single question.
router.get("/:question_id", getSingleQuestion);

// Route for creating a new question.
router.post("/", postNewQuestion);

// Export the router to make it available for use in your Express application.
module.exports = router;
