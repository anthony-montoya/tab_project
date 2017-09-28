import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearResults, renderTabResults, getTabId, getTabObject } from '../../ducks/reducer';
import './LoggedInFavorites.css';


class LoggedInFavorites extends Component {

    render() {
        return (
            <div className='page_container'>

                <div className='nav_container'>
                    {
                        this.props.user.hasOwnProperty('username')
                            ?
                            <a href='/#/logged_in_home' className='logged_site_name'>TabSlam</a>
                            :
                            <a href='/' className='site_name'>TabSlam</a>
                    }

                    {
                        this.props.user.hasOwnProperty('username')
                            ?
                            <a href={process.env.REACT_APP_LOGOUT} className='logged_login'>Logout</a>
                            :
                            <a href={process.env.REACT_APP_LOGIN} className='logged_login'>Login</a>
                    }

                </div>
                <section>
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
                </section>
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
        tabObject: state.tabObject
    }
}

export default connect(mapStateToProps)(LoggedInFavorites);