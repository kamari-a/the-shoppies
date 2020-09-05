import React from 'react';
import axios from 'axios';
import MovieList from '../MovieList/MovieList';
import Nominations from '../Nominations/Nominations';

const API_KEY = 'apikey=c606d611';

class Movies extends React.Component {
    state = {
        query: '',
        movie: [],
        nominations: [],
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

    addMovie = (event) => {
        event.preventDefault();
        this.setState({
            //currently adds an item to the end of the nominations array but will replace content with the new item, rather than appending this
            nominations: [
                {
                    'title': this.state.movie[0].Title,
                    'year': this.state.movie[0].Year
                }
            ]
        })
    }

    removeMovie = (event) => {
        event.preventDefault();
        //currently clears the nominations array but will need to be set up to clear only the selected item
        this.setState({
            nominations: []
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
                    <>
                    <MovieList movie={movie} key={movie.imdbID}/>
                    <button onClick={this.addMovie}>Nominate</button>
                    </>
                )} 
            </section>

            <section>
                <h2>Nominations</h2>
                {this.state.nominations.map(nominations =>
                    <>
                    <Nominations nominations={nominations}/>
                    <button onClick={this.removeMovie}>Remove Nomination</button>
                    </>
                )}
            </section>
            </>
        )
    }
}

export default Movies;