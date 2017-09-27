import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateTabList, getUserInfo, clearUserSession } from '../../ducks/reducer';
import axios from 'axios';
import './LoggedIn.css';

class HomePage extends Component {
    constructor() {
        super();

        this.state = {
            band: '',
            song: '',
            searchCategory: 'band'
        }
        this.getTabsByBand = this.getTabsByBand.bind(this);
        this.getTabsBySong = this.getTabsBySong.bind(this);
    }

    getTabsByBand(band) {
        axios.get(`http://localhost:3020/api/bandSearch?bandName=${this.state.band}`)
            .then((response) => {
                this.props.updateTabList(response.data);
            })
    }

    getTabsBySong(song) {
        axios.get(`http://localhost:3020/api/songSearch?songName=${this.state.song}`)
            .then((response) => {
                this.props.updateTabList(response.data);
            })
    }

    componentWillMount() {
        this.props.getUserInfo();
    }

    render() {
        console.log(this.props.user)
        return (
            <div className='page_container'>

                <div className='nav_container'>
                    <a href='/#/logged_in_home' className='site_name'>TabSlam</a>
                    

                    <div className='username_container'>
                        <h3>Welcome Home, {this.props.user.username}</h3>
                        <a href='/'>My Library</a>
                        <br />
                        <a href={process.env.REACT_APP_LOGOUT} onClick={() => this.props.clearUserSession() }>Logout</a>
                    </div>

                </div>

                <div className='search_container'>

                    <select className='select_menu' onChange={(event) => this.setState({
                        searchCategory: event.target.value, song: '', band: ''
                    })}>
                        <option value='band'>Band</option>
                        <option value='song'>Song</option>

                    </select>

                    <input className='search_bar' value={this.state.searchCategory === 'band' ? this.state.band : this.state.song}
                        placeholder='Search for a tab'
                        onChange={this.state.searchCategory === 'band' ? (event) => this.setState({ band: event.target.value })
                            : (event) => this.setState({ song: event.target.value })} />

                    <button className='search_button' onClick={() => this.state.searchCategory === 'band' ?
                        this.getTabsByBand(this.state.band) : this.getTabsBySong(this.state.song)} > <Link to='/search-results'>Search</Link></button>

                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { updateTabList, getUserInfo, clearUserSession })(HomePage);