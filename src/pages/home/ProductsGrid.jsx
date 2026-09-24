import { Products } from "./Products";


export function ProductsGrid({ products,  loadCart }) {

    return (
        <div className="products-grid">
            {
                products.map((product, index) => {
                    return (

                        <Products
                            key={product.id}
                            product={product}
                            index={index}
                            loadCart={loadCart}
                            />  

                    )                
                })                
            }
        </div>
    );
}