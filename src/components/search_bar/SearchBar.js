import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFavorites, updateTabList, updateUserSearch } from '../../ducks/reducer';
import axios from 'axios';
import './SearchBar.css';

const serverURL = process.env.NODE_ENV === 'production' ? 'https://tab-slam-server.herokuapp.com/home' : 'http://localhost:3020'

class SearchBar extends Component {
    constructor() {
        super();

        this.state = {
            band: '',
            song: '',
            searchCategory: 'band',
        }
        this.getTabsByBand = this.getTabsByBand.bind(this);
        this.getTabsBySong = this.getTabsBySong.bind(this);
    }

    getTabsByBand(band) {
        axios.get(`${serverURL}/api/bandSearch/${this.state.band}`)
            .then((response) => {
                this.props.updateTabList(response.data);
                this.props.updateUserSearch(this.state.band)
            })
    }

    getTabsBySong(song) {
        axios.get(`${serverURL}/api/songSearch/${this.state.song}`)
            .then((response) => {
                this.props.updateTabList(response.data);
                this.props.updateUserSearch(this.state.song);
            })
    }

    render() {
        return (
            <div className='searchBar_search_container'>

                <select className='searchBar_select_menu' onChange={(event) => this.setState({
                    searchCategory: event.target.value, song: '', band: ''
                })}>
                    <option value='band'>Band</option>
                    <option value='song'>Song</option>

                </select>

                <input className='searchBar_search_bar' value={this.state.searchCategory === 'band' ? this.state.band : this.state.song}
                    placeholder='Search for a tab'
                    onChange={this.state.searchCategory === 'band' ? (event) => this.setState({ band: event.target.value })
                        : (event) => this.setState({ song: event.target.value })} />

                <Link to='/search-results'>
                    <button className='searchBar_search_button' onClick={() => this.state.searchCategory === 'band' ?
                        this.getTabsByBand(this.state.band) : this.getTabsBySong(this.state.song)} > Search</button>
                </Link>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tabList: state.tabList,
        tabId: state.tabId,
        user: state.user,
        isLoading: state.isLoading,
        tabObject: state.tabObject,
        userSearch: state.userSearch,
        isFromFavorites: state.isFromFavorites
    }
}

export default connect(mapStateToProps, { getFavorites, updateTabList, updateUserSearch })(SearchBar);
