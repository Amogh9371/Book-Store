import React, { useEffect, useState } from 'react'
import "../App.css";
import {API_URL} from "../API";
import axios from "axios";
import { useAppContext } from './context/appContext';
import { useNavigate } from 'react-router-dom';
const BookList = () => {
  const [books,setBooks] = useState([]);

  useEffect(()=>{ 
    axios.get(API_URL).then(res=>{
      console.log(res.data.items)
      setBooks(res.data)
      console.log(setBooks)      
      console.log("success")
    })
    .catch((err)=> console.log(err))
  },[])
//   const [favorites,setFavorite] = useState([]);
//   //Adding books to favorite on same component
//   const addFavorite = (e) => {
//     setFavorite((state)=>[...state, e])
    
//   }
// //Deleting books to favorite on same component
//   const deleteFavorite = (id) => {
//   const newList = favorites.filter((item) => item.id !== id);
//   setFavorite(newList);
//   }

//Use AppContext Hook
const {favorites, addToFavorites, removeFromFavorites } = useAppContext();
console.log("Favorites are", favorites);

const navigate = useNavigate();
//remove from favorites
const favoriteChecker = (id)=>{
  const boolean = favorites.some((book)=> book.id === id);
  return boolean;
}

  

  return <div className="book-list">
  {books.map((book)=>(
      <div key={book.id} className="book">
      <div><h4>{book.title}</h4></div>
      <div><img src={book.image_url} alt="#" onClick={()=> navigate(`/books/${book.id}`)} /></div>
      <div>
       {favoriteChecker(book.id)?
       <button onClick={()=> removeFromFavorites(book.id)}>Remove from Favorite</button>
       :(<button onClick={()=> addToFavorites(book)}>Add to Favorite</button>)}
        
        
      </div>
      {/* <div><button type="button" onClick={(event) => addFavorite(book)}>
Add to Favorites</button></div> */}
    </div>
  ))}
  

  {/* deleting the book from list */}
  {/* {favorites.map((book)=>(
    <div key={book.id}>
      <div>{book.volumeInfo.title}</div>
      <div><img src={book.volumeInfo.imageLinks.smallThumbnail} alt="#" /></div>
      <div><button type="button" onClick={() => deleteFavorite(book.id)}>
delete from Favorites</button></div>
    </div>
  ))} */}

  
  </div>;

}

export default BookList;