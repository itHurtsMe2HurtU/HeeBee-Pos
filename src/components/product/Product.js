import React,{useState} from 'react'
import { CollectionIcon, InformationCircleIcon } from '@heroicons/react/outline'
import VegIcon from "../../assets/images/green-circle.svg";
import NonVegIcon from "../../assets/images/red-circle.svg";
import Modal from '../../components/product/Modal';
import ReactTooltip from 'react-tooltip';


const Product = ({product}) => {
    const [isOpen, setIsOpen] = useState(false)
    

 
    return (
        <div className="product-card max-w-sm rounded-[10px] p-2 overflow-hidden shadow-md bg-white relative cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <img className="w-full rounded-[10px]" src={product.product_list.card_img} alt={product.product_list.product_name} />
            <span className='bg-white font-bold text-primaryColor px-2 py-0 absolute left-3 top-3 rounded-[10px] backdrop-blur-sm text-sm'>{product.product_list.sku}</span>
            <img src={product.product_list.food_type==="Veg" ? VegIcon : NonVegIcon} alt="Veg" width="20" className='absolute right-3 top-3 rounded-[10px] backdrop-blur-sm text-sm p-0.5 bg-white border-2 ' />
            <div className='product-card-body mt-2'>
                <div className='flex justify-between items-center mb-1'>
                    <h6 className='text-textColor font-bold line-clamp-2 capitalize leading-tight	'>{product.product_list.product_name}</h6>


                    <span data-tip={product.product_list.description} className='text-orange-500'><InformationCircleIcon className='w-6 h-6' /> </span><ReactTooltip/>

                </div>
                <div className='flex justify-between items-center'>
                    <h6 className='text-primaryColor font-bold capitalize text-lg'>&#8377;{product.product_list.price}</h6>
                    <h6 className='text-mutedColor font-bold text-sm capitalize flex' ><CollectionIcon className='w-5 h-5 mr-1' data-tip="Availability" />{product.items_available}</h6>
                </div>
            </div>
            
    

            <Modal isOpen={isOpen} setIsOpen={setIsOpen} product={product} />

        </div>
    )
}

export default Product