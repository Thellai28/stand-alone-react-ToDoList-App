import React, { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'

const AddItem = ( {description, setDescription, handleSubmit} ) => {

  const inputRef = useRef();
  return (
    <form className='addForm' onSubmit={(e) => handleSubmit(e)} >
        <label htmlFor='addItem'> Add Item</label>
        <input
            autoFocus
            id = 'addItem'
            type= 'text'
            placeholder='Add item'
            required 
            ref={inputRef}
            value = {description} // shows what is stored in newItem variable : 
            onChange={(event) => setDescription(event.target.value)} // changes the values stored in newItem : 
        />

        <button
            type='submit'
            aria-label='Add Item'
            onClick={()=> inputRef.current.focus()}
        > 
            <FaPlus/>
        </button>

    </form>
  )
}

export default AddItem