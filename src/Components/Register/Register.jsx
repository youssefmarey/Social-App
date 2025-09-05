import React, { useState } from "react";
import Style from "./Register.module.css";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const scheme = z
    .object({
      name: z
        .string("name is required")
        .min(3, "min length 3")
        .max(15, "max length 15"),
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
      rePassword: z
        .string("rePassword is required")
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character."
        ),
      dateOfBirth: z.coerce.date().refine(function (value) {
        const currenYear = new Date().getFullYear();
        const userYear = value.getFullYear();

        if (currenYear - userYear >= 18) {
          return true;
        }
        return false;
      }, "I must be over 18 years old"),
      gender: z.enum(["female", "male"]),
    })
    .refine(function (values) {
      if (values.password === values.rePassword) {
        return true;
      }
      return false;
    }, {
      path: ["rePassword"],
      error: "RePassword Doesnot Match",
    });

  async function signup(values) {
    setIsloading(true);
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        values
      );

      //  console.log(data);
      toast.success(data.message);
      setIsloading(false);
      navigate("/login");
    } catch (e) {
      // console.log();

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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(scheme),
  });

  return (
    <section className="w-1/2 p-10 rounded-lg my-10 shadow-2xl shadow-blue-600 dark:shadow-white/20 mx-auto">
      <h1 className="text-center mb-16 text-2xl">Register Now</h1>

      <form onSubmit={handleSubmit(signup)}>
        {/* name input */}
        <input
          type="text"
          placeholder="Name"
          className="input w-full mb-4 input-primary"
          id="name"
          {...register("name")}
        />

        {errors?.name && touchedFields?.name && (
          <p className="text-red-500 mb-3">{errors?.name?.message}</p>
        )}

        {/* email input */}
        <input
          type="email"
          placeholder="Email"
          className="input w-full mb-4 input-primary"
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
          className="input w-full mb-4 input-primary"
          id="password"
          {...register("password")}
        />

        {errors?.password && touchedFields?.password && (
          <p className="text-red-500 mb-3">{errors?.password?.message}</p>
        )}

        {/*  rePassword input */}
        <input
          type="password"
          placeholder="rePassword"
          className="input w-full mb-4 input-primary"
          id="rePassword"
          {...register("rePassword")}
        />

        {errors?.rePassword && touchedFields?.rePassword && (
          <p className="text-red-500 mb-3">{errors?.rePassword?.message}</p>
        )}

        {/*  dateOfBirth input */}
        <input
          type="date"
          placeholder="date Of Birth"
          className="input w-full mb-4 input-primary"
          id="dateOfBirth"
          {...register("dateOfBirth")}
        />

        {errors?.dateOfBirth && touchedFields?.dateOfBirth && (
          <p className="text-red-500 mb-3">{errors?.dateOfBirth?.message}</p>
        )}

        {/* gender input */}
        <div className="mb-4">
          <input
            id="male"
            value="male"
            type="radio"
            name="gander"
            className="radio radio-primary"
            {...register("gender")}
          />
          <label htmlFor="male" className="ms-4 me-10">
            Male
          </label>
          <input
            id="female"
            value="female"
            type="radio"
            name="gander"
            className="radio radio-primary"
            {...register("gender")}
          />
          <label htmlFor="female" className="ms-4 me-10">
            Female
          </label>
        </div>
        {errors?.gender && touchedFields?.gender && (
          <p className="text-red-500 mb-3">{errors?.gender?.message}</p>
        )}

        <button type="submit" className="btn w-full btn-primary">
          {isloading ? (
            <i className="fa-solid fa-spinner fa-spin text-white"></i>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </section>
  );
};

export default Register;
