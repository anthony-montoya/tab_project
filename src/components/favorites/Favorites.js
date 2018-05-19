import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTabObject, setFavoritesStatus, getFavorites, clearResults } from '../../ducks/reducer';
import axios from 'axios';
import './Favorites.css';
import backArrowLogo from '../../backArrow.png';

class Favorites extends Component {

    componentDidMount() {
        if (this.props.user.hasOwnProperty('displayName')) {
            axios.get('https://tab-slam-server.herokuapp.com/api/getFavorites/' + this.props.user.user_id)
                .then(response => {
                    this.props.getFavorites(response.data)
                })
        }
    }

    setFavoriteTab(position) {
        this.props.getTabObject(this.props.userFavorites[position]);
        this.props.setFavoritesStatus(true);
    }

    deleteFavoriteTab(user_id, tab_id) {
        const favData = { user_id: user_id, tab_id: tab_id }
        axios.post('https://tab-slam-server.herokuapp.com/api/deleteFavorite', favData)
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

                {/* <section className='fav_difficulty'>
                    {
                        favorites.difficulty.includes('undefined')
                            ?
                            <h1 style={{ marginLeft: '2vw' }}>-----</h1>
                            :
                            <h1 style={{ marginLeft: '2vw' }}>{favorites.difficulty}</h1>
                    }

                </section> */}

                <div className='delete_favorites'>
                    <i className="fa fa-times" aria-hidden="true" onClick={() => this.deleteFavoriteTab(this.props.user.user_id, favorites.url)}></i>
                </div>

            </div>
        })
        return (
            <div className='search_page_container'>

                <div className='search_nav_container'>
                    {
                        this.props.user.hasOwnProperty('displayName')
                            ?
                            <a href='/home'>TabSlam</a>
                            :
                            <a href='/home'>TabSlam</a>
                    }

                    {
                        this.props.user.hasOwnProperty('displayName')
                            ?
                            <a href={process.env.REACT_APP_LOGOUT}>Logout</a>
                            :
                            <a href={process.env.REACT_APP_LOGIN}>Login</a>
                    }

                </div>

                <div className='search_results_container'>
                    <div className='search_container_header'>
                        <section className='search_header_buttons'>

                            <Link to='/home'>
                                <img src={backArrowLogo} alt='' onClick={() => this.props.clearResults()}/>
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

                            {/* <section>
                                <h1>Difficulty</h1>
                            </section> */}

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