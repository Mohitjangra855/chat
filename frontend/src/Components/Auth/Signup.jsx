import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";
import { useAuth } from "../Context/AuthContext";
const Signup = () => {
  const {setAuthUser}= useAuth();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    username: "",
    gender: "",
  });

  const [see, setSee] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleValue = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const togglePasswordVisibility = () => {
    setSee((prevSee) => !prevSee);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullname, username, gender, email, password } = formData;
    if (!fullname || !email || !password || !username || !gender) {
      return handleError("All fileds are required !");
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("chat", JSON.stringify(response.data));
      setAuthUser(response.data);
      const { success, message } = response.data;
      console.log(success, message);
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/api/cars");
        }, 2000);
      } else {
        setError(message);
        handleError(error);
      }
    } catch (err) {
      const errMsg = err?.response?.data?.message;
      handleError(errMsg);
    }
  };
  return (
    <div className="box-border bg-zinc-100 h-full w-full flex justify-center items-center flex-col gap-3">
      <h1 className="text-2xl tracking-tighter font-semibold text-zinc-700">
        Sign up
      </h1>
      <form
        onSubmit={handleSubmit}
        className="text-zinc-700 p-4 text-lg flex flex-col gap-7 bg-zinc-100 min-h-[30rem] w-[80%] md:text-xl md:w-[700px] shadow-2xl border-2 border-zinc-150 rounded-lg"
      >
        <div className="flex flex-col gap-2 md:gap-4">
          <label htmlFor="fullname">Full name:</label>

          <input
            type="text"
            name="fullname"
            className="h-[3rem] rounded-lg pl-[1rem] outline-none "
            placeholder="Enter your Full Name"
            onChange={handleValue}
            value={formData.fullname}
          />
        </div>
        <div className="flex flex-col  gap-2 md:gap-4">
          <label htmlFor="username">Username:</label>

          <input
            type="text"
            name="username"
            className="h-[3rem] rounded-lg pl-[1rem] outline-none "
            placeholder="Enter your username"
            onChange={handleValue}
            value={formData.username}
          />
        </div>
        <div className="flex flex-col  gap-2 md:gap-4">
          <label htmlFor="gender">Gender:</label>

          <select
            name="gender"
            id="cars"
            className="h-[3rem] rounded-lg pl-[1rem] outline-none "
            onChange={handleValue}
            value={formData.gender}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex flex-col  gap-2 md:gap-4">
          <label htmlFor="email">Email:</label>

          <input
            type="text"
            name="email"
            className="h-[3rem] rounded-lg pl-[1rem] outline-none "
            placeholder="Enter your email"
            onChange={handleValue}
            value={formData.email}
          />
        </div>
        <div className="flex flex-col border-b-2 border-zinc-300 pb-8 gap-2 md:gap-4 relative">
          <label htmlFor="password">Password:</label>
          <input
            type={`${see ? "text" : "password"}`}
            name="password"
            className="h-[3rem] rounded-lg pl-[1rem] outline-none"
            placeholder="Enter your password"
            onChange={handleValue}
            value={formData.password}
          />
          <i
            className={`fa-solid ${
              see ? "fa-eye-slash text-blue-700" : "fa-eye"
            } absolute right-2 top-[45%] z-20  cursor-pointer`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <button
            className="bg-blue-600 w-24
        h-10 rounded-md font-semibold text-zinc-50 "
          >
            Sign up
          </button>
          <p className="text-sm md:text-md">
            If you have already account then, Plz{" "}
            <Link
              to={"/api/auth/login"}
              className="text-blue-600 text-[0.8rem] underline"
            >
              Log in
            </Link>{" "}
            here
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
