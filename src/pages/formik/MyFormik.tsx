import React from "react";
import { useFormik } from "formik";

// Create empty context
const FormikContext = React.createContext({});

// Place all of what’s returned by useFormik into context
const Formik = ({ children, ...props }: any) => {
  const formikStateAndHelpers = useFormik(props);
  return (
    <FormikContext.Provider value={formikStateAndHelpers}>
      {typeof children === "function"
        ? children(formikStateAndHelpers)
        : children}
    </FormikContext.Provider>
  );
};
export default Formik;
