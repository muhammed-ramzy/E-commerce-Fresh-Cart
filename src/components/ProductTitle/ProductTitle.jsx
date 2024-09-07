import Style from "./ProductTitle.module.css"

function ProductTitle({product, numberOfWords}) {
    return (
        <>
            {product.title.split(" ").slice(0, numberOfWords).join(" ")}
        </>
    )
}

export default ProductTitle
