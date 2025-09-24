// import React,{useEffect, useState} from "react";
// import { Link } from "react-router-dom";
// import { useAppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import { useParams } from "react-router-dom";

// const ProductDetails = () => {
//     const {product, navigate, currency, addToCart } = useAppContext();
//     const {id}  = useParams();
//     const [RelatedProducts, setRelatedProducts] = useState([]);
//     const [thumbnail, setThumbnail] = useState(product.images[0]);

//     const products = product.find((item) => item._id === id);

//     // this is to get related products
//     useEffect(() => {
//         if (product.length > 0) { 
//             let productsCopy = product.slice();
//             productsCopy = productsCopy.filter((item) => product.category === item.category); 
//             setRelatedProducts(productsCopy.slice(0,5));
 
//         }
//     },[product])

//     // this is one for the current product
//     useEffect(() => {
//         setThumbnail(products?.image[0] ? products.image[0] : null);
//     }, [products])

//     return product && (
//         <div className="mt-16">
//             <p>
//                 <Link to="/">Home</Link> /
//                 <Link to="/products"> Products</Link> /
//                 <Link to={`/products/${product.category}`}> {product.category}</Link> /
//                 <span className="text-indigo-500"> {product.name}</span>
//             </p>

//             <div className="flex flex-col md:flex-row gap-16 mt-4">
//                 <div className="flex gap-3">
//                     <div className="flex flex-col gap-3">
//                         {product.images.map((image, index) => (
//                             <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
//                                 <img src={image} alt={`Thumbnail ${index + 1}`} />
//                             </div>
//                         ))}
//                     </div>

//                     <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
//                         <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
//                     </div>
//                 </div>

//                 <div className="text-sm w-full md:w-1/2">
//                     <h1 className="text-3xl font-medium">{product.name}</h1>

//                     <div className="flex items-center gap-0.5 mt-1">
//                         {Array(5).fill('').map((_, i) => (                           
//                               <img src={i< 4 ? assets.star_icon : assets.star_dull_icon } alt="star_icon"  className="md:w-4 w-3.5"/>
//                         ))}
//                         <p className="text-base ml-2">(4)</p>
//                     </div>

//                     <div className="mt-6">
//                         <p className="text-gray-500/70 line-through">MRP: {currency}${product.price}</p>
//                         <p className="text-2xl font-medium">MRP: {currency}${product.offerPrice}</p>
//                         <span className="text-gray-500/70">(inclusive of all taxes)</span>
//                     </div>

//                     <p className="text-base font-medium mt-6">About Product</p>
//                     <ul className="list-disc ml-4 text-gray-500/70">
//                         {product.description.map((desc, index) => (
//                             <li key={index}>{desc}</li>
//                         ))}
//                     </ul>

//                     <div className="flex items-center mt-10 gap-4 text-base">
//                         <button onClick={() => addToCart(product._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
//                             Add to Cart
//                         </button>
//                         <button onClick={() => {addToCart(product._id)}}  className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition" >
//                             Buy now
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetails;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
    const { product, navigate, currency, addToCart } = useAppContext();
    const { id } = useParams();

    const [currentProduct, setCurrentProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    // Set the current product based on ID
    useEffect(() => {
        if (product.length > 0) {
            const foundProduct = product.find((item) => item._id === id);
            setCurrentProduct(foundProduct || null);
        }
    }, [id, product]);

    // Set thumbnail once current product is loaded
    useEffect(() => {
        if (currentProduct?.image?.length) {
            setThumbnail(currentProduct.image[0]);
        }
    }, [currentProduct]);

    // Get related products
    useEffect(() => {
        if (currentProduct && product.length > 0) {
            const related = product.filter(
                (item) =>
                    item.category === currentProduct.category &&
                    item._id !== currentProduct._id
            );
            setRelatedProducts(related.slice(0, 5));
        }
    }, [currentProduct, product]);

    if (!currentProduct) return <p className="mt-16 text-center">Loading product...</p>;

    return (
        <div className="mt-16">
            {/* Breadcrumb */}
            <p className="mb-4">
                <Link to="/">Home</Link> /{" "}
                <Link to="/products">Products</Link> /{" "}
                <Link to={`/products/${currentProduct.category.toLowerCase()}`}>
                    {currentProduct.category}
                </Link>{" "}
                / <span className="text-primary">{currentProduct.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                {/* Thumbnails and main image */}
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {currentProduct.image.map((img, index) => (
                            <div
                                key={index}
                                onClick={() => setThumbnail(img)}
                                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                            >
                                <img src={img} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img
                            src={thumbnail}
                            alt="Selected product"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Product info */}
                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{currentProduct.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5)
                            .fill("")
                            .map((_, i) => (
                                <img
                                    key={i}
                                    src={
                                        i < 4 ? assets.star_icon : assets.star_dull_icon
                                    }
                                    alt="star_icon"
                                    className="md:w-4 w-3.5"
                                />
                            ))}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">
                            MRP: {currency}${currentProduct.price}
                        </p>
                        <p className="text-2xl font-medium">
                            {currency}${currentProduct.offerPrice}
                        </p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {currentProduct.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button
                            onClick={() => addToCart(currentProduct._id)}
                            className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() => {addToCart(currentProduct._id); navigate('/cart')}}
                            className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition"
                        >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            {/* Related Products */}
            <div className="flex flex-col items-center mt-20">   
                <div className=" flex flex-col items-center w-max">
                    <p className="text-3xl font-medium">Related Products</p>
                    <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 lg:grid-cols-6 mt-6  w-full">
                    {relatedProducts.filter((product) => product.inStock).map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
                <button onClick={() => {navigate('/products'); scrollTo(0,0)}}s className="mt-4 text-primary  hover:bg-primary/10 mx-auto cursor-pointer px-12 my-16 py-2.5 border-rounded transition">See more</button>
            </div>
        </div>
    );
};

export default ProductDetails;
