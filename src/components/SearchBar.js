import React from 'react';
import { Search } from '@mui/icons-material';


function SearchBar({ search, setSearch, inputRef }) {
  return (
    <div className='search-bar'>
    <input
      ref={inputRef}
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search by name or email..."
      aria-label="Search users"
      
    />
    <button type="button" className="search-btn" aria-label="Search">
    <Search fontSize="small" />
  </button>
  </div>
  );
}

export default SearchBar;
