import "./pages.css";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//Note: placeholder page - not finished
//TODO [KAN-88]: functionality needs to be implemented for email and name validation -> these fields should also be required.

function RegistrationPage() {
    return (
        <main className="page-container">
            <h1 className="page-title">Registration</h1>
            <TextControls />
        </main>
    );
}


function TextControls() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>First name</Form.Label>
                <Form.Control as="textarea" rows={1} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Last name</Form.Label>
                <Form.Control as="textarea" rows={1} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPlaintextPassword">
                <Form.Label>Password</Form.Label>
                <Col>
                    <Form.Control type="password" placeholder="Password" />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPlaintextPassword">
                <Form.Label>Repeat password</Form.Label>
                <Col>
                    <Form.Control type="password" placeholder="Password" />
                </Col>
            </Form.Group>
            <Button as="input" type="submit" value="Submit" />
        </Form>
    );
}

export default RegistrationPage;