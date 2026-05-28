import "./pages.css";
import { Formik, Field, Form, ErrorMessage, FormikHelpers, FormikProps } from 'formik';
import * as Yup from "yup";
import Toast from "../components/toast/Toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Type for all registration form fields
interface RegistrationDetails {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Yup validation schema: all fields are required and email must be in a valid format
const registrationSchema = Yup.object().shape({
    firstName: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .max(40).required("First name is required"),
    lastName: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .max(40).required("Last name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required")
});

function RegistrationPage() {
    const navigate = useNavigate();
    // useAuth() makes login and saveDetails available at any point without having to chain it through different app components
    //login() saves only the email to localStorage and updates the global user state
    // saveDetails() saves the user's name and email to localStorage and updates the global user state
    const { login, saveDetails } = useAuth();
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("Registration successful!");

    //Empty initial form details - Formik uses these to control the form fields
    const initialFormValues: RegistrationDetails = {
        firstName: "",
        lastName: "",
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

                <h1> Registration </h1>

                {/* Formik manages form state, validation and submission
            RegistrationDetails is passed as a type for the form */}
                <Formik <RegistrationDetails>

                    initialValues={initialFormValues}

                    validationSchema={registrationSchema}


                    onSubmit={async (
                        registrationValues: RegistrationDetails,
                        { setSubmitting, resetForm }: FormikHelpers<RegistrationDetails>
                    ) => {
                        try {
                            // POST request to the backend registration endpoint with the form values
                            const response = await fetch("http://localhost:3001/users/register", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(registrationValues),
                            });

                            const data = await response.json();

                            // If the server returns an error (user already exists), show the error message
                            if (!response.ok) {
                                setToastMessage(data.error ?? "User already exists");
                                setToastVisible(true);
                                setSubmitting(false);
                                return;
                            }

                            // save only safe user profile fields locally
                            login(registrationValues.email);
                            saveDetails({
                                firstName: registrationValues.firstName,
                                lastName: registrationValues.lastName,
                                email: registrationValues.email,
                            });

                            // Show success toast, reset form, then redirect to home after 1 second
                            setToastMessage("Registration successful!");
                            setToastVisible(true);

                            setTimeout(() => {
                                setToastVisible(false);
                                resetForm();
                                setSubmitting(false);
                                navigate("/");
                            }, 1000);
                        } catch (error) {
                            // Catches network errors
                            setToastMessage("Registration failed");
                            setToastVisible(true);
                            setSubmitting(false);
                        }

                    }}
                >
                    {/*Formik passes in props which contains everything about the current state of the form. 
           FormikProps<RegistrationDetails> is the type, which tells TypeScript that the form has first/last name, email and password fields*/}
                    {(props: FormikProps<RegistrationDetails>) => {

                        // Defines if the form currently submitting - isSubmitting is a boolean that manages the form in Formik,  
                        // it becomes true the moment the user clicks submit, 
                        // and goes back to false when the submission is finished.
                        // It'also used to disable the button to prevent the user from clicking twice
                        const { isSubmitting } = props;

                        //This is what the form returns:
                        return (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    {/* Formik-controlled input field*/}
                                    <Field id="firstName" name="firstName" placeholder="John" />
                                    {/* ErrorMessage renders the Yup validation error for the field*/}
                                    <ErrorMessage name="firstName" component="div" className="error" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <Field id="lastName" name="lastName" placeholder="Johnson" />
                                    <ErrorMessage name="lastName" component="div" className="error" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        id="email"
                                        name="email"
                                        placeholder="john.johnson@gmail.com"
                                        type="email"
                                    />
                                    <ErrorMessage name="email" component="div" className="error" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        id="password"
                                        name="password"
                                        type="password"
                                    />
                                    <ErrorMessage name="password" component="div" className="error" />
                                </div>
                                {/* Disabled while submitting to prevent the user from clicking twice */}
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </Form>
                        );
                    }}
                </Formik>
            </main>
        </>
    );
}

export default RegistrationPage;