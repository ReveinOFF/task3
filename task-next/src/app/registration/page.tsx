"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateProfile() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      job: "",
      about: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .required("Name is required")
        .min(2, "Name is too short")
        .email("Invalid Email"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password is too short"),
      job: Yup.string().required("Job is required"),
      about: Yup.string().required("About is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_MY_API_URL}/api/auth/reg`,
          values
        );

        router.push("/login");
      } catch (error) {
        console.error("Registration failed", error);
      }
    },
  });

  return (
    <div className="container mx-auto my-5">
      <h1 className="text-center text-4xl">Registration</h1>
      <form className="grid mt-5 gap-2" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            {...formik.getFieldProps("name")}
          />
          {formik.errors.name ? (
            <div className="mt-1 error">{formik.errors.name}</div>
          ) : null}
        </div>
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
        <div>
          <label htmlFor="job">Job:</label>
          <input
            type="text"
            placeholder="Job"
            id="job"
            {...formik.getFieldProps("job")}
          />
          {formik.errors.job ? (
            <div className="error">{formik.errors.job}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="about">About you:</label>
          <textarea
            placeholder="About you"
            id="about"
            {...formik.getFieldProps("about")}
          />
          {formik.errors.about ? (
            <div className="error">{formik.errors.about}</div>
          ) : null}
        </div>
        <button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
          {formik.isSubmitting ? "Loading" : "Registration"}
        </button>
      </form>
      <Link href="/login" className="flex mt-5">
        <button type="button" className="mx-auto">
          Login
        </button>
      </Link>
    </div>
  );
}
