import React from "react";
import { useFormik } from "formik";

const SignupForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formikSettings = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formikSettings.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formikSettings.handleChange}
        value={formikSettings.values.email}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
export default SignupForm;

/**
 const [values, setValues] = React.useState({});
 const handleChange = event => {
   setValues(prevValues => ({
     ...prevValues,
     // we use the name to tell Formik which key of `values` to update
     [event.target.name]: event.target.value
   });
 }
 */
