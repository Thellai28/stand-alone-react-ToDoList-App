

import ItemsList from "./ItemsList";



const Content = ( {items, handleClickWithEase, handleDelete} ) => {
  return ( 
    <> {/* empty tag is called fragments, since we are using <main> for content, we dont need to use any tag here, empty tag will do the job */}
      { (items.length) ? ( // if the list is not empty, show the list.
          <ItemsList
            items = {items}
            handleClickWithEase = {handleClickWithEase}
            handleDelete = {handleDelete}
          /> ) : ( // if the list is empty, show this message.
          <p style={{marginTop : '13rem'}}> Your list is empty, BITCH !!</p>
        )
      }
    </>
  );
}

export default Content;