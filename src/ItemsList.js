import React from 'react';

import LineItem from './LineItem';

const ItemsList = ( {items, handleClickWithEase, handleDelete} ) => {
  return (
        <ul >
            {items.map(singleItem => (
                <LineItem
                    singleItem={singleItem}
                    key = {singleItem.id} // its not mandatory, 
                        //but the react will throw warning if absent, it epects key for every list item
                    handleClickWithEase = {handleClickWithEase}
                    handleDelete = {handleDelete}
                />
            ))}
        </ul>
    )
}

export default ItemsList