


// db Connection


// authentication middleware file
const authMiddleware = require("./middleware/authMiddleware.js");

// json middleware to extract json data
app.use(express.json());

// user routes middleware file


// question routes middleware file
const questionRoutes = require("./routes/questionRoutes.js");

app.use("/api/question", authMiddleware, questionRoutes);




