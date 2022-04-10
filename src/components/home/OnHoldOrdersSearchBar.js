import { SearchIcon } from '@heroicons/react/solid';
import React from 'react';




const OnHoldOrdersSearchBar = ({ handleSetSearchWord }) => {


    return (
        <div className="search-bar bg-whiteColor m-2 p-2 rounded-[10px]">
            <div className="flex items-center py-1 px-1 leading-normal bg-primaryLightColorInput text-gray-800  rounded-[10px] search-input">
                <SearchIcon className="text-primaryColor font-bold text-3xl h-6 w-6" />
                <input
                    className="w-full py-1 px-2  leading-normal bg-transparent border-none rounded-[10px] text-gray-800  focus:outline-none"
                    type="search"
                    placeholder="Search by Customer Number or Order ID"
                    // value={searchedWord}
                    onChange={(e) => handleSetSearchWord(e.target.value.toLowerCase())}
                />
            </div>
        </div>
    )
}

export default OnHoldOrdersSearchBar;