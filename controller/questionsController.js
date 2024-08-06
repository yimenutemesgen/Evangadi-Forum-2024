// Import db Connection
const dbConnection = require("../db/dbConfig.js");
// Import http-status-codes module
const { StatusCodes } = require("http-status-codes");
// Function to get ALL question from database
async function getAllQuestions(req, res) {
  try {
    // Query the database to select all questions
    const [questions] = await dbConnection.query(
      "SELECT questionTabel.questionid as question_id, questionTabel.title, questionTabel.description as content, userTable.username as user_name,questionTabel.created_at FROM questionTabel JOIN userTable ON questionTabel.userid = userTable.userid "
    );
    // Check if no questions were found
    if (questions.length === 0) {
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
// Function to get SINGLE question from database
async function getSingleQuestion(req, res) {
  // Destructure the question_id from the request parameters
  const { question_id } = req.params;
  try {
    // Query the database to select the question with the specified question_id
    const [question] = await dbConnection.query(
      "SELECT questionTabel.questionid as question_id, questionTabel.title, questionTabel.description as content, userTable.userid as user_id, questionTabel.created_at FROM questionTabel JOIN userTable ON questionTabel.userid = userTable.userid WHERE questionid = ?",
      [question_id]
    );
    // Check if no question was found in the database
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

// Function to create a new (single) question
async function postNewQuestion(req, res) {
  const { title, description, tag } = req.body;
  const { userid } = req.user;

  if (!title || !description || !userid) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }
  try {
    // Check if a question with the same title and description already exists in the database
    await dbConnection.query(
      "SELECT title, description FROM questionTabel WHERE title = ? AND description = ?", 
      [title, description]
    );
    // Insert the new question into the database
    const [resultQuestion] = await dbConnection.query(
      "INSERT INTO questionTabel (userid, title, description, tag) VALUES (?, ?, ?, ?)",
      [userid, title, description, tag]
    );
    const questionid = resultQuestion.insertId; // Get the auto-generated questionId
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

// Export the functions so they can be used in other parts of the application
module.exports = { getSingleQuestion, postNewQuestion, getAllQuestions };
