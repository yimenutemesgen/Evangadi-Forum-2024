// import React, { useRef, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {axiosConfig} from "../../Api/axiosConfig";
// import { DataContext } from "../../Component/DataProvider/DataProvider";
// import { Type } from "../../utility/actiontype";
// // import classes from "./style.module.css";
// import Layout from "../../Component/Layout/LayoutForquestion&ans";
// import "./signup.css";
// import classes from "./style.module.css"
// import PasswordReset from "./Resetpassword/PasswordReset";
// const Login = () => {
//   const [, dispatch] = useContext(DataContext);
//   const navigate = useNavigate();
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const emailValue = emailRef.current.value;
//     const passwordValue = passwordRef.current.value;

//     if (!emailValue || !passwordValue) {
//       alert("Please provide all required information");
//       return;
//     }

//     try {
//       const response = await axiosConfig.post("/user/login", {
//         email: emailValue,
//         password: passwordValue,
//       });
//       const { token, Username } = response.data;

//       console.log("Login response data:", response.data);

//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify({ Username })); // Store user data
//       // alert("Login successful");
//       dispatch({ type: Type.SET_USER, user: { Username } }); // Ensure user structure matches
//       dispatch({ type: Type.SET_TOKEN, token }); // Store token in state
//       navigate("/");
//     } catch (error) {
//       alert(error?.response?.data?.msg || "An error occurred");
//       console.log(error.response?.data);
//     }
//   };

//   return (
//     <Layout>
//       <section className={classes.user_wrapper}>
//         <div className={classes.inner_Wrapper}>
//           <div className={classes.formWrapper}>
//             <form onSubmit={handleSubmit}>
//               <div className={classes.form_Wrapper}>
//                 <div className={classes.signIn_Wrapper}>
//                   <h6>Login to your account</h6>
//                   <h6>
//                     Don’t have an account?
//                     <Link to="/register">Create a new account</Link>
//                   </h6>
//                 </div>
//                 <div className={classes.email_Wrapper}>
//                   <input
//                     ref={emailRef}
//                     type="email"
//                     placeholder="Email"
//                     style={{ padding: "4% 60% 1% 3%" }}
//                   />
//                 </div>
//                 <br />
//                 <div>
//                   <input
//                     ref={passwordRef}
//                     type="password"
//                     placeholder="Password"
//                     style={{ padding: "4% 60% 1% 3%" }}
//                   />
//                 </div>
//                 <br />
//                 <div>forgotpassword</div>
//                 <button type="submit" style={{ padding: "3% 45% " }}>
//                   Login
//                 </button>
//               </div>
//               <div className={classes.forgotpass} >
//                 <PasswordReset />
//               </div>
//             </form>
//           </div>
//           <div className={classes.rightsideWrapper}>
//             <p>About</p>
//             <h2>Evangadi Networks</h2>
//             <p>
//               No matter what stage of life you are in, whether you’re just
//               starting elementary school or being promoted to CEO of a Fortune
//               500 company, you have much to offer to those who are trying to
//               follow in your footsteps. Wheather you are willing to share your
//               knowledge or you are just looking to meet mentors of your own,
//               please start by joining the network here.
//             </p>
//             <button type="button">CREATE A NEW ACCOUNT</button>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// import React, { useState, useContext, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { axiosConfig } from "../../Api/axiosConfig";
// import { DataContext } from "../../Component/DataProvider/DataProvider";
// import { Type } from "../../utility/actiontype";
// import LoginLayout from "../../Component/Layout/LoginLayout";
// import classes from "./signup.module.css";
// import SignUp from "./SignUp";
// import PasswordReset from "./Resetpassword/PasswordReset";
// import reset from "./Resetpassword/reset.module.css"
// const Login = () => {
//   const [, dispatch] = useContext(DataContext);
//   const navigate = useNavigate();
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);

//   const [view, setView] = useState("login"); // State to manage view

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const emailValue = emailRef.current.value;
//     const passwordValue = passwordRef.current.value;

//     if (!emailValue) {
//       emailRef.current.style.border = "1px solid red";
//     }
//     if (!passwordValue) {
//       passwordRef.current.style.border = "1px solid red";
//     }

