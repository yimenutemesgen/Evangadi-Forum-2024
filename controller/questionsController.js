//Import  db Connection
const dbConnection = require("../db/dbConfig.js");
//Import  https-status-codes module
const { StatusCodes } = require("http-status-codes");


// Function to get SINGLE questions from database
async function getSingleQuestion(req, res) {
  // Destructure the questionid from the request parameters
  const { question_id } = req.params;
  try {
    // Query the database to select the question with the specified questionid
    const [question] = await dbConnection.query(
      "SELECT questionTabel.questionid as question_id, questionTabel.title, questionTabel.description as content, userTable.userid as user_id,questionTabel.created_at FROM questionTabel JOIN userTable ON questionTabel.userid = userTable.userid WHERE questionid = ?",
      [question_id]
    );
    // Check if no question was found on the dataBase
    if (question.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The requested question could not be found.",
      });
    }
    // Return a 200 OK response with the question
    res.status(StatusCodes.OK).json({ question: question[0] }); // Assuming you return a single question
  } catch (error) {
    // Log the error
    console.error(error);
    // Return a 500 internal server error response with an error message
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// Export the functions so they can be used in other parts of the application
module.exports = { getSingleQuestion };
