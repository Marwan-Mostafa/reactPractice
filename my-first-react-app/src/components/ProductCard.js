function ProductCard({ product }) {
    return (
        <article>
            <h2>{product.name}</h2>

            <p>${product.price}</p>

            {product.price > 1000 && (
                <p>High Value Product</p>
            )}

            <p>{product.isPremium && "⭐ Premium"}</p>
            <p>{product.isFavorite && "❤️"}</p>

            {product.inStock ? (
                <button>Add to Cart</button>
            ) : (
                <p>Out of Stock</p>
            )}

        </article>

    );
}

export default ProductCard;