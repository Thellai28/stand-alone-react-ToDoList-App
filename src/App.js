import Header from './Header';
import Content from './Content';
import "./index.css";
import Footer from './Footer';
import React, { useEffect, useState } from 'react'
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';



function App() {



  const API_URL = 'http://localhost:3500/items'; // URL is never gonna change, so we have used all caps in the API_URL : 

  const storedItems = null; //= JSON.parse(localStorage.getItem('todo_list'));
  const [items, setItems] = useState( storedItems || [] ); // Some times the value of 'todo_list' might be null, in such cases use []: 

  const [description, setDescription] = useState( '' );
  const [search, setSearch] = useState( '' );
  const [ errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);







  useEffect( ()=>{
    const fetcheDataFromApi = async() =>{
      try{
        const response = await fetch( API_URL ); // since the data fetcing from API might take time :
        // npx json-server -p 3600 -w data/db.json // use this command to host the local database : 

        if( !response.ok ) throw new Error("Data not fetched" );

        const listItems =  await response.json(); // we can parse the data only after getting data from the API, so we need to wait till we get data from API.
        setItems( listItems );
        setErrorMessage( null );
      }catch(err){
        setErrorMessage( err.Message );
      }finally{
        setIsLoading(false);
      }
    }
    ( async() => await fetcheDataFromApi() ) ( /* this bracker it to trigger the fetchDataFromApi function */ )
  }, [] );






  const handleSubmit = async( event ) =>{
    event.preventDefault(); // To prevent auto refresh after clicking enter or submit button on website : 
    if( !description ) return; // If the use entered empty string and try to add it, do nothing : 

    const id = findMaxId() + 1;
    const itemToBeAddedIntoList = { id, checked : false, description : description };
    // const newListItems = [ ...items, itemToBeAddedIntoList ];
    // // in this code we are using Array spreak, ( it's items, not item );
    // setItems( newListItems );
    setDescription( '' ); // BY default the description should be empty : 

    //localStorage.setItem("todo_list", JSON.stringify(newListItems) );


    const postOption = { // this defines what action we want to do in our REST API, post or put or patch or delete
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json' // Which data interchange format you want to use ?
      },
      body: JSON.stringify(itemToBeAddedIntoList) // json should be in upper case : 
    }

    const result = await apiRequest(API_URL, postOption);
    if( result ) setErrorMessage( result );

  }






  const findMaxId = ()=>{

    if( !items.length || !items ) return 0; // if the items array is empty or null, return 0 : 

    // Forming idArray, which only has id's of all the items present : 
    const idArray = items.map( (item) => item.id );

    const maxIdPresent = Math.max( ...idArray ); // Find the max id value in the given items list : 
    /*
      const maxIdPresent = Math.max( idArray ); this would fail because
      The Math.max function is designed to take a variable number of arguments 
      rather than an array. By using the spread operator, you are essentially 
      "spreading" the elements of the array as separate arguments to the function.

      In the above example, if you pass the array idArray directly to Math.max, 
      it won't give you the maximum value of the elements inside the array. 
      Instead, it will treat the array as a single argument, 
      and the result will likely be NaN (Not a Number).

      On the other hand, when you use the spread operator:
      const maxId = Math.max(...idArray); // This works as expected

      It effectively "spreads" the elements of the array, providing them as 
      individual arguments to the Math.max function. This way, it correctly 
      calculates the maximum value among the elements of the array.

    */
    return maxIdPresent;
  }






  const handleClickWithEase = async (id)=>{
    const newArray = items.map(
      (item) =>{
        return item.id === id ? {...item, checked : !item.checked} : item ; 
        // we need to use return since we have used curly braces.
        // in this line of code, we are using object spread: ( its item not item );
      }
      // (item) => item.id === id ? {...item, checked : !item.checked} : item ;
    )
    setItems( newArray );
    //localStorage.setItem("todo_list", JSON.stringify(newArray) );

    const itemToUpdate = items.filter( (item) => item.id === id );// This returns an array : 

    const updateOption = { // this defines what action we want to do in our REST API, post or put or patch or delete
      method : 'PATCH',
      headers : {
        'Content-Type' : 'application/json' // Which data interchange format you want to use ?
      },
      body: JSON.stringify( itemToUpdate ) // json should be in upper case : 
    }

    const requestUrl = `${API_URL}/${id}`; // this is the URL responsible for updating items : 

    const result = await apiRequest(requestUrl, updateOption);
    if( result ) setErrorMessage( result );

  }





  const handleDelete = async(id) =>{
    const newArray = items.filter(
      (item) => item.id !== id
    );
    setItems(newArray);
    //localStorage.setItem("todo_list", JSON.stringify(newArray) );

    const requestUrl = `${API_URL}/${id}`; // this is the URL responsible for updating items : 

    const deletOption = { method : 'DELETE'}

    const result = await apiRequest(requestUrl, deletOption);
  }

 

  


  return (
    <div className="App">

      <Header title = "Thellai's todo"/>

      <AddItem
        description = {description}
        setDescription = {setDescription}
        handleSubmit = {handleSubmit}
      />

      <SearchItem
        search = {search}
        setSearch = {setSearch}
      />
      

      <main>
        { errorMessage && <p> {`Error : ${errorMessage}`} </p> }
        { isLoading && <p> Loading data... </p> }
        {!isLoading && !errorMessage && <Content // Content comp will receive this as an object and all the attributs you send will become an attribut
        // in that object
          items = { items.filter(
              (item) => item && item.description && item.description.toLowerCase().includes(search.toLowerCase())
            )
          }
          handleClickWithEase = {handleClickWithEase}
          handleDelete = {handleDelete}
        />}
      </main>

      <Footer
        length = {items.length}
      />

    </div>
  );
}

export default App;
