import React, { useCallback, useEffect, useState } from "react";
// import Link from "next/link";
import Styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { useLocation } from "react-router-dom";
const logoURL = "/assets/images/CM_logo.avif";
import axios from "axios";
import EmailVerification from "pages/EmailVerification";
import Verification from "pages/Verification";
import Button from "components/Button/Button";
import { toast, ToastContainer } from "react-toastify";

export default function Register(props: any) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const referral = queryParams.get("referral");
  const [email, setEmail] = useState<string>("");
  const [res, setRes] = useState<string>("");
  const [verifyres, setVerifyRes] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [verifySuccess, setVerifySuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string>("");
  const [warning1, setWarning1] = useState<string>("");
  const [warning2, setWarning2] = useState<string>("");

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");

  useEffect(() => {
    // Combine all input values into one string
    const newVerificationCode = input1 + input2 + input3 + input4 + input5 + input6;
    setVerificationCode(newVerificationCode);
  }, [input1, input2, input3, input4, input5, input6]);
  // State for combined verification code
  const [verificationCode, setVerificationCode] = useState("");

  // Function to update the input value and combined verification code
  const handleInputChange1 = (index: number, value: string) => {
    // Update the respective input value
    switch (index) {
      case 1:
        setInput1(value);
        break;
      case 2:
        setInput2(value);
        break;
      case 3:
        setInput3(value);
        break;
      case 4:
        setInput4(value);
        break;
      case 5:
        setInput5(value);
        break;
      case 6:
        setInput6(value);
        break;
      default:
        break;
    }

    // Update the combined verification code
    setVerificationCode(input1 + input2 + input3 + input4 + input5 + input6);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api.crademaster.com/auth/register/", {
        email,
        password1,
        password2,
      });
      if (response.status === 201) {
        setRes(response.data.detail);
        setSuccess(true);
      }
    } catch (error: any) {
      setWarning(error.response.data.password1);
      setWarning1(error.response.data.password2);
      setWarning2(error.response.data.email);
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    console.log("verification_code===>", verificationCode);
    e.preventDefault();
    try {
      const response = await axios.post("https://api.crademaster.com/auth/register/verify-email/", {
        email,
        verification_code: verificationCode,
      });
      if (response.status === 200) {
        toast.success("Verification Success", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.href = "/login"; // Replace with your desired route
        }, 2000); // 2 seconds delay to show the success toast before redirect
        // setVerifyRes(response.data.detail);
        // setVerifySuccess(true);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  const [isValid, setIsValid] = useState<boolean | null>(null); // To hold the validation state

  // Email validation function using a regular expression
  const validateEmail = (email: string) => {
    // Simple regex for validating an email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const handleInputChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (event) console.log("Input value:", event.target.value); // This will log the value after debounce
  }, 500); // Debounce delay of 500ms

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
        <div className={Styles.description}>Welcome to CradeMaster</div>
        {!success ? (
          <div className={Styles.main}>
            <div className={Styles.email}>
              <p>Email</p>
              <div className={Styles.input}>
                <input
                  type="text"
                  className={Styles.inputBox}
                  onChange={handleEmailChange}
                  style={{ padding: "8px", fontSize: "16px" }}
                  placeholder="Email"
                  id="exampleFormControlInput1"
                />
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
            </div>
            <div className={Styles.email}>
              <p>Password</p>
              <div className={Styles.input}>
                <input
                  type="Password"
                  className={Styles.inputBox}
                  onChange={(e) => setPassword1(e.target.value)}
                  placeholder="password"
                  id="exampleFormControlInput1"
                />
              </div>
            </div>
            <div className={Styles.email}>
              <p>Confirm Password</p>
              <div className={Styles.input}>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={Styles.inputBox}
                  onChange={(e) => setPassword2(e.target.value)}
                  id="exampleFormControlInput1"
                />
              </div>
            </div>
            <div className={Styles.email}>
              <p>Referral ID(Optional)</p>
              <div className={Styles.input}>
                <input
                  type="text"
                  placeholder="Referral ID(Optional)"
                  value={referral || ""}
                  className={Styles.inputBox}
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
                By creating an account, I agree to CradeMaster's Terms of Service and Privacy Policy
              </div>
            </div>
            <div className="mt-5 text-red-500">{warning}</div>
            <div className="mt-5 text-red-500">{warning1}</div>
            <div className="mt-5 text-red-500">{warning2}</div>
            <div className={Styles.btn} onClick={handleSubmit}>
              Register
            </div>
          </div>
        ) : (
          <div className={Styles.verifymain}>
            <div className={Styles.verifyheader}>
              <div className={Styles.title}>Email Verification</div>
            </div>
            <div className={Styles.verifymain}>
              <div className={Styles.description}>
                Please enter the 6-digit verification code that was sent to alicent@gmail.com
              </div>
              <div className={Styles.email}>
                <div className={Styles.input}>
                  <input
                    type="text"
                    className={Styles.inputBox}
                    onChange={(e) => handleInputChange1(1, e.target.value)}
                    id="exampleFormControlInput1"
                  />
                </div>
                <div className={Styles.input}>
                  <input
                    type="text"
                    className={Styles.inputBox}
                    onChange={(e) => handleInputChange1(2, e.target.value)}
                    id="exampleFormControlInput1"
                  />
                </div>
                <div className={Styles.input}>
                  <input
                    type="text"
                    className={Styles.inputBox}
                    onChange={(e) => handleInputChange1(3, e.target.value)}
                    id="exampleFormControlInput1"
                  />
                </div>
                <div className={Styles.input}>
                  <input
                    type="text"
                    className={Styles.inputBox}
                    onChange={(e) => handleInputChange1(4, e.target.value)}
                    id="exampleFormControlInput1"
                  />
                </div>
                <div className={Styles.input}>
                  <input
                    type="text"
                    className={Styles.inputBox}
                    onChange={(e) => handleInputChange1(5, e.target.value)}
                    id="exampleFormControlInput1"
                  />
                </div>
                <div className={Styles.input}>
                  <input
                    type="text"
                    className={Styles.inputBox}
                    onChange={(e) => handleInputChange1(6, e.target.value)}
                    id="exampleFormControlInput1"
                  />
                </div>
              </div>

              <a className={Styles.btn} onClick={handleVerify}>
                Submit
              </a>
            </div>
            {res}
            <div className={Styles.verifyfooter}>
              didn't receive?
              <Button className="hover:text-yellow-400" onClick={handleSubmit}>
                Resend Email
              </Button>
            </div>
          </div>
        )}
      </div>
      {!success ? (
        <div className={Styles.footer}>
          <span className="mr-3 text-yellow-300">
            <Link to="/register">Sign up</Link>
          </span>
          or
          <span className="ml-3 text-yellow-300">
            <Link to="/login">Log in</Link>
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
