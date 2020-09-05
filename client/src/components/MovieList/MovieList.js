import React from 'react';

const MovieList = (props) => {
    return(
        <ul>
            <li>{props.movie.Title} ({props.movie.Year})</li>
        </ul>
    )
}

export default MovieList;