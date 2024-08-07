// import { useState, useRef } from "react";
// import { ClipLoader } from "react-spinners";
// import { axiosBase } from "../../../Api/axiosConfig";
// import classes from "./reset.module.css";
// import Login from "../Login";
// import SignUp from "../SignUp";

// const PasswordReset = () => {
//   const [success, setSuccess] = useState(false);
//   const [isLogin, setIsLogin] = useState(false);
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [isLoading, setLoading] = useState(false);
//   const emailRef = useRef(null);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const emailValue = emailRef.current.value;

//     if (!emailValue) {
//       emailRef.current.style.border = "1px solid red";
//       return;
//     }

//     setLoading(true);

//     try {
//       await axiosBase.post("/user/password-reset", { email: emailValue });
//       setSuccess(true);
//     } catch (error) {
//       console.error("Something went wrong:", error);
//       alert(
//         error.response?.data?.msg || "Something went wrong, please try again"
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (success) {
//     return (
//       <div className={classes.signUp}>
//         <div className={classes.signUp__form}>
//           <h6 style={{ color: "green", fontSize: "20px", paddingTop: "20px" }}>
//             Reset instruction sent
//           </h6>
//           <p>
//             Reset instruction is sent to your email. Please check your email to
//             reset your password.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={classes.signUp}>
//       <div className={classes.signUp__form}>

//           <div className={classes.reset__password}>
//             <h6>Reset your password</h6>
//             <p>
//               Fill in your e-mail address below and we will send you an email
//               with further instructions.
//             </p>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className={classes.email_Wrapper}>
//               <input
//                 ref={emailRef}
//                 type="email"
//                 placeholder="Email"
//                 style={{
//                   padding: "3% 59% 3% 3%",
//                   border: "0.2px solid rgb(183, 181, 181)",
//                   borderRadius: "3px",
//                   backgroundColor: "#E8F0FE",
//                 }}
//               />
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 style={{ padding: "4% 39% 4% 31.5%" }}
//                 className="button_wrapper"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <ClipLoader color="#000" size={15} />
//                 ) : (
//                   "Reset your password"
//                 )}
//               </button>
//             </div>
//             <div className={classes.lastContainer_wrapper}>
//               <div className={classes.link_wrapper}>
//                 <div onClick={() => setIsLogin(true)}>
//                   Already have an account?
//                 </div>
//               </div>
//               <div className={classes.signUplink_Wrapper}>
//                 <div onClick={() => setIsSignUp(true)}>
//                   Don't have an account?
//                 </div>
//               </div>
//             </div>
//           </form>
//       </div>
//     </div>
//   );
// };

// export default PasswordReset;

import { useState, useRef } from "react";
import { ClipLoader } from "react-spinners";
import { axiosBase } from "../../../Api/axiosConfig";
import classes from "./reset.module.css";


const PasswordReset = ({ onSwitch }) => {
  const [success, setSuccess] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const emailRef = useRef(null);

    async function handleReset(e) {
      e.preventDefault();
      const emailValue = emailRef.current.value;

      if (!emailValue) {
        emailRef.current.style.border = "1px solid red";
        return;
      }

      setLoading(true);

      try {
        await axiosBase.post("/user/password-reset", { email: emailValue });
        setSuccess(true);
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
      return (
        <div>
          <div>
            <h6
              style={{ color: "green", fontSize: "25px", paddingTop: "45px" }}
            >
              Reset instruction sent
            </h6>
            <p
              style={{
                color: " #67748e",
                fontSize: "18px",
                paddingTop: "10px",
              }}
            >
              Reset instruction is sent to your email. Please check your email
              to reset your password.
            </p>
          </div>
        </div>
      );
    }

  if (success) {
    return (
      <div className={classes.signUp}>
        <div className={classes.signUp__form}>
          <h6 style={{ color: "green", fontSize: "20px", paddingTop: "20px" }}>
            Reset instruction sent
          </h6>
          <p>
            Reset instruction is sent to your email. Please check your email to
            reset your password.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleReset}>
        <div className={classes.reset__password}>
          <h6>Reset your password</h6>
          <p>
            Fill in your e-mail address below and we will send you an email with
            further instructions.
          </p>
        </div>

        <div className={classes.email_Wrapper}>
          <input ref={emailRef} type="email" placeholder="Email" />
        </div>
        <div>
          <button type="submit" className={classes.signUp__btn}>
            {isLoading ? (
              <ClipLoader color="#000" size={15} />
            ) : (
              "Reset your password"
            )}
          </button>
        </div>
        <div>
          <button
            style={{
              textDecoration: "none",
              color: "#fe8402",
              paddingRight: "7%",
              backgroundColor: "white",
            }}
            type="button"
            onClick={() => onSwitch("login")}
          >
            Already have an account?
          </button>
        </div>
        <div>
          <button
            style={{
              textDecoration: "none",
              color: "#fe8402",
              paddingRight: "7%",
              backgroundColor: "white",
            }}
            type="button"
            onClick={() => onSwitch("signUp")}
          >
            Don't have an account?
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
