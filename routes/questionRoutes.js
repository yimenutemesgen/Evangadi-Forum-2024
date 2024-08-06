const express = require("express");
const router = express.Router();

// Import the functions(Logics) which related to questions from the questionController module
const {
 
  getSingleQuestion
} = require("../controller/questionsController.js");

// Route for fetching single question.
router.get("/:question_id", getSingleQuestion);

// Export the router to make it available for use in your Express application.
module.exports = router;
