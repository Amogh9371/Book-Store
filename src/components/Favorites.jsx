import React from 'react'
import "../App.css";
import { useAppContext } from './context/appContext';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
 
  const {favorites, addToFavorites, removeFromFavorites } = useAppContext();

const navigate = useNavigate();
//remove from favorites
const favoriteChecker = (id)=>{
  const boolean = favorites.some((book)=> book.id === id);
  return boolean;
}


  return (
    <div className="favorites">
    {favorites.length > 0?  favorites.map((book)=>(
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
  )): <h1>You dont have any favorites</h1>}
  </div>
  )
}

export default Favorites