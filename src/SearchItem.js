import React from 'react'

const SearchItem = ( {search, setSearch} ) => {
  return (
    <form className='searchForm' onSubmit={(event) => event.preventDefault()} >
        <label htmlFor='search'>Search</label>
        <input
            id = 'search'
            type = 'text'
            role = 'searchbox'
            placeholder =' Search box'
            value = {search}
            onChange={(event) => setSearch(event.target.value)}
        />

    </form>
  )
}

export default SearchItem