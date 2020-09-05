import React from 'react';

const Nominations = (props) => {
    return (
        <ol className='nominations__list'>
            <li className='nominations__list-item'>{props.nominations.title} ({props.nominations.year})</li>
        </ol>
    )
}

export default Nominations;