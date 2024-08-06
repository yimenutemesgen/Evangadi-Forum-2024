//Import  db Connection
const dbConnection = require("../db/dbConfig");
//Import  https-status-codes module
const { StatusCodes } = require("http-status-codes");

async function getAllQuestions(req, res) {
  try {
    // Query the database to select all questions
    const [questions] = await dbConnection.query(
      "SELECT questionTabel.questionid as question_id, questionTabel.title, questionTabel.description as content, userTable.username as user_name,questionTabel.created_at FROM questionTabel JOIN userTable ON questionTabel.userid = userTable.userid "
    );
    // Check if no questions were found
    if (questions.length===0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "No questions found.",
      });
    }
    // Return a 200 OK response with the list of questions
    return res.status(StatusCodes.OK).json({ questions: questions });
  } catch (error) {
    // Log and return a 500 (OR) internal server error response if an error occurs
    console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}
module.exports = {getAllQuestions};
