import "./pages.css";
import { Formik, Field, Form, ErrorMessage, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import Toast from "../components/toast/Toast";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useLogin from "../hooks/useLogin";

//Type for all login form fields
interface loginDetails {
  email: string;
  password: string;
}

// Yup validation schema: checks the email format and that both fields are filled
const loginSchema = Yup.object().shape(
  {
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  }
);

function LoginPage() {
  const navigate = useNavigate();

  // useAuth() makes login and saveDetails available at any point without having to chain it through different app components
  //login() saves only the email to localStorage and updates the global user state
  // saveDetails() saves the user's name and email to localStorage and updates the global user state
  const { login, saveDetails } = useAuth();
  // the useLogin -hook returns a function that POSTs the email and password to the server
  // - returns the login result: either the user object or the error message
  const loginUser = useLogin();

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("Login successful!");

  //Empty initial form details - Formik uses these to control the form fields
  const initialLoginDetails: loginDetails = {
    email: "",
    password: "",
  };

  return (
    <>

      <Toast
        //Toast message: login success or failure
        visible={toastVisible}
        message={toastMessage}

      />

      <main className="page-container">
        <h1>Login</h1>

        {/* Formik manages form state, validation and submission */}
        <Formik<loginDetails>
          initialValues={initialLoginDetails}
          validationSchema={loginSchema}
          onSubmit={async (loginValues: loginDetails, { setSubmitting }: FormikHelpers<loginDetails>) => {
            // Send email and password to the server through the useLogin hook
            // result will either be a user object or an error message
            const result = await loginUser(loginValues);

            // If result.user is null, the server returns an error (such as wrong email)
            if (!result.user) {
              setToastMessage(result.error ?? "Login failed");
              setToastVisible(true);
              setSubmitting(false);
              return;
            }

            //saving a logged in user - store email as username
            //now the web application knows that the user is logged in globally
            login(result.user.email);

            // Save the full user profile 
            // AuthContext will now have access to the user's details for later use
            saveDetails(result.user);

            setToastMessage("Login successful!");
            setToastVisible(true);

            // Show toast message with a success message, then redirect to home after 1 second
            setTimeout(() => {
              setToastVisible(false);
              setSubmitting(false);
              navigate("/");
            }, 1000);
          }}
        >

          {/*Formik passes in props which contains everything about the current state of the form. 
          FormikProps<loginDetails> is the type, which tells TypeScript that the form has email and password fields*/}

          {(props: FormikProps<loginDetails>) => {
            // Defines if the form currently submitting - isSubmitting is a boolean that manages the form in Formik,  
            // it becomes true the moment the user clicks submit, 
            // and goes back to false when the submission is finished.
            // It'also used to disable the button to prevent the user from clicking twice
            const { isSubmitting } = props;

            //This is what the form returns:
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
                  {/* ErrorMessage shows the Yup validation error for this field */}
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
                  {/* ErrorMessage shows the Yup validation error for this field */}
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                {/* Disabled while submitting to prevent the user clicking twice */}
                <button type="submit" disabled={isSubmitting}>
                  Login
                </button>

                <p>
                  Don’t have an account?{" "}
                  <Link to="/registration">Register here</Link>
                </p>
              </Form>

            );
          }}

        </Formik>
      </main>
    </>
  );
}

export default LoginPage;