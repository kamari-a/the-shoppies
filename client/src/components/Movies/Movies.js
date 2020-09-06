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

    handleInput = (event) => {
        this.setState({
            query: event.target.value
        })
    }
    
    submitInput = (event) => {
        event.preventDefault();
        axios
        .get(`http://www.omdbapi.com/?s=${this.state.query}&type=movie&${API_KEY}`)
        .then(response => {
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

        const nominations = this.state.nominations.slice();
        nominations.push({
            'movie': event.target.value,
        })

        this.setState({
            nominations: nominations
        })
    }
    
    removeMovie = (event) => {
        event.preventDefault();
 
        const nominations = this.state.nominations.slice()

        //currently removes the last item from the array - needs to be fixed to remove the matching id
        nominations.pop({
            'title': event.target.value.Title,
            'year': event.target.value.Year
        })

        this.setState({
            nominations: nominations
        })
    }

    render() {
        return (
            <>
            <main className='main'>
                <h1 className='main__title'>THE SHOPPIES</h1>

                <section className='search__container'>
                    <label className='search__label'>Find A Movie</label>
                    <input type='text' onChange={this.handleInput} className='search__search'/>
                    <button onClick={this.submitInput} className='search__btn'>Search</button>
                </section>

                <section className='results__container'>
                    <h3 className='results__title'>Results for {this.state.query}</h3>
                    {this.state.movie.map(movie => 
                    <>
                    <MovieList movie={movie} key={movie.imdbID} />
                    <button onClick={this.addMovie} value={movie.Title + ` (${movie.Year})`} className='results__btn'>Nominate</button>
                    </>
                    )} 
                </section>

                <section className='nominations__container'>
                    <h2 className='nominations__title'>Nominations</h2>
                    {this.state.nominations.map(nominations =>
                        <>
                        <Nominations nominations={nominations}/>
                        <button onClick={this.removeMovie} className='nominations__btn' >Remove</button>
                        </>
                    )}
                </section>
            </main>
            </>
        )
    }
}

export default Movies;