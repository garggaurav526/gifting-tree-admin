import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import "./Login.scss";
import { Button, Grid, Form, Header, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Paths } from "../routes/routePaths";
import { Icon } from "semantic-ui-react";
import { authServices } from "../../Services/Auth";
import { toast } from "react-toastify";
// import "../../App.scss";
// import loginSideImg from '../../assets/img/login-side-img.jpg'
// import dotImage from '../../assets/img/vector02.png'
// import logoPMS from '../../assets/img/logo.svg'


const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailValidError, setEmailValidateErr] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [verifyMeg, setVerifyMeg] = useState("");
  const [verifyStatus, setVerifyStatus] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [role, setRole] = useState("");
  const [roleError, setRoleError] = useState(false);

  useEffect(() => {
    let email = localStorage.getItem("email");
    let isLogin = localStorage.getItem("isLogin");
    if (email && isLogin) {
      props.history.push(Paths.Dashboard);
    }
  }, []);

  const showHidePassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  };
  const doUserLogin = (e) => {
    e.preventDefault();
    let error = false;
    if (email === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (role === "") {
      setRoleError(true);
    } else {
      setRoleError(false);
    }

    console.log(email, password);
    if (email && password && emailValidError === "") {
      var user = {
        email: email,
        password: password,
      };
      setDisableSubmit(true);

      authServices.userLogin(user).then(
        (data) => {
          toast.success(data.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setDisableSubmit(false);
          localStorage.setItem("email", email);
          localStorage.setItem("role", data.data.data.role);
          localStorage.setItem("ssoToken", data.data.data.access_token);
          localStorage.setItem("isLogin", true);
          localStorage.setItem("uuid", data.data.data.uuid)
          props.history.push("/dashboard");
        },
        (error) => {
          setDisableSubmit(false);
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log("error.response.status", error);
        }
      );
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    var emailValidError;
    if (name === "email" && value !== "") {
      emailValidError = validEmailRegex.test(value)
        ? ""
        : "Email is not valid!";
      setEmailValidateErr(emailValidError);
      setEmail(value);
    } else if (name === "email" && value === "") {
      setEmailValidateErr("Email is Required");
      setEmail(value);
    }
  };

  return (
    <div className="bg-image">
      <Grid style={{height: "100%", margin: 0}}>
        <Grid.Row>
          <Grid.Column width={16} style={{position: "relative"}}>
            <div style={{display: "flex", height: "100%"}}>
            <div className="login-form">
      
      <Form size="small">
        <br />

        <center>
          <Header as="h1" className="header-login" style={{marginTop: 30}}>
            Welcome Back!
            <Header.Subheader>Sign in to continue</Header.Subheader>
          </Header>
        </center>
        <div className="login-input">
          
          <Form.Input
            fluid
            type="email"
            label="Email Id"
            maxLength={50}
            placeholder="Enter Email"
            value={email}
            name="email"
            error={
              emailError || emailValidError
                ? {
                    content: emailValidError
                      ? emailValidError
                      : "Email is required",
                  }
                : false
            }
            onChange={handleInput}
            onKeyUp={() => setEmailError(false)}
          />
          <Form.Input
            fluid
            type={showPassword ? "input" : "password"}
            label="Password"
            placeholder="******"
            value={password}
            maxLength={25}
            name="password"
            icon={
              <Icon
                name={showPassword ? "eye slash" : "eye"}
                link
                onClick={showHidePassword}
              />
            }
            error={
              passwordError ? { content: "Password is required" } : false
            }
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={() => setPasswordError(false)}
          />
          <center>
            <Link
              to="/forgot-password"
              className="lbl_href"
              style={{ color: "#000", fontWeight: 500 }}
            >
              Forgot Password?
            </Link>
          </center>
          <Button
            className="btn_big_text"
            onClick={doUserLogin}
            style={{ color: "#fff" }}
            disabled={disableSubmit}
          >
            Sign In
          </Button>
        </div>
      </Form>
       
  </div>
       
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>


    </div>
  );
}
