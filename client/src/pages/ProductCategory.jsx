import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';


const ProductCategory = () => {
    const { product } = useAppContext();
    const { category } = useParams();
    
    const searchCaterogy = categories.find((item) => item.path.toLowerCase() === category.toLowerCase())

    const filteredProducts = product.filter((product) => product.category.toLowerCase() === category.toLowerCase());
  return (
    <div className='m-16'>   
      {searchCaterogy ? (
          <div className='flex flex-col items-end w-max '>
              <p className='text-2xl font-medium'> {searchCaterogy.text.toUpperCase()} </p>
              <div className='w-16 h-0.5 bg-primary rounded-full mb-6'></div>
          </div>
      ) : (
          <p className='text-red-500'>Category not found</p>
      )}
       {filteredProducts.length > 0 ?(
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
          {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
          ))}
         </div>
       ) : (
         <p className='flex items-center justify-center h-[60vh]'>No products found</p>
       )}
    </div>
  )
}

export default ProductCategory
