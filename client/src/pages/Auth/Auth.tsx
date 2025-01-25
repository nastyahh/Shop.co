import styles from "./Auth.module.scss";
import "../../sharedStyles.scss";
import { Link, useLocation } from "react-router";
import { useLoginMutation, useSignUpMutation } from "../../redux/productsApi";
import useForm from "../../hooks/useForm";
import Img1 from "../../assets/Image1.png";
import Img2 from "../../assets/Image2.png";
import { useState } from "react";
import { UserNotification } from "../../ui-components/UserNotification/UserNotification";

export const Auth = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [responseMessage, setResponseMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [login] = useLoginMutation();
  const [signUp] = useSignUpMutation();

  const { formState, handleInput, handleForm } = useForm();

  const action = isLoginPage ? login : signUp;

  return (
    <>
      <UserNotification isVisible={isVisible} message={responseMessage} />
      <div className={styles.auth}>
        <div className="container">
          <form
            onSubmit={async (e) => {
              const result = await handleForm(e, action);
              console.log(result);
              setResponseMessage(result.data.message);
              setIsVisible(true);
              setTimeout(() => setIsVisible(false), 2500);
            }}
            className={styles.auth_form}
          >
            <img
              src={Img1}
              alt=""
              className={`${styles.auth_img} ${styles.auth_img_1}`}
            />
            <img
              src={Img2}
              alt=""
              className={`${styles.auth_img} ${styles.auth_img_2}`}
            />
            {!isLoginPage ? (
              <input
                type="text"
                placeholder="Your Username"
                name="username"
                value={formState.username}
                onChange={handleInput}
              />
            ) : null}
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formState.email}
              onChange={handleInput}
            />
            <input
              type="password"
              placeholder="Your Password"
              name="password"
              value={formState.password}
              onChange={handleInput}
            />
            <button type="submit" className={`${styles.auth_btn} primary-btn`}>
              {isLoginPage ? "Login" : "Sign Up"}
            </button>
            {isLoginPage ? (
              <p>
                You dont have an account?{" "}
                <Link to="/registration" className={styles.auth_link}>
                  Registration
                </Link>
              </p>
            ) : (
              <p>
                You already have an account?{" "}
                <Link to="/login" className={styles.auth_link}>
                  Login
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
