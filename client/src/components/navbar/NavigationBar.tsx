import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";


function NavigationBar() {
    const { user, isLoggedIn, logout } = useAuth();


    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt=""
                            src="/images/brandlogo.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Body is Tee
                    </Navbar.Brand>
                    {
                        isLoggedIn ? (
                            <>
                            <span>Hi again, {user?.firstName}.</span>
                            </>
                        ) : (<></>)
                    }
                    <Nav className="d-flex flex-row ms-auto justify-content-end gap-3">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products">All Products</Nav.Link>
                        <Nav.Link as={Link} to="/basket">Basket</Nav.Link>
                        {isLoggedIn ? (
                            <>
                            <button onClick={logout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/registration">Register</Nav.Link>
                            </>
                        )}
                        
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default NavigationBar;