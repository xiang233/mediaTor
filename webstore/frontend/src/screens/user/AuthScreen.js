import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-bootstrap";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/general/FormContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../services/getCookie";
import { useAuth } from "../../contexts/AuthContext";
import { LinkBox } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import errorHandler from "../../services/errorHandler";
function LoginScreen() {
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const repasswordInput = useRef(null);
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { setAuthState } = useAuth();

  function switchAuthModeHandler(e) {
    if (isLogin) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }

  async function postLogin() {
    var csrftoken = getCookie("csrftoken");
    console.log(csrftoken);
    const login_instance = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };
    console.log({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });

    axios
      .post("http://localhost:8000/api/users/login/", login_instance, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
      })
      .then(function (response) {
        setMessage("Login Success. ");
        const loggedIn = { headers: null, isLoggedIn: true, loggedUser: response.data };
        localStorage.setItem("loggedUser", JSON.stringify(loggedIn));
        setAuthState(loggedIn);
        navigate("/shop/");
      })
      .catch(function (error) {
        errorHandler(error);
        if (error.response.data.message) {
          setMessage(error.response.data.message);
        }
      });
  }
  async function postSignup() {
    var csrftoken = getCookie("csrftoken");
    console.log(csrftoken);
    const signup_instance = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };
    console.log({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });

    axios
      .post("http://localhost:8000/api/users/register/", signup_instance, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
      })
      .then(function (response) {
        console.log("response", response);
        if (response.status != 200) {
          setMessage(response.message);
        } else {
          setMessage("Signup Success. ");
          localStorage.setItem("loggedUser", JSON.stringify(response.data));
          navigate("/");
        }
      })
      .catch(function (error) {
        if (error.response.data.message) {
          setMessage(error.response.data.message);
        }
      });
  }

  function submitHandler(e) {
    e.preventDefault();
    if (!isLogin) {
      if (repasswordInput.current.value != passwordInput.current.value) {
        setMessage("Passwords do not match");
        return;
      }
      postSignup();
    } else {
      postLogin();
    }
    return;
  }

  return (
    <FormContainer>
      <Heading>{isLogin ? "Login" : "Register"}</Heading>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            // type="email"
            placeholder="Enter email"
            ref={emailInput}
            required={true}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordInput}
            required={true}
          />
        </Form.Group>

        {!isLogin && (
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={repasswordInput}
              required={true}
            />
          </Form.Group>
        )}
        {message}
        <br></br>
        <br></br>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="link" onClick={switchAuthModeHandler}>
          {isLogin ? "No account yet? Register. " : "Have an account? Log in. "}
        </Button>
      </Form>
    </FormContainer>
  );
}

export default LoginScreen;
