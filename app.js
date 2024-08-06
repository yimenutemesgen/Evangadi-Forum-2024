

// authentication middleware file
const authMiddleware = require("./middleware/authMiddleware.js");

// json middleware to extract json data
app.use(express.json());



// question routes middleware file
const questionRoutes = require("./routes/questionRoutes.js");
// question routes middleware
app.use("/api/question", authMiddleware, questionRoutes);




async function start() {
  try {
    const result = await dbConnection.execute("select 'test' ");
    await app.listen(PORT);
    // console.log(result[0]);
    console.log("Database connection established");
    console.log(`listening on ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
