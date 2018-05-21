import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTabObject, setFavoritesStatus, getFavorites, clearResults } from '../../ducks/reducer';
import AppLogin from '../login/AppLogin';
import axios from 'axios';
import './Favorites.css';
import backArrowLogo from '../../backArrow.png';

const serverURL = process.env.NODE_ENV === 'production' ? 'https://tab-slam-server.herokuapp.com' : 'http://localhost:3020'

class Favorites extends Component {

    componentDidMount() {
        if (this.props.user.hasOwnProperty('displayName')) {
            axios.get(`${serverURL}/api/getFavorites/${this.props.user.auth_id}`)
                .then(response => {
                    this.props.getFavorites(response.data)
                })
        }
    }

    setFavoriteTab(position) {
        this.props.getTabObject(this.props.userFavorites[position]);
        this.props.setFavoritesStatus(true);
    }

    deleteFavoriteTab(auth_id, tab_id) {
        alert('Hit OK to remove this tab from your favorites.')
        const favData = { auth_id: auth_id, tab_id: tab_id }
        axios.post('http://localhost:3020/api/deleteFavorite', favData)
            .then(response => {
                this.props.getFavorites(response.data);
            })
    }

    render() {
        let favoritesList = this.props.userFavorites.map((favorites, i) => {
            return <div className='tab_content' key={i}>

                <section>
                    <h1>{favorites.artist}</h1>
                </section>

                <section>
                    <Link to='/tab-results' onClick={() => this.setFavoriteTab(i)}>
                        <h1>{favorites.name}</h1>
                    </Link>
                </section>

                <section>
                    <h1>{favorites.type}</h1>
                </section>

                <div className='delete_favorites'>
                    <i className="fa fa-times" aria-hidden="true" onClick={() => this.deleteFavoriteTab(this.props.user.auth_id, favorites.url)}></i>
                </div>

            </div>
        })
        return (
            <div className='search_page_container'>

                <div className='search_nav_container'>
                    {
                        this.props.user.hasOwnProperty('displayName')
                            ?
                            <Link to='/home'>
                                <h1>TabSlam</h1>
                            </Link>
                            :
                            <a href='http://localhost:3000/home'>TabSlam</a>
                    }

                    {
                        this.props.user.hasOwnProperty('displayName')
                            ?
                            <a href={process.env.REACT_APP_LOGOUT}>Logout</a>
                            :
                            <AppLogin />
                    }

                </div>

                <div className='search_results_container'>
                    <div className='search_container_header'>
                        <section className='search_header_buttons'>

                            <Link to='/home'>
                                <img src={backArrowLogo} alt='' onClick={() => this.props.clearResults()} />
                            </Link>

                            <section className='search_container_resultText'>
                                <h1>My Favorite Tabs</h1>
                            </section>

                        </section>

                        <section className='search_results_header'>

                            <section>
                                <h1>Artist</h1>
                            </section>

                            <section>
                                <h1>Song</h1>
                            </section>

                            <section>
                                <h1>Tab Type</h1>
                            </section>

                        </section>
                    </div>

                    <section className='search_content_container'>
                        {favoritesList}
                    </section>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { getTabObject, setFavoritesStatus, getFavorites, clearResults })(Favorites);