import React from "react";
import Formik from "./MyFormik";
import * as Yup from "yup";

interface ErrorMsg {
  value: string | undefined;
  touchValue: boolean | undefined;
}

const ErrorMsg = (props: ErrorMsg) => {
  if (props.touchValue && props.value) {
    return <div style={{ color: "red" }}>{props.value}</div>;
  }

  return <></>;
};

const SignupForm = () => {
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "" }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={(values: any, { setSubmitting }: any) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik: any) => (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            {...formik.getFieldProps("firstName")}
          />

          <ErrorMsg
            value={formik.errors.firstName}
            touchValue={formik.touched.firstName}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            {...formik.getFieldProps("lastName")}
          />

          <ErrorMsg
            value={formik.errors.lastName}
            touchValue={formik.touched.lastName}
          />

          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" {...formik.getFieldProps("email")} />

          <ErrorMsg
            value={formik.errors.email}
            touchValue={formik.touched.email}
          />

          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
};

export default SignupForm;
