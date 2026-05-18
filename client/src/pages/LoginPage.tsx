import "./pages.css";
import { Formik, Field, Form, ErrorMessage, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import Toast from "../components/toast/Toast";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useLogin from "../hooks/useLogin";

interface loginDetails {
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape(
  {
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  }
);

function LoginPage() {
  const navigate = useNavigate();
  const { login, saveDetails } = useAuth();
  const loginUser = useLogin();

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("Login successful!");

  const initialLoginDetails: loginDetails = {
    email: "",
    password: "",
  };

  return (
    <>

      <Toast

        visible={toastVisible}
        message={toastMessage}

      />

      <main className="page-container">
        <h1>Login</h1>

        <Formik<loginDetails>
          initialValues={initialLoginDetails}
          validationSchema={loginSchema}
          onSubmit={async (loginValues: loginDetails, { setSubmitting }: FormikHelpers<loginDetails>) => {
            const result = await loginUser(loginValues);

            if (!result.user) {
              setToastMessage(result.error ?? "Login failed");
              setToastVisible(true);
              setSubmitting(false);
              return;
            }

            //saving a logged in user - store email as username
            login(result.user.email);
            saveDetails(result.user);

            setToastMessage("Login successful!");
            setToastVisible(true);

            setTimeout(() => {
              setToastVisible(false);
              setSubmitting(false);
              navigate("/");
            }, 1000);
          }}
        >

          {(props: FormikProps<loginDetails>) => {
            const { isSubmitting } = props;

            return (
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

              <div className="form-group">
                <label htmlFor="password">Password</label>

                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                />

                <ErrorMessage
                  name="password"
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

          );}}

        </Formik>
      </main>
    </>
  );
}

export default LoginPage;