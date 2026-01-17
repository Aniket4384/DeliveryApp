// CategoryCard.jsx
import React from 'react'

function CategoryCard({name, image, onClick}) {
  return (
    <div 
      className='w-[140px] h-[140px] md:w-[200px] md:h-[200px] rounded-xl border border-[#DDEEE3] shrink-0 overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer hover:border-[#2ECC71]'
      onClick={onClick}
    >
      <div className='relative w-full h-full overflow-hidden'>
        <img 
          src={image} 
          alt={name} 
          className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300'
        />
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-16'/>
        <div className='absolute bottom-0 w-full left-0 bg-gradient-to-t from-[#2ECC71] to-transparent px-3 py-4 text-center'>
          <span className='text-white font-semibold text-base md:text-lg drop-shadow-md'>
            {name}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard