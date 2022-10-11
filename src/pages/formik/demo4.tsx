import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface ErrorMsg {
  value: string | undefined;
  touchValue: boolean | undefined;
}

const SignupForm = () => {
  const formikSettings = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const ErrorMsg = (props: ErrorMsg) => {
    if (props.touchValue && props.value) {
      return <div style={{ color: "red" }}>{props.value}</div>;
    }

    return <></>;
  };

  return (
    <form onSubmit={formikSettings.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formikSettings.handleChange}
        onBlur={formikSettings.handleBlur}
        value={formikSettings.values.firstName}
      />
      <ErrorMsg
        value={formikSettings.errors.firstName}
        touchValue={formikSettings.touched.firstName}
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formikSettings.handleChange}
        onBlur={formikSettings.handleBlur}
        value={formikSettings.values.lastName}
      />
      <ErrorMsg
        value={formikSettings.errors.lastName}
        touchValue={formikSettings.touched.lastName}
      />
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formikSettings.handleChange}
        onBlur={formikSettings.handleBlur}
        value={formikSettings.values.email}
      />

      <ErrorMsg
        value={formikSettings.errors.email}
        touchValue={formikSettings.touched.email}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
export default SignupForm;
