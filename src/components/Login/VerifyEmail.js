// import React, { useState, useEffect } from "react";
// import "semantic-ui-css/semantic.min.css";
// import "../Login/Login.scss";
// import { Button, Grid, Form, Header } from "semantic-ui-react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Paths } from "../routes/routePaths";
// import RP_Image from "../../assets/img/RP_Image.svg";
// import { authServices } from "../../Services/Auth";

// // const authServices = new Auth

// export default function VerifyEmail() {
//   const [token, setToken] = useState("");
//   const [disableSubmit, setDisableSubmit] = useState(false);

//   useEffect(() => {
//     if (window.location) {
//       if (window.location.search) {
//         var token = window.location.search.split("=")[1];
//         setToken(token);
//       }
//     }
//   }, []);

//   const doVerifyEmail = (e) => {
//     setDisableSubmit(true);

//     console.log("object");
//     e.preventDefault();
//     authServices.verifyEmail(token).then(
//       (data) => {
//         toast.success(data.message, {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//       },
//       (error) => {
//         setDisableSubmit(false);

//         toast.error(error.message, {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//         console.log("error.response.status", error);
//       }
//     );
//   };
//   return (
//     <div className="bg-image">
//       <div className="login-form">
//         <Grid>
//           <Form size="small">
//             <br />
//             <center>
//               <img src={RP_Image} class="RP_Image" />
//             </center>
//             <br />
//             <center>
//               <Header as="h1" className="header-login">
//                 Verify Email
//                 <Header.Subheader>
//                   You must be Verify your email click on verify
//                 </Header.Subheader>
//               </Header>

//               {/* <Image src={logoDeviare} width="150"/> */}
//             </center>
//             <div className="login-input">
//               <Button
//                 className="btn_big_text"
//                 onClick={doVerifyEmail}
//                 style={{ marginBottom: 8, color: "#fff" }}
//                 disabled={disableSubmit}
//               >
//                 Verify
//               </Button>
//             </div>
//           </Form>
//           <div className="bottom-contant">
//             <span className="text-last-login">
//               Already have an account?
//               <span style={{ color: "#0095e2" }}>
//                 <Link to={Paths.LogIn}>Sign in</Link>
//               </span>
//             </span>
//           </div>
//         </Grid>
//       </div>
//     </div>
//   );
// }
