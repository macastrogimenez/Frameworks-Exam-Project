import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./NavigationBar.css";

function NavigationBar() {
    const { user, isLoggedIn, logout } = useAuth();

    return (
        <Navbar expand="lg" className="site-header px-3">
            <Container fluid>
                <div className="d-flex align-items-center gap-2">
                    <Navbar.Brand as={Link} to="/" className="mb-0">
                        <img
                            alt="Brand Logo"
                            src="/images/brandlogo.png"
                            width="100"
                            height="100"
                            className="d-inline-block align-center"
                        />
                    </Navbar.Brand>

                    {isLoggedIn && (
                        <Navbar.Text className="mb-0 subheading">
                            Hi again, {user?.firstName}.
                        </Navbar.Text>
                    )}
                </div>

                <Navbar.Toggle aria-controls="main-navbar" />

                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-lg-auto align-items-lg-center gap-3">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products">All Products</Nav.Link>
                        <Nav.Link as={Link} to="/basket">Basket</Nav.Link>

                        {isLoggedIn ? (
                            <button onClick={logout} className="btn btn-outline-dark btn-small btn-rounded-none">
                                Logout
                            </button>
                        ) : (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;