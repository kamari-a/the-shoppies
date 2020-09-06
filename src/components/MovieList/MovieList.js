import React from 'react';

const MovieList = (props) => {
    return (
        <ul className='results__list'>
            <li className='results__list-item' key={props.movie.imdbID}>{props.movie.Title} ({props.movie.Year})</li>
        </ul>
    )
}

export default MovieList;