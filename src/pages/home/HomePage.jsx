import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import { ResetButton } from '../../components/ResetButton';
import './HomePage.css'

export function HomePage({products, cart, loadCart}) {


    return (
        <>
            <title>Ecommerce Project</title>

            <Header cart={cart}/>

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart}/>
            </div>
            <ResetButton loadCart={loadCart} />
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