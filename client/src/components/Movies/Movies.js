import React from 'react';
import axios from 'axios';
import MovieList from '../MovieList/MovieList';

const API_KEY = 'apikey=c606d611';

class Movies extends React.Component {
    state = {
        query: '',
        movie: []
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
            console.log(response.data.Search)
            this.setState({
                movie: response.data.Search
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <>
            <h1>The Shoppies</h1>

            <section>
                <label>Movie Title</label>
                <input type='text' onChange={this.handleInput}/>
                <button onClick={this.submitInput}>Search</button>
            </section>
            
            <section>
                <h2>Results for {this.state.query}</h2>

                {this.state.movie.map(movie => 
                    <MovieList 
                    movie={movie}
                    />
                )}
            </section>
            </>
        )
    }
}

export default Movies;