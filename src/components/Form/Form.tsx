import React, { useState } from "react";
import "./Form.css";

import Slider from "../Slider/Slider";
import Radio from "../Radio/Radio";
import UploadFile from "../UploadFile/UploadFile";

import errorIcon from "../../assets/error-icon.png";

const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [photo, setPhoto] = useState<File | null>(null);
  const [age, setAge] = useState(0);
  const [englishLevel, setEnglishLevel] = useState("");

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleEmailBlur = () => {
    setIsEmailValid(email.includes("@"));
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handlePhoneBlur = () => {
    setIsPhoneValid(/^(\+?48)?[\s-]?(\d{3}[\s-]?){2}\d{3}$/.test(phoneNumber));
  };

  const handlePhotoChange = (photo: File) => {
    setPhoto(photo);
  };

  const handleAgeChange = (age: number) => {
    setAge(age);
  };

  const handleEnglishLevel = (level: string) => {
    setEnglishLevel(level);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create FormData object to send the data
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    if (photo) {
      formData.append("photo", photo);
    }
    formData.append("age", age.toString());
    formData.append("englishLevel", englishLevel);

    // Send the data to the server
    fetch("http://marathon.pl/submit", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data sent successed");
        }
      })
      .catch((error) => {
        console.log("Error found " + error);
      });
  };

  return (
    <div className="contactUs">
      <div className="title">
        <h1>Marathon Application Form</h1>
      </div>
      <div className="box">
        <div className="contact">
          <form onSubmit={handleSubmit}>
            <div className="formBox">
              <div className="row50">
                <div className="inputBox">
                  <span>First Name</span>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                </div>
                <div className="inputBox">
                  <span>Last Name</span>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                </div>
              </div>

              <div className="row50">
                <div className="inputBox">
                  <span>Email</span>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    className={!isEmailValid ? "inputError" : ""}
                  />
                  {!isEmailValid && (
                    <div className="errorMessage">
                      <img src={errorIcon} alt="errorIcon" />
                      <p>Please enter a valid email address.</p>
                    </div>
                  )}
                </div>
                <div className="inputBox">
                  <span>Phone Number</span>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    onBlur={handlePhoneBlur}
                    className={!isPhoneValid ? "inputError" : ""}
                  />
                  {!isPhoneValid && (
                    <div className="errorMessage">
                      <img src={errorIcon} alt="errorIcon" />
                      <p>
                        Please use correct formatting. <br /> Example: +48 123
                        456 789
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="row100">
                <div className="inputBox">
                  <span>Photo</span>
                  <UploadFile handleFile={handlePhotoChange} />
                </div>
              </div>

              <div className="row100">
                <span>Age</span>
                <Slider defineAge={handleAgeChange} />
              </div>

              <div className="row100">
                <span>Level</span>
                <Radio defineLevel={handleEnglishLevel} />
              </div>

              <div className="row100">
                <div className="submit">
                  <button type="submit">Submit Application</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
