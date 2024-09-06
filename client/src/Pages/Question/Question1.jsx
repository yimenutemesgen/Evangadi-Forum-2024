



import { useRef, useState, useContext } from "react";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import { axiosBase } from "../../Api/axiosConfig";
import { useNavigate } from "react-router-dom";
import classes from "./style.module.css";
import Layout from "../../Component/Layout/LayoutForquestion&ans";

function Question1() {
  const [state] = useContext(DataContext);
  const [success, setSuccess] = useState(false);
  const [questionLength, setQuestionLength] = useState(0); // State for character count
  const [errors, setErrors] = useState({ title: "", question: "" }); // Error states
  const user = state.user;
  const titleDome = useRef(null);
  const questionDome = useRef(null);
  const navigate = useNavigate();

  const postQuestion = async (e) => {
    e.preventDefault();
    const title = titleDome.current.value.trim();
    const question = questionDome.current.value.trim();

    // Reset error states and styles
    setErrors({ title: "", question: "" });
    titleDome.current.style.border = "1px solid #ccc";
    questionDome.current.style.border = "1px solid #ccc";
    titleDome.current.style.backgroundColor = "#fff";
    questionDome.current.style.backgroundColor = "#fff";

    let hasError = false;

    if (!title) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Title is required",
      }));
      titleDome.current.style.border = "1px solid red";
      titleDome.current.style.backgroundColor = "pink";
      hasError = true;
    }

    if (!question) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        question: "Question detail is required",
      }));
      questionDome.current.style.border = "1px solid red";
      questionDome.current.style.backgroundColor = "pink";
      hasError = true;
    }

    if (questionLength > 200) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        question: "Question detail cannot exceed 200 characters",
      }));
      hasError = true;
    }

    if (hasError) {
      return; // Stop submission if there are validation errors
    }

    try {
      const result = await axiosBase.post("/question", {
        title,
        description: question,
      });
      console.log(result);
      setSuccess(true);

      // Handle successful post
      // Reset form fields
      titleDome.current.value = "";
      questionDome.current.value = "";
      setQuestionLength(0);

      // Redirect to home page
      setTimeout(() => {
        navigate("/landing");
      }, 2000); // Redirect after 2 seconds to allow the success message to be seen
    } catch (error) {
      alert(error?.response?.data?.msg || "An error occurred.");
      console.log(error.response?.data || error);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestionLength(e.target.value.length);
  };

  return (
    <Layout>
      <section className={classes.questionSection_wrapper}>
        <div className={classes.title__wrapper}>
          <h1>Steps To Write A Good Question</h1>
          <div className={classes.description__Wrapper}>
            <ul>
              <li>Summarize your problems in a one-line title</li>
              <li>Describe your problem in more detail.</li>
              <li>Describe what you tried and what you expected to happen</li>
              <li>Review your question and post it here</li>
            </ul>
          </div>
        </div>
        <div className={classes.answerForm}>
          <h1>Post Your Question</h1>
          <form onSubmit={postQuestion}>
            {success && (
              <p style={{ color: "green", fontSize: "18px" }}>
                Question Posted Successfully. Redirecting to home page...
              </p>
            )}
            <div>
              <input
                ref={titleDome}
                type="text"
                placeholder="Question title"
                style={{
                  borderColor: errors.title ? "red" : "#ccc",
                  backgroundColor: errors.title ? "pink" : "#fff",
                }}
              />
              {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
            </div>
            <br />
            <div>
              <textarea
                ref={questionDome}
                rows="4"
                cols="50"
                placeholder="Question detail"
                onChange={handleQuestionChange} // Update character count on change
                style={{
                  borderColor: errors.question ? "red" : "#ccc",
                  backgroundColor: errors.question ? "pink" : "#fff",
                }}
              />
              <br />
              <span className={classes.charCount}>{questionLength}/200</span>
              {errors.question && (
                <p style={{ color: "red" }}>{errors.question}</p>
              )}
            </div>
            <br />
            <div className={classes.Submit}>
              <button type="submit">Post Question</button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default Question1;

