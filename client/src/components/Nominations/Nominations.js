import React from 'react';

const Nominations = (props) => {
    return (
        <ul>
            <li>{props.nominations.title} ({props.nominations.year})</li>
        </ul>
    )
}

export default Nominations;