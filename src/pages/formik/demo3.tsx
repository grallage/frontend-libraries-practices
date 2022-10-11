import React from "react";
import { useFormik } from "formik";

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
}
interface ErrorMsg {
  value: string | undefined;
  touchValue: boolean | undefined;
}

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = (values: FormValues) => {
  const errors: any = {};
  if (!values.firstName) {
    errors.firstName = "Required firstName";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required lastName";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const SignupForm = () => {
  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validate,
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
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      <ErrorMsg
        value={formik.errors.firstName}
        touchValue={formik.touched.firstName}
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      <ErrorMsg
        value={formik.errors.lastName}
        touchValue={formik.touched.lastName}
      />

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      <ErrorMsg value={formik.errors.email} touchValue={formik.touched.email} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
