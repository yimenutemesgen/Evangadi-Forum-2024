// import React, { useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// //import "./signup.css";
// //import Layout from "../../Component/Layout/LayoutForquestion&ans";
// import { axiosConfig } from "../../Api/axiosConfig";
// import { ClipLoader } from "react-spinners";
// const SignUp = () => {
//   const navigate = useNavigate();
//   const usernameRef = useRef(null);
//   const firstnameRef = useRef(null);
//   const lastnameRef = useRef(null);
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);
// const [isLoading,setLoading]=useState(false)
//   async function handleSubmit(e) {
//     // Prevent default form submission
//     e.preventDefault();

//     const usernameValue = usernameRef.current.value;
//     const firstnameValue = firstnameRef.current.value;
//     const lastnameValue = lastnameRef.current.value;
//     const emailValue = emailRef.current.value;
//     const passwordValue = passwordRef.current.value;

//     if (!usernameValue) {
//       usernameRef.current.style.border = "1px solid red";
//       return;
//     }
//     if (!firstnameValue) {
//       firstnameRef.current.style.border = "1px solid red";
//       return;
//     }
//     if (!lastnameValue) {
//       lastnameRef.current.style.border = "1px solid red";
//       return;
//     }
//     if (!emailValue) {
//       emailRef.current.style.border = "1px solid red";
//       return;
//     }
//     if (!passwordValue) {
//       passwordRef.current.style.border = "1px solid red";
//     }

//     try {
//       await axiosConfig.post("/user/register", {
//         username: usernameValue,
//         firstname: firstnameValue,
//         lastname: lastnameValue,
//         email: emailValue,
//         password: passwordValue,
//       });
//       alert("Registration successful, please login!");
//       navigate("/login");
//     } catch (error) {
//       console.error("Something went wrong:", error);
//       alert(
//         error.response?.data?.msg || "Something went wrong, please try again"
//       );
//     }
//   }
//   return (
//     <>
//       <section>
//         <div>
//           <div>
//             <div className="signup__title">
//               <h3>Join the network</h3>
//             </div>
//             <div className="signup__dicription">
//               <p>
//                 Already have an account?{" "}
//                 <span className="signup__dicription--orange">
//                   <Link to="/login">Sign in</Link>
//                 </span>
//               </p>
//             </div>
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <input
//                   className="signup__input"
//                   type="text"
//                   name="userName"
//                   placeholder="  User Name "
//                   ref={usernameRef}
//                 />
//               </div>
//               <div className="firstlast_names">
//                 <input
//                   className="signup__input firstname"
//                   type="text"
//                   name="firstName"
//                   placeholder=" First Name"
//                   ref={firstnameRef}
//                 />
//                 <input
//                   className="signup__input lastname"
//                   type="text"
//                   name="lastName"
//                   placeholder=" Last Name"
//                   ref={lastnameRef}
//                 />
//               </div>
//               <div>
//                 <input
//                   className="signup__input"
//                   type="email"
//                   name="email"
//                   placeholder="  Email "
//                   ref={emailRef}
//                 />
//               </div>
//               <div>
//                 <input
//                   id="password"
//                   className="signup__input"
//                   type="password"
//                   name="password"
//                   placeholder="  Password "
//                   ref={passwordRef}
//                 />
//               </div>
//               <p>
//                 I agree to the{" "}
//                 <Link
//                   style={{
//                     color: "#da7000",
//                   }}
//                 >
//                   privacy policy
//                 </Link>{" "}
//                 and{" "}
//                 <Link
//                   style={{
//                     color: "#da7000",
//                   }}
//                 >
//                   terms of service
//                 </Link>
//               </p>
//               <button className="signup__btn">
//                 {" "}
//                 {isLoading ? (
//                   <ClipLoader color="#000" size={15} />
//                 ) : (
//                   "  Agree and Join"
//                 )}
//               </button>
//             </form>
//             <div className="signup__dicription--orange">
//               <Link to="/login">Already have an account</Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default SignUp;







import { useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import { axiosConfig } from "../../Api/axiosConfig";
import classes from "./signup.module.css";
import { ClipLoader } from "react-spinners";

const SignUp = ({ onSwitch }) => {
  const usernameRef = useRef(null);
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
const [success, setsucsess] = useState(false);
  async function handleSignUp(e) {
    e.preventDefault();

    const usernameValue = usernameRef.current.value;
    const firstnameValue = firstnameRef.current.value;
    const lastnameValue = lastnameRef.current.value;
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      usernameRef.current.style.backgroundColor = !usernameValue
        ? "lightpink"
        : "";
      firstnameRef.current.style.backgroundColor = !firstnameValue
        ? "lightpink"
        : "";
      lastnameRef.current.style.backgroundColor = !lastnameValue
        ? "lightpink"
        : "";
      emailRef.current.style.backgroundColor = !emailValue ? "lightpink" : "";
      passwordRef.current.style.backgroundColor = !passwordValue
        ? "lightpink"
        : "";
      return;
    }

    try {
      setLoading(true);
      await axiosConfig.post("/user/register", {
        username: usernameValue,
        first_name: firstnameValue,
        last_name: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });
setsucsess(true)
      // Switch to the login view directly
    } catch (error) {
      console.error("Something went wrong:", error);
      alert(
        error.response?.data?.msg || "Something went wrong, please try again"
      );
    } finally {
      setLoading(false);
    }
  }
if (success) {
  setTimeout(() => onSwitch("login"), 1000); // Add a delay to ensure the success message can be seen
  return <div>Registration successful, please login!</div>;
}
  return (
    <div>
      <form onSubmit={handleSignUp}>
        <div className={classes.signup__title}>
          <h6>Join the network</h6>
        </div>
        <div className={classes.signUp__Description}>
          <p>
            Already have an account?
            <button
              style={{
                color: "#da7000",
                textDecoration: "none",
                fontFamily: "'Poppins', sans-serif",
                backgroundColor: "white",
              }}
              type="button"
              onClick={() => onSwitch("login")}
              className={classes.signup__Description_orange}
            >
              Sign in
            </button>
          </p>

          
        </div>
        <div>
          <input
            className={classes.signup__input}
            type="text"
            name="userName"
            placeholder="User Name"
            ref={usernameRef}
          />
          <div className={classes.firstLast_names}>
            <input
              className={classes.signup__input}
              type="text"
              name="firstName"
              placeholder="First Name"
              ref={firstnameRef}
            />
            <input
              className={classes.signup__input}
              type="text"
              name="lastName"
              placeholder="Last Name"
              ref={lastnameRef}
            />
          </div>
          <input
            className={classes.signup__input}
            type="email"
            name="email"
            placeholder="Email"
            ref={emailRef}
          />
          <input
            id="password"
            className={classes.signup__input}
            type="password"
            name="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </div>
        <button type="submit" className={classes.signup__btn}>
          {isLoading ? <ClipLoader color="#000" size={15} /> : "Agree and Join"}
        </button>
        <div className={classes.signup__Description_orange}>
          <button type="button" onClick={() => onSwitch("login")}>
            Already have an account?
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

