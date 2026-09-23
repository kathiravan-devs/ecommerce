import { Products } from "./Products";


export function ProductsGrid({ products, productRef, showAdded, loadCart }) {

    return (
        <div className="products-grid">
            {
                products.map((product, index) => {
                    return (

                        <Products
                            key={product.id}
                            product={product}
                            productRef={productRef}
                            index={index}
                            loadCart={loadCart}
                            showAdded={showAdded} />  

                    )                
                })                
            }
        </div>
    );
}