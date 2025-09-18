// SearchComponent.js
import React from 'react';
import { FiSearch } from 'react-icons/fi';
const SearchComponent = () => {
    return (
        <div className="relative mr-2 ml-0 w-full sm:ml-3 sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-blue-600" />
            </div>
            <input
                className="block md:w-[30rem] pl-10 pr-3 py-1.5 bg-emerald-100 text-black rounded-full text-sm placeholder-black focus:outline-none focus:bg-emerald-100 focus:text-black-900"
                placeholder="Search"
                type="search"
                name="search"
                aria-label="Search jobs"
            />
        </div>
    );
};

export default SearchComponent;
