import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearResults, renderTabResults, getTabId, getTabObject, setFavoritesStatus, getFavorites } from '../../ducks/reducer';
import './SearchResults.css';
import AppLogin from '../login/AppLogin';
import LoadingScreen from '../loading/LoadingScreen';
import backArrowLogo from '../../backArrow.png';
import SearchBar from '../search_bar/SearchBar';

const serverURL = process.env.NODE_ENV === 'production' ? 'https://tab-slam-server.herokuapp.com' : 'http://localhost:3020'

class SearchResults extends Component {
    //THIS CURRENTLY HAS THE URL FOR THE TAB THE USER WANTS
    getContentText(tabObj) {
        let tabUrl = tabObj.url;

        axios.get(`${serverURL}/api/tabContent?tabUrl=${tabUrl}`)
            .then((response) => {
                response.data.url = tabUrl;
                if (response.data.content) {
                    this.props.getTabObject(response.data);
                    this.props.renderTabResults(response.data.content);
                    this.props.getTabId(response.data.tab_id);
                }
                else {
                    this.props.renderTabResults(response.data[0].content);
                    this.props.getTabObject(response.data[0]);
                }
            })
    }

    componentDidMount() {
        this.props.setFavoritesStatus(false);
        if (this.props.user.hasOwnProperty('displayName')) {
            axios.get(`${serverURL}/api/getFavorites/${this.props.user.auth_id}`)
                .then(response => {
                    this.props.getFavorites(response.data)
                })
        }
    }

    render() {
        let filteredTabList = this.props.tabList.map((tab, i) => {
            return <div className='tab_content' key={i}>

                <section className='tab_artistContainer'>
                    <h1>{tab.artist}</h1>
                </section>

                <section className='tab_songContainer'>
                    <Link to={{ pathname: '/tab-results', tabUrl: tab.url }}>
                        <h1 onClick={() => this.getContentText(this.props.tabList[i])}>{tab.name}</h1>
                    </Link>
                </section>

                <section className='tab_typeContainer'>
                    <h1>{tab.type}</h1>
                </section>

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
                            <div className='favorite_nav'>
                                <Link to='/my-favorites'>
                                    <h1>My Favorites</h1>
                                </Link>
                                <a href={process.env.REACT_APP_LOGOUT}>Logout</a>
                            </div>
                            :
                            <AppLogin />
                    }

                </div>

                {
                    this.props.isLoading
                        ?
                        <LoadingScreen />
                        :
                        <div className='search_bar'>
                            <SearchBar />
                            <div className='search_results_container'>
                                <div className='search_container_header'>
                                    <section className='search_header_buttons'>

                                        <Link to='/home'>
                                            <img src={backArrowLogo} alt='' onClick={() => this.props.clearResults()} />
                                        </Link>

                                        <section className='search_container_resultText'>
                                            <h1>Results for: {this.props.userSearch}</h1>
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
                                    {filteredTabList}
                                </section>
                            </div>
                        </div>
                } {/* End of turnary*/}

            </div >
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

export default connect(mapStateToProps, { clearResults, renderTabResults, getTabId, getTabObject, setFavoritesStatus, getFavorites })(SearchResults);