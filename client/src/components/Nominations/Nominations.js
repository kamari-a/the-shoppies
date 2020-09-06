import React from 'react';

const Nominations = (props) => {
    return (
        <ul className='nominations__list'>
            <li className='nominations__list-item' key={props.nominations.imdbID}>{props.nominations.movie}</li>
        </ul>
    )
}

export default Nominations;