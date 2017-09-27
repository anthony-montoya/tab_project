import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearResults, renderTabResults, getTabId } from '../../ducks/reducer';
import './SearchResults.css';

class SearchResults extends Component {

    //THIS CURRENTLY HAS THE URL FOR THE TAB THE USER WANTS
    getContentText(tabObj) {
        var tabUrl = tabObj.url;
        var tabDifficulty = tabObj.difficulty;

        axios.get(`http://localhost:3020/api/tabContent?tabUrl=${tabUrl}&tabDifficulty=${tabDifficulty}`)
            .then((response) => {
                console.log('response ', response)
                if (response.data.tab_content) {
                    this.props.renderTabResults(response.data.tab_content);
                    this.props.getTabId(response.data.tab_id);
                }
                else
                    this.props.renderTabResults(response.data);
            })
    }

    render() {
        const filteredTabList = this.props.tabList.map((tab, i) => {
            console.log('THIS IS TAB ', tab)
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
                        <h1>{tab.difficulty}</h1>
                    </section>

                </div>
            }
        })
        console.log('USER ', this.props.user);
        return (
            <div className='page_container'>

                <div className='nav_container'>
                    {
                        this.props.user === {}
                            ?
                            <a href='/' className='site_name'>TabSlam</a>
                            :
                            <a href='/#/logged_in_home' className='site_name'>TabSlam</a>
                    }

                    {
                        this.props.user.hasOwnProperty('username')
                            ?
                            <a href={process.env.REACT_APP_LOGOUT} className='login'>Logout</a>
                            :
                            <a href={process.env.REACT_APP_LOGIN} className='login'>Login</a>
                    }

                </div>
                <div className='search_request'>
                    <h1>Results for {

                    }
                    </h1>

                </div>
                <div className='search_results_container'>
                    <div className='search_results_header'>

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

                    </div>

                    <section>
                        {filteredTabList}
                    </section>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tabList: state.tabList,
        tabId: state.tabId,
        user: state.user
    }
}

export default connect(mapStateToProps, { clearResults, renderTabResults, getTabId })(SearchResults);