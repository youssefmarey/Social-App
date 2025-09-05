import React, { useContext, useState } from "react";
import Style from "./Login.module.css";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";

const Login = () => {
  const { insertUserToken } = useContext(authContext);
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const scheme = z.object({
    email: z
      .email("email is required")
      .regex(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address, e.g., example@mail.com"
      ),
    password: z
      .string("password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character."
      ),
  });

  async function signup(values) {
    setIsloading(true);
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        values
      );

      toast.success(data.message);
      setIsloading(false);
      localStorage.setItem("token" ,data.token )
      insertUserToken(data.token);
      navigate("/");
    } catch (e) {
      toast.error(e.response.data.error);
      setIsloading(false);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(scheme),
  });

  return (
    <section className="w-1/2 p-10 my-10 rounded-lg shadow-2xl shadow-blue-600 dark:shadow-white/20 mx-auto">
      <h1 className="text-center mb-12 text-2xl">Login</h1>

      <form onSubmit={handleSubmit(signup)}>
        {/* email input */}
        <input
          type="email"
          placeholder="Email"
          className="input w-full mb-5 input-primary"
          id="email"
          {...register("email")}
        />
        {errors?.email && touchedFields?.email && (
          <p className="text-red-500 mb-3">{errors?.email?.message}</p>
        )}

        {/*  password input */}
        <input
          type="password"
          placeholder="Password"
          className="input w-full mb-5 input-primary"
          id="password"
          {...register("password")}
        />

        {errors?.password && touchedFields?.password && (
          <p className="text-red-500 mb-3">{errors?.password?.message}</p>
        )}

        <button type="submit" className="btn w-full btn-primary">
          {isloading ? (
            <i className="fa-solid fa-spinner fa-spin text-white"></i>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </section>
  );
};

export default Login;
