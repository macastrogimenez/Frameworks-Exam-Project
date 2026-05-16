import "./pages.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import Toast from "../components/toast/Toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Note: placeholder page - not finished
//TODO [KAN-88]: functionality needs to be implemented for email and name validation -> these fields should also be required.

interface RegistrationDetails {
    firstName: string;
    lastName: string;
    email: string;
}

const registrationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
});

function RegistrationPage() {
    const navigate = useNavigate();
    const [toastVisible, setToastVisible] = useState(false);

    const initialFormValues: RegistrationDetails = { //empty in the beginning
        firstName: "",
        lastName: "",
        email: "",
    };

    return (
        <>

            <Toast visible={toastVisible}
                message="Registration successful!"
            />

            <main className="page-container">

                <h1> Registration </h1>

                <Formik <RegistrationDetails> // the form uses RegistrationDetails as a type

                    initialValues={initialFormValues}

                    validationSchema={registrationSchema}


                    onSubmit={(registrationValues, { setSubmitting, resetForm }) => {

                        //saving all user details for later use
                        localStorage.setItem(
                            "userDetails",
                            JSON.stringify(registrationValues)
                        );

                        setToastVisible(true);


                        setTimeout(() => {
                            setToastVisible(false);
                            resetForm();
                            setSubmitting(false);
                            navigate("/");
                        }, 1000);

                    }
                    }
                >
                    {({ isSubmitting }) => (
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

                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </main>
        </>
    );
}

export default RegistrationPage;