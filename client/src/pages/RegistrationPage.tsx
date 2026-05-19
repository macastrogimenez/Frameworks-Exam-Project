import "./pages.css";
import { Formik, Field, Form, ErrorMessage, FormikHelpers, FormikProps } from 'formik';
import * as Yup from "yup";
import Toast from "../components/toast/Toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

//Note: placeholder page - not finished
//TODO [KAN-88]: functionality needs to be implemented for email and name validation -> these fields should also be required.

interface RegistrationDetails {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const registrationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required")
});

function RegistrationPage() {
    const navigate = useNavigate();
    const { login, saveDetails } = useAuth();
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("Registration successful!");

    const initialFormValues: RegistrationDetails = { //empty in the beginning
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };

    return (
        <>

            <Toast visible={toastVisible}
                message={toastMessage}
            />

            <main className="page-container">

                <h1> Registration </h1>

                <Formik <RegistrationDetails> // the form uses RegistrationDetails as a type

                    initialValues={initialFormValues}

                    validationSchema={registrationSchema}


                    onSubmit={async (
                        registrationValues: RegistrationDetails,
                        { setSubmitting, resetForm }: FormikHelpers<RegistrationDetails>
                    ) => {
                        try {
                            const response = await fetch("http://localhost:3001/users/register", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(registrationValues),
                            });

                            const data = await response.json();

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

                            setToastMessage("Registration successful!");
                            setToastVisible(true);

                            setTimeout(() => {
                                setToastVisible(false);
                                resetForm();
                                setSubmitting(false);
                                navigate("/");
                            }, 1000);
                        } catch (error) {
                            setToastMessage("Registration failed");
                            setToastVisible(true);
                            setSubmitting(false);
                        }

                    }}
                >
                    {(props: FormikProps<RegistrationDetails>) => {
                        const { isSubmitting } = props;

                        return (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <Field id="firstName" name="firstName" placeholder="John" />
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

                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    );}}
                </Formik>
            </main>
        </>
    );
}

export default RegistrationPage;