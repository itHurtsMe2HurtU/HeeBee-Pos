import React, { useEffect, useState } from "react";
import orders from "../../api/orders";

const OnHoldItemsCard = ({ order_item }) => {

    useEffect(() => {
        getImage(order_item);
    }, [order_item])

    const [image, setImage] = useState(null)

    const getImage = async (order_item) => {
        const product = order_item.product_id;
        const response = await orders.get(`get_single_product?product=${product}`);
        console.log(response);
        setImage(response);
    }

    if (!image) {
        return <div>Loading...</div>;
    }

    return (
        <li
            className="product-card-item p-1 bg-stone-50 shadow-sm rounded-[10px] mb-1.5 "
            key={order_item.order_id}
        >
            <div className="flex w-full gap-2">
                <div className="flex-none relative w-[60px] h-[60px] rounded-[10px] cursor-pointer ">
                    <img
                        alt="orderitempic"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "10px",
                        }}
                        src={image.data.data.product_list.card_img}
                    />
                    <span className="text-[11px] rounded-full bg-primaryColor text-stone-50 p-0.1 px-1 absolute top-[-5px] right-[-5px]">
                        {order_item?.quantity || "1"}
                    </span>
                </div>

                <div>
                    <h2 className="font-bold text-gray-800 capitalize text-md line-clamp-1 leading-tight cursor-pointer">
                        {order_item.product_name}
                    </h2>
                    <div className="font-bold text-sm text-gray-500  leading-tight line-clamp-2 capitalize truncate">
                        <p>Food Type: {order_item.food_type}</p>
                    </div>
                </div>
                <div className="flex justify-around items-center gap-2 pr-2 ml-auto">
                    <h6 className="font-bold text-md text-gray-500 leading-none">
                        ₹{order_item.price}
                    </h6>
                </div>
            </div>
        </li>
    );
};

export default OnHoldItemsCard;
