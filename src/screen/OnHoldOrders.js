import { ChevronLeftIcon, ShoppingCartIcon, XIcon } from '@heroicons/react/outline';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import OnHoldOrderDetailsDisplay from "../components/home/OnHoldOrderDetailsDisplay";
import OnHoldOrdersList from "../components/home/OnHoldOrdersList";
import OnHoldOrdersSearchBar from '../components/home/OnHoldOrdersSearchBar';



const url = "https://heebeetestapi.quadbtech.com/api/v1/webpos/get_emp_hold_orders/1?employee=01a1e1ec-9cc6-4808-a3cc-2d6143454fc8&branch=3e2f18a3-7143-4ada-8e97-b4745c63f06a"

let allOnHoldOrders = []

const getOnHoldOrders = async () => {
  try {
    const response = await axios.get(url)
    console.log('response:-', response);
    allOnHoldOrders = response.data.data
    return response.data.data
  } catch (error) {
    console.log('error while getting onHold data:-', error);
  }
}

function OnHoldOrders() {
  const [visible, setVisible] = React.useState(true);

  const [onHoldOrdersData, setOnHoldOrdersData] = useState([])

  const [searchedWord, setSearchedWord] = useState("")

  const handleSetSearchWord = (word) => {
    setSearchedWord(word)
  }

  const [orderId, setOrderId] = useState("")

  useEffect(() => {
    getOnHoldOrders().then((data) => {
      setOnHoldOrdersData(data)
      setOrderId(data[0].order_id)
    })
  }, [])

  useEffect(() => {
    if (searchedWord) {
      setOnHoldOrdersData(
        onHoldOrdersData
          .filter((order) => {
            return (order.order_id.toLowerCase().includes(searchedWord)) || (order.customer_no.toLowerCase().includes(searchedWord))
          })
      )
    } else {
      setOnHoldOrdersData(allOnHoldOrders)
    }
  }, [searchedWord])

  const navigate = useNavigate()

  return (
    <>
      <div>
        <button
          className=" font-bold  py-2 px-4 rounded leading-normal sm:hidden bg-white/50 hover:bg-primaryLightColor25 text-primaryColor p-2 rounded-[10px] backdrop-blur-[3px] block md:hidden shadow fixed bottom-[60px] right-[20px]  z-50"
          onClick={() => setVisible(!visible)}
        >
          {visible ? <ShoppingCartIcon className="text-3xl h-5 w-5" /> : <XIcon className="text-4xl h-5 w-5" />}
        </button>
      </div>


      <div className="bg-bgColor h-screen flex flex-col md:flex-row ">
        {/* //left section// */}
        <section className={`left-section w-full md:w-[700px] h-full flex flex-col${visible ? " active" : ""}`}>
          <div className="flex justify-between items-center bg-white borderRadius rounded-[10px] m-2 p-2">
            <div className="flex p-2 text-primaryColor items-center bg-primaryLightColor25 rounded-[10px] cursor-pointer">
              <ChevronLeftIcon className="h-6 w-6"
                onClick={() => { navigate("/") }}
              />
            </div>

            <div className="flex justify-start w-64">
              <h1 className="text-2xl text-center text-primaryColor font-bold">
                Onhold Orders
              </h1>
            </div>
          </div>

          {/* //Search Bar// */}
          <OnHoldOrdersSearchBar
            handleSetSearchWord={handleSetSearchWord}
          />

          {/* //display onHoldOrder List// */}
          <div className="overflow-y-auto hover:cursor-pointer">
            {
              onHoldOrdersData?.map((onHoldOrder) => {
                return (
                  <div className="right-sidebar-orders h-100 md:max-h-[611px] overflow-y-auto">
                    <OnHoldOrdersList key={onHoldOrder.order_id}
                      onHoldOrder={onHoldOrder}
                      setOrderId={setOrderId} />
                  </div>
                )
              })
            }
          </div>
        </section>

        {/* //Right Section// */}
        <OnHoldOrderDetailsDisplay orderId={orderId} />
      </div>
    </>
  )
}

export default OnHoldOrders;
