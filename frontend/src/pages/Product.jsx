import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency ,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('')
  const [size,setSize] = useState('')

  useEffect(() => {
    const product = products.find(item => item._id === productId)
    if(product){
      setProductData(product)
      setImage(product.image[0])
    }
  }, [productId, products])

  if(!productData) return <div className='opacity-0'></div>

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500'>

      {/* -------- Product Details -------- */}
      <div className='flex flex-col md:flex-row gap-12'>

        {/* Product Images */}
        <div className='flex flex-col md:flex-row gap-4 md:gap-6'>
          
          {/* Thumbnail Images */}
          <div className='flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible'>
            {productData.image.map((img, i) => (
              <img 
                key={i}
                onClick={() => setImage(img)}
                src={img} 
                className={`cursor-pointer rounded-md border hover:scale-105 transition-transform duration-300 ${image === img ? 'border-purple-600' : 'border-gray-200'}`} 
                alt=""
              />
            ))}
          </div>

          {/* Main Image */}
          <div className='flex-1 flex justify-center items-center'>
            <img src={image} alt="" className='w-full max-w-md rounded-xl shadow-lg hover:scale-105 transition-transform duration-300' />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1 flex flex-col gap-4'>
          <h1 className='text-2xl md:text-3xl font-semibold'>{productData.name}</h1>
          
          {/* Ratings */}
          <div className='flex items-center gap-1 mt-2'>
            {[...Array(4)].map((_, i) => <img key={i} src={assets.star_icon} alt="" className="w-4 md:w-5" />)}
            <img src={assets.star_dull_icon} alt="" className="w-4 md:w-5" />
            <span className='pl-2 text-gray-500'>(122 reviews)</span>
          </div>

          <p className='text-3xl md:text-4xl font-bold mt-4'>{currency}{productData.price}</p>
          <p className='text-gray-500 mt-2 md:w-4/5'>{productData.description}</p>

          {/* Size Selection */}
          <div className='mt-6'>
            <p className='font-medium mb-2'>Select Size</p>
            <div className='flex gap-2 flex-wrap'>
              {productData.sizes.map((item, index)=>(
                <button 
                  key={index} 
                  onClick={() => setSize(item)}
                  className={`px-4 py-2 rounded-md border transition-all duration-300 ${size === item ? 'border-purple-600 bg-purple-50' : 'border-gray-300 hover:border-purple-400'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button 
            onClick={()=>addToCart(productData._id,size)}
            className='mt-6 bg-gradient-to-r from-purple-600 to-purple-400 text-white py-3 px-6 rounded-lg shadow-lg hover:from-purple-700 hover:to-purple-500 transition-all duration-300 w-full md:w-auto'
          >
            ADD TO CART
          </button>

          {/* Info */}
          <div className='text-sm text-gray-500 mt-6 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on delivery available</p>
            <p>Easy returns and exchanges within 7 days</p>
          </div>

        </div>
      </div>

      {/* Description & Reviews */}
      <div className='mt-16'>
        <div className='flex border-b'>
          <b className='px-6 py-3 text-sm border-r border-gray-300 cursor-pointer'>Description</b>
          <p className='px-6 py-3 text-sm cursor-pointer'>Reviews (122)</p>
        </div>
        <div className='border p-6 mt-2 text-gray-600 text-sm md:text-base rounded-lg'>
          <p className='mb-2'>An e-commerce website is an online platform that facilitates buying and selling of products online. It serves as a virtual marketplace for businesses and individuals to showcase products and conduct transactions.</p>
          <p>Products typically have dedicated pages with detailed descriptions, images, prices, and variations (sizes/colors). Customers can browse, select, and purchase items conveniently from home.</p>
        </div>
      </div>

      {/* Related Products */}
      <div className='mt-16'>
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  )
}

export default Product
