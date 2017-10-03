import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearResults, renderTabResults, getTabId, getTabObject, setFavoritesStatus, getFavorites } from '../../ducks/reducer';
import './SearchResults.css';
import LoadingScreen from '../loading/LoadingScreen';
import backArrowLogo from '../../backArrow.png';
import SearchBar from '../search_bar/SearchBar';

class SearchResults extends Component {
    //THIS CURRENTLY HAS THE URL FOR THE TAB THE USER WANTS
    getContentText(tabObj) {
        var tabUrl = tabObj.url;
        var tabDifficulty = tabObj.difficulty;

        axios.get(`http://localhost:3020/api/tabContent?tabUrl=${tabUrl}&tabDifficulty=${tabDifficulty}`)
            .then((response) => {
                if (response.data.tab_content) {
                    this.props.getTabObject(response.data);
                    this.props.renderTabResults(response.data.tab_content);
                    this.props.getTabId(response.data.tab_id);
                }
                else {
                    this.props.renderTabResults(response.data[0].tab_content);
                    this.props.getTabObject(response.data[0]);
                }
            })
    }

    componentDidMount() {
        this.props.setFavoritesStatus(false);
        if (this.props.user.hasOwnProperty('username')) {
            console.log(this.props.user.user_id)
            axios.get('http://localhost:3020/api/getFavorites/' + this.props.user.user_id)
                .then(response => {
                    this.props.getFavorites(response.data)
                })
        }
    }

    render() {
        let filteredTabList = this.props.tabList.map((tab, i) => {
            if (!tab.type.includes('pro') && !tab.type.includes('official')) {
                return <div className='tab_content' key={i}>

                    <section className='tab_artistContainer'>
                        <h1>{tab.artist}</h1>
                    </section>

                    <section className='tab_songContainer'>
                        <Link to='/tab-results'>
                            <h1 onClick={() => this.getContentText(this.props.tabList[i])}>{tab.name}</h1>
                        </Link>
                    </section>

                    <section className='tab_typeContainer'>
                        <h1>{tab.type}</h1>
                    </section>

                    <section className='tab_difficultyContainer'>
                        {
                            tab.difficulty
                                ?
                                <h1>{tab.difficulty}</h1>
                                :
                                <h1>-----</h1>
                        }
                    </section>

                </div>
            }
        })

        return (
            <div className='search_page_container'>

                <div className='search_nav_container'>
                    {
                        this.props.user.hasOwnProperty('username')
                            ?
                            <a href='/'>TabSlam</a>
                            :
                            <a href='/'>TabSlam</a>
                    }

                    {
                        this.props.user.hasOwnProperty('username')
                            ?
                            <div className='favorite_nav'>
                                <Link to='/my-favorites'>
                                    <h1>My Favorites</h1>
                                </Link>
                                <a href={process.env.REACT_APP_LOGOUT}>Logout</a>
                            </div>
                            :
                            <a href={process.env.REACT_APP_LOGIN}>Login</a>
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

                                    <Link to='/'>
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

                                    <section>
                                        <h1>Difficulty</h1>
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