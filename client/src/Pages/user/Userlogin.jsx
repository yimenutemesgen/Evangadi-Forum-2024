// import React, { useState, useContext, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { axiosConfig } from "../../Api/axiosConfig";
// import { DataContext } from "../../Component/DataProvider/DataProvider";
// import { Type } from "../../utility/actiontype";

// import classes from "./signup.module.css";

// const Userlogin = () => {

//   const [, dispatch] = useContext(DataContext);
//   const navigate = useNavigate();
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);

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
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className={classes.form_Wrapper}>
//           <div className={classes.signIn_Wrapper}>
//             <h6>Login to your account</h6>
//             <p>
//               Don’t have an account?
//               <button
//                 type="button"
//                 style={{
//                   backgroundColor: "white",
//                   color: "#FE8402",
//                 }}
//                 onClick={() => setView("signup")}
//               >
//                 Create a new account
//               </button>
//             </p>
//           </div>
//           <div className={classes.email_Wrapper}>
//             <input ref={emailRef} type="email" placeholder="Email" />
//           </div>
//           <div className={classes.input_wrapper}>
//             <input ref={passwordRef} type="password" placeholder="Password" />
//           </div>
//           <button
//             type="button"
//             className={classes.password_Wrapper}
//             style={{
//               backgroundColor: "white",
//               color: "#FE8402",
//             }}
//             onClick={() => setView("reset")}
//           >
//             Forgot password?
//           </button>
//           <br />
//           <button type="submit" className={classes.LoginWrapper}>
//             Login
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Userlogin;

import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { axiosConfig } from "../../Api/axiosConfig";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import { Type } from "../../utility/actiontype";

import classes from "./signup.module.css";

const UserLogin = ({ onSwitch }) => {
  const [, dispatch] = useContext(DataContext);
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
const [error,setError]=useState(false)
    const handleLogin = async (e) => {
      e.preventDefault();

      const emailValue = emailRef.current.value;
      const passwordValue = passwordRef.current.value;

      if (!emailValue) {
        // emailRef.current.style.border = "2px solid lightRed";
         emailRef.current.style.backgroundColor = "lightpink";
      }
      if (!passwordValue) {
        passwordRef.current.style.backgroundColor = "lightpink";
      }

      try {
        const response = await axiosConfig.post("/user/login", {
          email: emailValue,
          password: passwordValue,
        });
        const { token, Username } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ Username }));
        // dispatch({ type: Type.SET_USER, user: { Username } });
        // dispatch({ type: Type.SET_TOKEN, token });
        navigate("/home");
      } catch (error) {
        console.log(error?.response?.data?.msg || "An error occurred");
        setError(true)
      }
    };

  return (
    <>
      <div className={classes.form_Wrapper}>
        <div className={classes.signIn_Wrapper}>
          <form onSubmit={handleLogin}>
            <h6>Login to your account</h6>
            <p>
              Don’t have an account?
              <button
                type="button"
                style={{
                  backgroundColor: "white",
                  color: "#FE8402",
                }}
                onClick={() => onSwitch("signUp")}
              >
                Create a new account
              </button>
              {error ? (
                <div style={{ color: "red", padding: "15px" }}>
                  Either the user name or password your entered is incorrect
                </div>
              ) : (
                ""
              )}
            </p>

            <div className={classes.email_Wrapper}>
              <input ref={emailRef} type="email" placeholder="Email" />
            </div>
            <div className={classes.input_wrapper}>
              <input ref={passwordRef} type="password" placeholder="Password" />
            </div>
            <button
              type="button"
              className={classes.password_Wrapper}
              style={{
                backgroundColor: "white",
                color: "#FE8402",
              }}
              onClick={() => onSwitch("passwordReset")}
            >
              Forgot password?
            </button>
            <button type="submit" className={classes.LoginWrapper}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