//     try {
//       const response = await axiosConfig.post("/user/login", {
//         email: emailValue,
//         password: passwordValue,
//       });
//       const { token, Username } = response.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify({ Username }));
//       dispatch({ type: Type.SET_USER, user: { Username } });
//       dispatch({ type: Type.SET_TOKEN, token });
//       navigate("/");
//     } catch (error) {
//       alert(error?.response?.data?.msg || "An error occurred");
//     }
//   };

//   return (
//     <LoginLayout>
//       <section className={classes.signup}>
//         <div className={classes.signup__container}>
//           <div className={classes.signup__form}>
//             {view === "login" && (
//               <form onSubmit={handleSubmit}>
//                 <div className={classes.form_Wrapper}>
//                   <div className={classes.signIn_Wrapper}>
//                     <h6>Login to your account</h6>
//                     <p>
//                       Don’t have an account?
//                       <button
//                         type="button"
//                         style={{
//                           backgroundColor: "white",
//                           color: "#FE8402",
//                         }}
//                         onClick={() => setView("signup")}
//                       >
//                         Create a new account
//                       </button>
//                     </p>
//                   </div>
//                   <div className={classes.email_Wrapper}>
//                     <input ref={emailRef} type="email" placeholder="Email" />
//                   </div>
//                   <div className={classes.input_wrapper}>
//                     <input
//                       ref={passwordRef}
//                       type="password"
//                       placeholder="Password"
//                     />
//                   </div>
//                   <button
//                     type="button"
//                     className={classes.password_Wrapper}
//                     style={{
//                       backgroundColor: "white",
//                       color: "#FE8402",
//                     }}
//                     onClick={() => setView("reset")}
//                   >
//                     Forgot password?
//                   </button>
//                   <br />
//                   <button type="submit" className={classes.LoginWrapper}>
//                     Login
//                   </button>
//                 </div>
//               </form>
//             )}

//             {view === "signup" && (
//               <div className={classes.signup_wrapper}>
//                 <SignUp />
//               </div>
//             )}

//             {view === "reset" && (
//               <div className={classes.passwordReset_wrapper}>
//                 <PasswordReset />
//               </div>
//             )}
//           </div>
//           <div className={classes.login__about}>
//             <p className={classes.about}>About</p>
//             <div className={classes.about__title}>
//               <h1>Evangadi Networks Q & A</h1>
//             </div>
//             <div className={classes.about__Description}>
//               <p>
//                 No matter what stage of life you are in, whether you’re just
//                 starting elementary school or being promoted to CEO of a Fortune
//                 500 company, you have much to offer to those who are trying to
//                 follow in your footsteps.
//               </p>
//               <p>
//                 Whether you are willing to share your knowledge or you are just
//                 looking to meet mentors of your own, please start by joining the
//                 network here.
//               </p>
//             </div>
//             <button>HOW IT WORKS</button>
//           </div>
//         </div>
//       </section>
//     </LoginLayout>
//   );
// };

// export default Login;


// import React, { useState, useContext, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { axiosConfig } from "../../Api/axiosConfig";
// import { DataContext } from "../../Component/DataProvider/DataProvider";
// import { Type } from "../../utility/actiontype";
// import LoginLayout from "../../Component/Layout/LoginLayout";
// import classes from "./signup.module.css";
// import SignUp from "./SignUp";
// import PasswordReset from "./Resetpassword/PasswordReset";
// import reset from "./Resetpassword/reset.module.css";
// import Userlogin from "./Userlogin";
// const Login = () => {
//   // const [, dispatch] = useContext(DataContext);
//   // const navigate = useNavigate();
//   // const emailRef = useRef(null);
//   // const passwordRef = useRef(null);

//   // const [view, setView] = useState("login"); // State to manage view

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const emailValue = emailRef.current.value;
//   //   const passwordValue = passwordRef.current.value;

//   //   if (!emailValue) {
//   //     emailRef.current.style.border = "1px solid red";
//   //   }
//   //   if (!passwordValue) {
//   //     passwordRef.current.style.border = "1px solid red";
//   //   }

//   //   try {
//   //     const response = await axiosConfig.post("/user/login", {
//   //       email: emailValue,
//   //       password: passwordValue,
//   //     });
//   //     const { token, Username } = response.data;

