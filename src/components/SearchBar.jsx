import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    margin-left: -25px;
    button {
        background-color: white;
        border: none;
        color: #F3AAA5;
        padding: 10px;
        padding-left: 20px;
        font-size: 20px;
    }

    input {
        color: silver;
        border: silver;
        padding: 8px;
        width: 350px;
    }

    form {
        width: 300px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
`

const SearchBar = () => (
    <Wrapper>
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
    </Wrapper>
);

export default SearchBar;