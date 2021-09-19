import React from "react";

const SearchBar = () => (
    <form action="/" method="get">
        <button type="submit">
            <i class="fas fa-search"></i>
        </button>
        <input
            type="text"
            id="header-search"
            placeholder="Search for podcast episodes"
            name="s" 
        />
    </form>
);

export default SearchBar;