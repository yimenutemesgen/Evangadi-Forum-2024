

// question routes middleware file
const questionRoutes = require("./routes/questionRoute");
// authentication middleware file
const authMiddleware = require("./middleware/authMiddleware");

// json middleware to extract json data
app.use(express.json())

// question routes middleware
app.use("/api/question", authMiddleware, questionRoutes);
// app.use("/api/question",  questionRoutes);




