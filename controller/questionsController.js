//Import  db Connection
const dbConnection = require("../db/dbConfig.js");
//Import  https-status-codes module
const { StatusCodes } = require("http-status-codes");

// Function to create a new (single) question
async function postNewQuestion(req, res) {
  const { title, description, tag } = req.body;
  const { userid } = req.user;

  if (!req.body.title || !req.body.description || !userid) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }
  try {
    // Check if a question with the same title and description already exists in the database of questions table
    await dbConnection.query(
      "SELECT title, description FROM questionTabel WHERE title = ? AND description = ?", 
      [title, description]
    );
    // Insert the new question into the database with the generated questionid, title, description, userid these are come from questions table tags are come from tags table
    const [resultQuestion] = await dbConnection.query(
      "INSERT INTO questionTabel (userid,title, description,tag) VALUES (?,?, ?, ?)",
      [userid, title, description, tag]
    );
    const questionid = resultQuestion.insertId; //Get the auto-generated questionId
    // Return a 201 created response if the question is successfully inserted
    return res.status(StatusCodes.CREATED).json({
      message: "Question created successfully",
      questionid: questionid,
    });
  } catch (error) {
    // Log and return a 500 internal server error response if an error occurs
    console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}
// Function to get ALL questions from database

// Export the functions so they can be used in other parts of the application
module.exports = { postNewQuestion };
