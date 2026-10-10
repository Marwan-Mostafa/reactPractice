export default function Post({ name, price, stock }) {
    return (
        <>
            <h1>{name}</h1>
            <h1>{price}$</h1>
            <h1>{stock}</h1>
        </>
    )
}