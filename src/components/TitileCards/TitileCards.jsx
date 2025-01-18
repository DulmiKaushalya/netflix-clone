import React,{useEffect, useRef, useState} from 'react'
import './TitileCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';



const TitileCards = ({title,category}) => {

  const[apiData,setApitData] =useState([]);
  
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGQ4MzYwZTZhZTM5YTFlZGI1Y2UxZmJhNTJjNGM4OSIsIm5iZiI6MTczNzE5NTAwMC43MTcsInN1YiI6IjY3OGI3ZGY4NjhlMGQ4NzM2MzZkZDBhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRbwK9WLf2W4kNITsONsxC_tLCJDD3txHKhf9vd2pmI'
    }
  };
  
const handlewheel = (event)=>{
  event.preventDefault;
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{
    
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApitData(res.results))
    .catch(err => console.error(err));


  cardsRef.current.addEventListener('wheel',handlewheel);
},[])

  return (
    <div className='titile-cards'>
       <h2>{title?title:"Popular on Netflix"}</h2>
       <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
              return <Link to={`/player/${card.id}`} className="card" key={index}>
                 <img src={`https://image.tmdb.org/t/p/w500` +card.backdrop_path} alt=''/>
                 <p>{card.original_title}</p>
              </Link>
        })}
       </div>
    </div>
  )
}

export default TitileCards
