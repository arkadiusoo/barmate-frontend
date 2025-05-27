import React, { useRef, useLayoutEffect, useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { ThemeContext } from "../styles/ThemeContext";
import "../styles/authTransition.css";
import { authService } from "../pages/AuthService";

function AuthForm({ isLogin, onSwitchMode }) {
  const { darkMode } = useContext(ThemeContext);
  const nodeRef = useRef(null);
  const containerRef = useRef(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useLayoutEffect(() => {
    if (nodeRef.current && containerRef.current) {
      const newHeight = nodeRef.current.scrollHeight;
      containerRef.current.style.height = `${newHeight}px`;
    }
  }, [isLogin]);

  const handleEnter = () => {
    if (nodeRef.current && containerRef.current) {
      const newHeight = nodeRef.current.scrollHeight;
      containerRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleExit = () => {
    if (nodeRef.current && containerRef.current) {
      const currentHeight = nodeRef.current.scrollHeight;
      containerRef.current.style.height = `${currentHeight}px`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await authService.login(username, password);
      } else {
        await authService.register(username, password, email);
        await authService.login(username, password);
      }
      localStorage.setItem("userName", username);
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        transition: "height 500ms ease-in-out",
      }}
    >
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={isLogin ? "login" : "register"}
          timeout={300}
          classNames="fade"
          nodeRef={nodeRef}
          onEnter={handleEnter}
          onExit={handleExit}
        >
          <div
            ref={nodeRef}
            className={`p-3 rounded ${
              darkMode ? "bg-dark text-light" : "bg-light text-dark"
            }`}
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nazwa użytkownika</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="np. user1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              {!isLogin && (
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Wpisz email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Hasło</Form.Label>
                <Form.Control
                  id="passwordField"
                  type="password"
                  placeholder="Hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100 mb-2">
                {isLogin ? "Zaloguj" : "Zarejestruj"}
              </Button>

              <div className="text-center">
                <small>
                  {isLogin ? "Nie masz konta jeszcze?" : "Masz już konto?"}{" "}
                  <Button variant="link" onClick={onSwitchMode}>
                    {isLogin ? "Zarejestruj się" : "Zaloguj się"}
                  </Button>
                </small>
              </div>
            </Form>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

export default AuthForm;
