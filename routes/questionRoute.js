const express = require("express");
const router = express.Router();

const {getAllQuestions}=require("../controller/questionController")


  // Route for fetching all questions.
router.get("/", getAllQuestions);

module.exports=router