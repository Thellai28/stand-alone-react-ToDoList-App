const apiRequest =  async(URL = '', optionsObject = null, errorMessage = null) =>{
    
    try{
        const response = await fetch( URL, optionsObject );
        console.log( response );
        if( !response.ok) throw new Error( " Reload the app once " );

    }catch ( error ){
        errorMessage = error.Message;

    }finally{
        
        return errorMessage;
    }
}

export default apiRequest;