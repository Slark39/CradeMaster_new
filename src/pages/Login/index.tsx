import React, { useCallback, useState } from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";
import Styles from "./style.module.scss";
import axios from "axios";
import { debounce } from "lodash";
const logoURL = "/assets/images/CM_logo.avif";
import { toast, ToastContainer } from "react-toastify";
import { setAuthToken, setUserInfo } from "utils/authUtil";
import { useAuthStore } from "store/useAuthStore";
import { FaSpinner } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null); // To hold the validation state

  const login = useAuthStore((state) => state.login);

  const validateEmail = (email: string) => {
    // Simple regex for validating an email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const debouncedValidateEmail = useCallback(
    debounce((email: string) => {
      const valid = validateEmail(email);
      setIsValid(valid);
    }, 500), // Delay of 500ms
    []
  );
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    debouncedValidateEmail(value); // Call the debounced function
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://api.crademaster.com/auth/login/", {
        email,
        password,
      });
      if (response.status === 200) {
        toast.success("Login Success!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        login(response.data.access);
        localStorage.setItem("isAuthenticated", "true");
        setAuthToken(response.data.access);
        setUserInfo(response.data.user);
        setTimeout(() => {
          window.location.href = "/trade"; // Replace with your desired route
        }, 1000);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <div className={Styles.wrapper}>
      <ToastContainer />
      <div className={Styles.layout}>
        <div className={Styles.header}>
          <div className={Styles.title}>
            <div className={Styles.log}>
              <div className={Styles.logo}>
                <img src={logoURL} className={Styles.logoImage} alt="token image" />
              </div>
              <div className={Styles.text}>
                <div className={Styles.subText1}>
                  <span className="text-[#ffc000]">C</span>rade
                  <span className="text-[#008ad1]">M</span>aster
                </div>
                <div className={Styles.subText2}>AI-Auto Trading System</div>
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.main}>
          <div className={Styles.description}>Welcome to CradeMaster</div>
          <div className={Styles.email}>
            <p>Email</p>
            <div className={Styles.input}>
              <input
                type="text"
                className={Styles.inputBox}
                onChange={handleEmailChange}
                placeholder="Email"
                id="exampleFormControlInput1"
              />
            </div>
            <div>
              {isValid === null ? (
                <p></p>
              ) : isValid ? (
                <p style={{ color: "green" }}></p>
              ) : (
                <p style={{ color: "red" }}>Invalid email address.</p>
              )}
            </div>
          </div>
          <div className={Styles.email}>
            <p>Password</p>
            <div className={Styles.input}>
              <input
                type="password"
                className={Styles.inputBox}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                id="exampleFormControlInput1"
              />
            </div>
          </div>

          <div className={Styles.check}>
            <div className={Styles.checkBtn}>
              <input
                className=" border-secondary-500 before:shadow-checkbox checked:border-primary checked:bg-primary checked:after:-mt-px checked:focus:before:shadow-checkbox checked:focus:after:-mt-px checked:focus:after:rounded-none dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary relative float-left me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none  rounded-[0.25rem] border-[0.125rem] border-solid bg-[#1a1b1d] outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-transparent before:content-[''] checked:before:opacity-[0.16] checked:after:absolute checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right"
                type="checkbox"
                value=""
                id="checkboxDefault"
              />
            </div>
            <div className={Styles.policy}>
              By creating an account, I agree to CradeMaster's{" "}
              <a className="text-blue-600 underline" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="text-blue-600 underline" href="#">
                Privacy Policy
              </a>
            </div>
          </div>
          <div className={Styles.btn} onClick={!loading ? handleSubmit : undefined}>
            {loading ? <FaSpinner className={Styles.spinner} /> : "Login"}
          </div>
        </div>
      </div>
      <div className={Styles.footer}>
        <span className="mr-3 text-yellow-300">
          <Link to="/register">Sign up</Link>
        </span>
        or
        <span className="ml-3 text-yellow-300">
          <Link to="/login">Log in</Link>
        </span>
      </div>
    </div>
  );
}
