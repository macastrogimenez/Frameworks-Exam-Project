import "./pages.css";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function ProductDetailPage() {
    const navigate = useNavigate();

    return (
        <main className="page-container">
            <h1 className="page-title">Product Detail</h1>
            <Button onClick={() => navigate('/registration')} variant="primary" size="lg">Order</Button>
        </main>
    );
}

export default ProductDetailPage;