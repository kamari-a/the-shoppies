import React from 'react';

const MovieList = (props) => {
    return (
        <ul className='results__list'>
            <li className='results__list-item'>{props.movie.Title} <span style={{color: '#C5CBE3'}}>({props.movie.Year})</span></li>
        </ul>
    )
}

export default MovieList;