import "./pages.css";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
    const navigate = useNavigate();

    return (
        <main className="page-container">
            <h1 className="page-title">Login</h1>
            <Button onClick={() => navigate('/registration')} variant="primary" size="lg">Register</Button>
        </main>
    );
}

export default LoginPage;