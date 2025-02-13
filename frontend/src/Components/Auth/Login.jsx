import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import { handleError, handleSuccess } from "../../utils";
import { useAuth } from "../Context/AuthContext";
const Login = () => {
  const {setAuthUser} = useAuth()
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [see, setSee] = useState(false);
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
  const handleSubmit = async(e) => {
    e.preventDefault();
    const {email,password} = formData;
    if(!email||!password){
      return handleError("All fileds are required !")
    }
    try{
    const response = await axios.post("http://localhost:3000/api/auth/login",formData);
    localStorage.setItem("token",response.data.token); 
    localStorage.setItem("chat",JSON.stringify(response.data)); 
    setAuthUser(response.data)
    const {success,message} = response.data

    if (success) {
      handleSuccess(message)
      setTimeout(() => {
        navigate("/api/cars");
      }, 2000);
    }
    else{
      handleError(message)
    }
    }catch(err){
      const msg =err?.response?.data?.message
      handleError(msg)
     
    }
  };
  return (
    <div className=" bg-zinc-100 h-[100vh] w-full flex justify-center items-center flex-col gap-3">
      <h1 className="text-2xl tracking-tighter font-semibold text-zinc-700">
        Log in
      </h1>
      <form
       onSubmit={handleSubmit}
        className="text-zinc-700 p-4 text-lg flex flex-col gap-7 bg-zinc-100 min-h-96 h-[60%] w-[70%] md:text-xl md:w-[400px] shadow-2xl border-2 border-zinc-150 rounded-lg"
      >
        <div className="flex flex-col pb-4 gap-2 md:gap-4">
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
              see ? "fa-eye-slash" : "fa-eye"
            } absolute right-2 top-[45%] z-20  cursor-pointer`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
        
          <button
            className="bg-blue-600 w-24
        h-10 rounded-md font-semibold text-zinc-50 "
          >
            Log in
          </button>
          <p className="text-sm md:text-md">
            If your don't have account then, Plz{" "}
            <Link
              to={"/api/auth/register"}
              className="text-blue-600 text-[0.8rem] underline"
            >
              Sign up
            </Link>{" "}
            here
          </p>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Login;
