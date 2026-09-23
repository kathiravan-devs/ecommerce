import { useRef } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css'


export function HomePage({products, cart, loadCart}) {

    const productRef = useRef([]);

    function showAdded(index) {
        productRef.current[index].classList.add('added-product-container');
        setTimeout(() => {  
            productRef.current[index].classList.remove('added-product-container');
        }, 4500)
    }

    return (
        <>
            <title>Ecommerce Project</title>

            <Header cart={cart}/>

            <div className="home-page">
                <ProductsGrid products={products} productRef={productRef} showAdded={showAdded} loadCart={loadCart}/>
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