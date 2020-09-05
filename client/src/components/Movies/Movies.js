import React from 'react';
import axios from 'axios';

const API_KEY = 'apikey=c606d611';

class Movies extends React.Component {
    state = {
        movie: [],
        query: '',
    }

    //listens to what is typed in the search bar
    handleInput = (event) => {
        this.setState({
            query: event.target.value
        })
    }
    
    //submits movie title typed in to search bar
    submitInput = (event) => {
        event.preventDefault();
        axios
        .get(`http://www.omdbapi.com/?s=${this.state.query}&type=movie&${API_KEY}`)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <>
            <h1>The Shoppies</h1>
      
            <input type='text' onChange={this.handleInput}/>
            <button onClick={this.submitInput}>Search</button>
            </>
        )
    }
}

export default Movies;