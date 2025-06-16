"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .min(2, "Name is too short")
        .required("Name is required")
        .email("Invalid Email"),
      password: Yup.string()
        .min(8, "Password is too short")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_MY_API_URL}/api/auth/login`,
          values
        );

        localStorage.setItem("at", res.data);

        window.location.href = "/jobs";
      } catch (error) {
        console.error("Registration failed", error);
      }
    },
  });

  return (
    <div className="container mx-auto my-5">
      <h1 className="text-center text-4xl">Login</h1>
      <form className="grid mt-5 gap-2" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email ? (
            <div className="mt-1 error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
          {formik.isSubmitting ? "Loading" : "login"}
        </button>
      </form>
      <Link href="/registration" className="flex mt-5">
        <button type="button" className="mx-auto">
          Registration
        </button>
      </Link>
    </div>
  );
}