//   //     localStorage.setItem("token", token);
//   //     localStorage.setItem("user", JSON.stringify({ Username }));
//   //     dispatch({ type: Type.SET_USER, user: { Username } });
//   //     dispatch({ type: Type.SET_TOKEN, token });
//   //     navigate("/");
//   //   } catch (error) {
//   //     alert(error?.response?.data?.msg || "An error occurred");
//   //   }
//   // };

//   return (
//     <LoginLayout>
//       <section className={classes.signup}>
//         <div className={classes.signup__container}>
//           <div className={classes.signup__form}>
//             <>
//             <Userlogin/>
//             </>

//             <>
//             <SignUp/>
//             </>
//             <><PasswordReset/></>
//               {/* <form onSubmit={handleSubmit}>
//                 <div className={classes.form_Wrapper}>
//                   <div className={classes.signIn_Wrapper}>
//                     <h6>Login to your account</h6>
//                     <p>
//                       Don’t have an account?
//                       <button
//                         type="button"
//                         style={{
//                           backgroundColor: "white",
//                           color: "#FE8402",
//                         }}
//                         onClick={() => setView("signup")}
//                       >
//                         Create a new account
//                       </button>
//                     </p>
//                   </div>
//                   <div className={classes.email_Wrapper}>
//                     <input ref={emailRef} type="email" placeholder="Email" />
//                   </div>
//                   <div className={classes.input_wrapper}>
//                     <input
//                       ref={passwordRef}
//                       type="password"
//                       placeholder="Password"
//                     />
//                   </div>
//                   <button
//                     type="button"
//                     className={classes.password_Wrapper}
//                     style={{
//                       backgroundColor: "white",
//                       color: "#FE8402",
//                     }}
//                     onClick={() => setView("reset")}
//                   >
//                     Forgot password?
//                   </button>
//                   <br />
//                   <button type="submit" className={classes.LoginWrapper}>
//                     Login
//                   </button>
//                 </div>
//               </form> */}
//           </div>
//           <div className={classes.login__about}>
//             <p className={classes.about}>About</p>
//             <div className={classes.about__title}>
//               <h1>Evangadi Networks Q & A</h1>
//             </div>
//             <div className={classes.about__Description}>
//               <p>
//                 No matter what stage of life you are in, whether you’re just
//                 starting elementary school or being promoted to CEO of a Fortune
//                 500 company, you have much to offer to those who are trying to
//                 follow in your footsteps.
//               </p>
//               <p>
//                 Whether you are willing to share your knowledge or you are just
//                 looking to meet mentors of your own, please start by joining the
//                 network here.
//               </p>
//             </div>
//             <button>HOW IT WORKS</button>
//           </div>
//         </div>
//       </section>
//     </LoginLayout>
//   );
// };

// export default Login;


import React, { useState } from "react";
import UserLogin from "./Userlogin";
import SignUp from "./SignUp";
import PasswordReset from "./Resetpassword/PasswordReset";
import LoginLayout from "../../Component/Layout/LoginLayout";
import classes from "./signup.module.css";

const Login = () => {
  const [view, setView] = useState("login");

  const handleSwitch = (newView) => {
    setView(newView);
  };

  return (
    <LoginLayout>
      <div className={classes.signup}>
        <div className={classes.signup__container}>
          <div className={classes.signup__form}>
            {view === "login" && <UserLogin onSwitch={handleSwitch} />}
            {view === "signUp" && <SignUp onSwitch={handleSwitch} />}
            {view === "passwordReset" && (
              <PasswordReset onSwitch={handleSwitch} />
            )}
          </div>
          <div className={classes.login__about}>
            <p className={classes.about}>About</p>
            <div className={classes.about__title}>
              <h1>Evangadi Networks Q & A</h1>
            </div>
            <div className={classes.about__Description}>
              <p>
                No matter what stage of life you are in, whether you’re just
                starting elementary school or being promoted to CEO of a Fortune
                500 company, you have much to offer to those who are trying to
                follow in your footsteps.
              </p>
              <p>
                Whether you are willing to share your knowledge or you are just
                looking to meet mentors of your own, please start by joining the
                network here.
              </p>
            </div>
            <button>HOW IT WORKS</button>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
};

export default Login;
