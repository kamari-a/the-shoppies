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
        banner: false
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
        const nominations = this.state.nominations;

        nominations.push({
            'movie': event.target.value,
        })

        this.setState({
            nominations: nominations,
        })

        if(nominations.length === 5){
            this.setState({
                banner: true,
            })
        } else {
            this.setState({
                banner: false,
            })
        }
    }

    removeMovie = (selectedNomination) => {
        const deletedNomination = this.state.nominations.filter(nomination => nomination.movie !== selectedNomination);

        this.setState({
            nominations: deletedNomination,
        })

        if(deletedNomination.length === 5){
            this.setState({
                banner: true,
            })
        } else {
            this.setState({
                banner: false,
            })
        }
    }

    render() {
        return (
            <>
            <header className='header'>
                <h2 className='header__banner'>{!this.state.banner ? '' : "You've selected your 5 nominations. Thank you for participating in The Shoppies!"}</h2>
            </header>

            <main className='main'>
                <h1 className='main__title'>THE SHOPPIES</h1>

                <section className='search'>
                    <label className='search__label'>Find A Movie</label>
                    <div className='search__container'>
                        <input type='text' onChange={this.handleInput} className='search__search'/>
                        <button onClick={this.submitInput} className='search__btn'>Search</button>
                    </div>
                </section>

                <section className='results'>
                    <h3 className='results__title'>Results for {this.state.query}</h3>
                    
                    {this.state.movie.map(movie => 
                        <div className='results__item'>
                            <MovieList movie={movie} key={movie.imdbID}/>
                            <button onClick={this.addMovie} 
                            value={movie.Title + ` (${movie.Year})`}  
                            className='results__btn'>Nominate</button>
                        </div>
                    )} 
                </section>

                <section className='nominations'>
                    <h2 className='nominations__title'>Nominations</h2>

                    {this.state.nominations.map(nominations =>
                        <div className='nominations__container'>
                            <Nominations nominations={nominations}/>
                            <button onClick={() => this.removeMovie(nominations.movie)} 
                            className='nominations__btn'>Remove</button>
                        </div>
                    )}
                </section>
            </main>
            </>
        )
    }
}

export default Movies;