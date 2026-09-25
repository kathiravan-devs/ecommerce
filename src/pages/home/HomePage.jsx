import { useSearchParams } from 'react-router';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css'

export function HomePage({ products, cart, loadCart }) {

    const [searchParams] = useSearchParams();
    const productString = searchParams.get('productString') || '';

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(productString.toLowerCase())
    );

    return (
        <>
            <title>Ecommerce Project</title>

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={filteredProducts} loadCart={loadCart} />
            </div>
        </>
    );
}



/*

It is the another way to show added 

const [addedProduct, setAddedProduct] = useState(null);

function showAdded(index) {
    setAddedProduct(index);

    setTimeout(() => {
        setAddedProduct(null);
    }, 4500);
}



<div
    className={`product-container ${
        addedProduct === index ? "added-product-container" : ""
    }`}
></div>

*/