import React from 'react';
import { useParams, useMatch } from 'react-router';
import ProductDetail from './ProductDetail';

function ProductDetailPage() {
    const params = useParams()
    const product_id = +(params.product_id || "")

    return (
        <div>
            <ProductDetail product_id={product_id} />
        </div>
    );
}

export default ProductDetailPage;