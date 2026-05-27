import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function NavigationBar() {
    const { user, isLoggedIn, logout } = useAuth();

    return (
        <Navbar expand="lg" bg="body-tertiary" className="px-3">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <img
                        alt=""
                        src="/images/brandlogo.png"
                        width="100"
                        height="100"
                        className="d-inline-block align-center"
                    />{" "}
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" />

                <Navbar.Collapse id="main-navbar">
                    <div className="d-flex flex-column flex-lg-row align-items-lg-center w-100 gap-3">
                        {isLoggedIn && (
                            <span className="navbar-text">Hi again, {user?.firstName}.</span>
                        )}

                        <Nav className="ms-lg-auto align-items-lg-center gap-3">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/products">All Products</Nav.Link>
                            <Nav.Link as={Link} to="/basket">Basket</Nav.Link>

                            {isLoggedIn ? (
                                <button onClick={logout} className="btn btn-outline-dark">
                                    Logout
                                </button>
                            ) : (
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            )}
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;