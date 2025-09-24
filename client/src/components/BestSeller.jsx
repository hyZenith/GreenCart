import React from 'react'
import ProductCard from './ProductCard'
import { assets } from '../assets/assets'
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const {product} = useAppContext();
  return (
    <div className='my-10'>
      <p className='text-2xl md:text-3xl font-medium'>Best Seller</p>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 '>
        {product.filter((product) => product.inStock).slice(0,5).map((product, index) =>(
          <ProductCard key={index} product={product}/>
        ))}
      </div>
    </div>
  )
}

export default BestSeller
