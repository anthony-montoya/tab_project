import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateTabList, setLoadingStatus, updateUserSearch, setUserInfo, getFavorites } from '../../ducks/reducer';
import axios from 'axios';
import Login from '../login/Login';
import './Home.css';

const serverURL = process.env.NODE_ENV === 'production' ? 'https://tab-slam-server.herokuapp.com' : 'http://localhost:3020'

class HomePage extends Component {
    constructor() {
        super();

        this.state = {
            band: '',
            song: '',
            searchCategory: '',
            displayName: ''
        }
        this.getTabsByBand = this.getTabsByBand.bind(this);
        this.getTabsBySong = this.getTabsBySong.bind(this);
    }

    getTabsByBand(band) {
        axios.get(`${serverURL}/api/bandSearch/${this.state.band}`)
            .then((response) => {
                this.props.updateTabList(response.data);
                this.props.setLoadingStatus(false);
                this.props.updateUserSearch(this.state.band)
            })
    }

    getTabsBySong(song) {
        axios.get(`${serverURL}/api/songSearch/${this.state.song}`)
            .then((response) => {
                this.props.updateTabList(response.data);
                this.props.setLoadingStatus(false);
                this.props.updateUserSearch(this.state.song);
            })
    }


    render() {
        return (
            <div className='home_page_container'>
                <div className='fullscreen-bg'>
                    <video loop muted autoPlay className="fullscreen-bg__video">
                        <source src='https://giant.gfycat.com/GracefulTightGermanspaniel.webm' type="video/mp4" />
                    </video>
                </div>

                <div className='home_hero_container'>
                    {
                        this.props.user.displayName
                            ?
                            <h1>Hello, {this.props.user.displayName}</h1>
                            :
                            <h1>Learning music has never been easier</h1>
                    }
                    <h4>Search below by song or artist to begin learning your favorite music.</h4>
                </div>

                <div className='home_search_container'>

                    <select className='home_select_menu' onChange={(event) => this.setState({
                        searchCategory: event.target.value, song: '', band: ''
                    })}>
                        <option value='band'>Band</option>
                        <option value='song'>Song</option>

                    </select>

                    <input className='home_search_bar' value={this.state.searchCategory === 'band' ? this.state.band : this.state.song}
                        placeholder='Search for a tab'
                        onChange={this.state.searchCategory === 'band' ? (event) => this.setState({ band: event.target.value })
                            : (event) => this.setState({ song: event.target.value })} />

                    <Link to='/search-results'>
                        <button className='home_search_button' onClick={() => this.state.searchCategory === 'band' ?
                            this.getTabsByBand(this.state.band) : this.getTabsBySong(this.state.song)} > Search</button>
                    </Link>

                </div>

                <section className='home_login_container'>
                    <hr />
                    {
                        this.props.user.hasOwnProperty('displayName')
                            ?
                            <div className='loggedInButtons'>
                                <Link to='/my-favorites' className='home_login_button'>My Favorites</Link>
                                <a href={process.env.REACT_APP_LOGOUT} className='home_login_button'>Logout</a>
                            </div>
                            :
                            <Login setUserInfo={this.props.setUserInfo} isLoggedIn={this.props.user.hasOwnProperty('username')} />
                    }
                </section>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { updateTabList, setLoadingStatus, updateUserSearch, setUserInfo, getFavorites })(HomePage);
