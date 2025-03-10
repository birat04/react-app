import React from "react";

const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="Search">
            <div>
                <img src="./search.png" alt="Search Icon" />
                <input 
                type="text"
                placeholder="Search for a movie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>
        </div>
    )
}
export default Search;