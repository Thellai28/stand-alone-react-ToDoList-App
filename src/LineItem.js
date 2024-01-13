import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

const LineItem = ( {singleItem, handleClickWithEase, handleDelete} ) => {
  return (
    <li className='item' key={singleItem.id}>

        <input
            type='checkbox'
            checked={singleItem.checked}
            onChange={() => handleClickWithEase(singleItem.id)}
        />

        <label 
            style={(singleItem.checked) ? {textDecoration : 'line-through'} : null} // if the list is not checked, do nothing: 
            onDoubleClick={() => handleClickWithEase(singleItem.id)}
        >{singleItem.description}</label>

        <FaTrashAlt 
            role='button'
            tabIndex="0"
            onClick={() => handleDelete(singleItem.id)}
            aria-label= {`Delete ${singleItem.item}`}
        />

    </li>
    
  )
}

export default LineItem