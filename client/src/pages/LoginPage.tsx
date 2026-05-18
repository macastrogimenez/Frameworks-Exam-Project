import "./pages.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Toast from "../components/toast/Toast";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface loginDetails {
  email: string;
}

const loginSchema = Yup.object().shape(
  {
    email: Yup.string().email("Invalid email address").required("Email is required"),
  }
);

function LoginPage() {
  const navigate = useNavigate();

  const [toastVisible, setToastVisible] = useState(false);

  const initialLoginDetails: loginDetails = {
    email: "",
  };

  return (
    <>

      <Toast

        visible={toastVisible}
        message="Login successful!"

      />

      <main className="page-container">
        <h1>Login</h1>

        <Formik<loginDetails>
          initialValues={initialLoginDetails}
          validationSchema={loginSchema}
          onSubmit={(loginValues, { setSubmitting }) => {

            //saving a logged in user - store email as username
            localStorage.setItem("registeredName", loginValues.email);

            setToastVisible(true);

            setTimeout(() => {
              setToastVisible(false);
              setSubmitting(false);
              navigate("/");
            }, 1000);
          }}
        >

          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>

                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.johnson@gmail.com"
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="error"
                />
              </div>

              <button type="submit" disabled={isSubmitting}>
                Login
              </button>

              <p>
                Don’t have an account?{" "}
                <Link to="/registration">Register here</Link>
              </p>
            </Form>

          )}

        </Formik>
      </main>
    </>
  );
}

export default LoginPage;