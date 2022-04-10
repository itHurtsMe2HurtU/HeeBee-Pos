import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  MenuAlt2Icon,
} from "@heroicons/react/outline";
import Sidebar from "../../components/layout/Sidebar";
import Notification from "../../components/layout/Notification";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "../../components/product/Product";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductsList } from "../../actions/productActions";
import debounce from "lodash/debounce";
//import InfiniteScroll from "react-infinite-scroll-component";
import { getCategory } from "../../actions/categoryAction";
import {
  removeItemsFromCart,
  removeAllItemsFromCart,
} from "../../actions/cartAction";

const LeftSectionHome = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const [isOpenMainSidebar, setIsOpenMainSidebar] = useState(false);

  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("Hot Coffee");
  const [customerInfoRenderData, setCustomerInfoRenderData] = useState({});

  // console.log({ category: category?.category_id });

  const ToggleMainSidebar = () => {
    isOpenMainSidebar === true
      ? setIsOpenMainSidebar(false)
      : setIsOpenMainSidebar(true);
  };

  // get userinfo from redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // get userDetails from redux store
  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;

  // get categories from redux store
  const getCategories = useSelector((state) => state.categories);

  const { loadingCategory, categories: categoryData } = getCategories;
  const categoryList = categoryData || [];

  // get product from redux store
  const productListFromStore = useSelector((state) => state.product);

  const { loading: isProductListLoading, product: productData } =
    productListFromStore;
  const productList = productData?.data || [];
  // console.log(productData)

  const branchIdfromStore = useSelector(
    (state) => state.userDetails?.user?.branch_id
  );
  // console.log(productListFromStore,"shiva")

  const hasNoPrducts = !isProductListLoading && !productList.length;
  const totalCount = productData?.total_product || 0;
  const itemPerPage = productData?.per_page || 10;

  const totalPageCount = Math.ceil(totalCount / itemPerPage);
  // console.log("TOTAL PAGE COUNT IS: ", totalPageCount);
  // const getProducts_List = useCallback((searchQuery = "") => {
  //   setAreProductsLoading(true);
  //   axios
  //     .get(
  //       `http://157.245.96.40/api/v1/webpos/get_product/1?search=${searchQuery}`
  //     )
  //     .then((res) => setProductList(res.data.data || []))
  //     .finally(() => setAreProductsLoading(false));
  // }, []);
  useEffect(() => {
    dispatch(getCategory(branchIdfromStore));
  }, [branchIdfromStore]);

  const getProductsListHandler = useCallback(
    (searchQuery = "", currentPage, reset, category = "") =>
      dispatch(
        getProductsList(
          searchQuery,
          currentPage,
          reset,
          category,
          branchIdfromStore
        )
      ),

    [dispatch, branchIdfromStore]
  );

  const getProductsListHandlerDebounced = useMemo(
    () => debounce(getProductsListHandler, 250),
    [getProductsListHandler]
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (branchIdfromStore !== undefined) {
      getProductsListHandlerDebounced(
        productSearchQuery,
        currentPage,
        true,
        category?.category_id
      );
    }
  }, [
    productSearchQuery,
    getProductsListHandlerDebounced,
    category,
    currentPage,
    branchIdfromStore,
  ]);

  const disablePrevButton = currentPage === 1;
  const disableNextButton = currentPage === totalPageCount;

  const handleNextClick = useCallback(() => {
    setCurrentPage((v) => v + 1);
  }, []);
  const handlePrevClick = useCallback(() => {
    setCurrentPage((v) => v - 1);
  }, []);

  return (
    <>
      <div className="w-full md:w-2/3 h-screen relative  z-25">
        {/*  bg color pink bg-red-200 */}
        <div className="top-bar-left-home m-[5px] p-1 fixed top-0 rounded-[10px] shadow-sm bg-slate-50">
          <div className="flex justify-between items-center">
            <button
              className="button-pimary-light p-2 bg-primaryLightColor25 text-primaryColor rounded-[10px]"
              onClick={ToggleMainSidebar}
            >
              <MenuAlt2Icon className="h-6 w-6" />
            </button>

            <div className="flex gap-1">
              <div className="search-input-div relative">
                <input
                  onChange={(e) => {
                    setProductSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  value={productSearchQuery}
                  type="search"
                  placeholder="Search item name/sku"
                  className="w-[250px] pl-[40px] rounded-[10px] p-2 bg-primaryLightColorInput text-textColor focus:outline-primaryColor"
                />
                <SearchIcon className="h-6 w-6 absolute top-[8px] left-[8px] text-primaryColor" />
              </div>
              <Notification />
            </div>
          </div>
        </div>
        <div className="top-bar-left-home m-[5px] p-1 fixed top-[55px] rounded-[10px] shadow-sm bg-slate-50">
          <div className="home-category-section  ">
            {categoryList.length > 0 && (
              <Carousel
                responsive={responsive}
                swipeable={true}
                className="py-0 w-100"
              >
                <div
                  className={`category-item category-item-active shadow-sm me-2 p-1`}
                  onClick={() => {
                    setCategory("");
                  }}
                >
                  <div
                    className={`flex items-center bg-primaryLightColorInput rounded-[10px] hover:bg-primaryLightColor30  ${
                      category === category?.category_id
                        ? " bg-primaryLightColor30"
                        : " bg-primaryLightColorInput"
                    }`}
                  >
                    <div className="category-img">
                      <img
                        src="https://previews.123rf.com/images/elenabsl/elenabsl1709/elenabsl170900033/85423555-set-of-grocery-products-icon-.jpg"
                        alt="category"
                        className="w-[60px] h-[50px] p-2 rounded-[10px]"
                      />
                    </div>
                    <div className="category-name ml-1 ">
                      <h6 className="font-bold capitalize">All Items</h6>
                    </div>
                  </div>
                </div>

                {categoryList.map((item) => (
                  <div
                    key={item.category_id}
                    className={`category-item category-item-active shadow-sm mr-2 p-1 `}
                    onClick={() => {
                      setCategory(item);
                      setCurrentPage(1);
                    }}
                  >
                    <div
                      className={`flex items-center bg-primaryLightColorInput rounded-[10px] hover:bg-primaryLightColor30  ${
                        item.category_id === category?.category_id
                          ? " bg-primaryLightColor30"
                          : " bg-primaryLightColorInput"
                      }`}
                    >
                      <div className="category-img">
                        <img
                          src={item.category_list.card_img}
                          alt="category"
                          className="w-[60px] h-[50px] p-2"
                        />
                      </div>
                      <div className="category-name ml-1">
                        <h6 className="font-bold text-capitalize">
                          {item.category_list.category_name}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            )}
          </div>
        </div>

        <div className="middle-bar-left-home m-[5px] px-2 rounded-[10px] absolute top-[130px] bottom-[55px] pb-2">
          {/*  bg color green  bg-green-50 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {/* <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product /> */}
            {/* name={product.product_list.product_name}
                      image={product.product_list.card_img}
                      price={product.product_list.price}
                      sku={product.product_list.sku}
                      itemAvailable={product.items_available}
                      foodtype={product.product_list.food_type}
                      description={product.product_list.description} */}

            {productList.map((product, i) => {
              return <Product key={i} product={product} />;
            })}
          </div>
        </div>
        <div className="bottom-bar-left-home m-[5px] p-1 fixed bottom-0 rounded-[10px] shadow-sm bg-slate-50">
          <div className="flex justify-between items-center">
            <h6 className="font-bold text-mutedColor ml-1">
              {productList.length} of {totalCount}
            </h6>
            <div className="flex justify-center items-center">
              <button
                className="button-pimary-light p-2 bg-primaryLightColor25 text-primaryColor rounded-l-[10px]"
                onClick={handlePrevClick}
                disabled={disablePrevButton}
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button className="button-pimary-light p-2 bg-primaryLightColor25 text-primaryColor font-bold cursor-default">
                Page {currentPage}
              </button>
              <button
                className="button-pimary-light p-2 bg-primaryLightColor25 text-primaryColor rounded-r-[10px]"
                onClick={handleNextClick}
                disabled={disableNextButton}
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Sidebar
        isOpenMainSidebar={isOpenMainSidebar}
        setIsOpenMainSidebar={setIsOpenMainSidebar}
      />
    </>
  );
};

export default LeftSectionHome;