import React from 'react'
import { assets, categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const {navigate} = useAppContext();
    
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Caterogories</p>
      <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:gridcol7 mt-6 gap-6'>

    {/* implicity retunr is used here */}
    {(categories.map((category, index) => (
        <div key={index} className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center' style={{backgroundColor: category.bgColor}}
        onClick={() =>{
            navigate(`products/${category.path}`)
            scrollTo(0,0);
        }}
        
        >
            <img  src={category.image} alt={category.text} className='group-hover:scale-108 transition max-w-28' />
            <p className='text-sm font-medium'> {category.text} </p>
        </div>        
    )))}

      </div>
    </div>
  )
}

export default Categories
