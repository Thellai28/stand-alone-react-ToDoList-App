 import React from 'react'
 
 const Footer = ( {length} ) => {
    const year = new Date();
   return (
     <footer>{length} List { length <= 1 ?  'item' : 'items'/* item or items will be given our as output*/ }</footer>

   )
 }
 
 export default Footer