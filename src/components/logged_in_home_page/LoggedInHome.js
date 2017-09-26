import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTabList } from '../../ducks/reducer';
import axios from 'axios';
import './LoggedIn.css';
import SearchResults from '../search_results/SearchResults';

class HomePage extends Component {
    constructor() {
        super();

        this.state = {
            band: '',
            song: '',
            searchCategory: 'band',
            username: ''
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
        axios.get('/auth/me').then((response) => {
            this.setState({
                username: response.data.username
            })
        })
    }

    render() {
        return (
            <div className='page_container'>
                <link rel="stylesheet" media="screen" href="https://fontlibrary.org/face/sani-trixie-sans" type="text/css" />

                <div className='nav_container'>
                    <a href='/' className='site_name'>Find Tabs</a>
                    <a href='/' className='site_name'>My Library</a>
                    <a href={process.env.REACT_APP_LOGIN} className='login'>Login</a>
                    <div>
                        <h3>Welcome home {this.state.username}</h3>
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
                        this.getTabsByBand(this.state.band) : this.getTabsBySong(this.state.song)}>Search</button>

                </div>

                <div className='search_results_container'>
                    <SearchResults />
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { updateTabList })(HomePage);