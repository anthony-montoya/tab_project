import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearTabContent, getTabObject } from '../../ducks/reducer';
import './TabResults.css';

class TabResults extends Component {

    add(tabId) {
        const config = { tabId: tabId }

        axios.post('/api/addFavoriteTab', config).then(res => {
            alert(res.data);
        })

    }

    render() {
        return (
            <div className='page_container'>

                <div className='nav_container'>
                    {
                        this.props.user.hasOwnProperty('username')
                            ?
                            <a href='/#/logged_in_home' className='site_name'>TabSlam</a>
                            :
                            <a href='/' className='site_name'>TabSlam</a>
                    }

                    {
                        this.props.user.hasOwnProperty('username')
                            ?
                            <a href={process.env.REACT_APP_LOGOUT} className='login'>Logout</a>
                            :
                            <a href={process.env.REACT_APP_LOGIN} className='login'>Login</a>
                    }

                </div>
                <div className='search_results_container'>
                    <pre>
                        <div className='tab_information_header'>
                            <div className='tab_content_songInfo'>
                                <h3>{this.props.tabObject.song_name + ' Tab'}</h3>
                                <br />
                                <h4>{'By ' + this.props.tabObject.artist}</h4>
                            </div>

                            <div className='tab_content_difficulty'>
                                <h3>{'Tab Difficulty ' + this.props.tabObject.difficulty}</h3>
                            </div>

                            <div className='tab_content_rating'>
                                <h3>{'Tab Rating ' + this.props.tabObject.rating}</h3>
                            </div>

                            <div className='tab_content_votes'>
                                <h3>{'Tab Votes ' + this.props.tabObject.tab_rates}</h3>
                            </div>
                            <button onClick={() => this.add(this.props.tabId)}>Add tab to Favorites</button>
                            <br />
                            <Link to='/search-results'>
                                <button onClick={() => this.props.clearTabContent()}>Back</button>
                            </Link>
                        </div>
                        {this.props.tabContent}
                    </pre>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tabContent: state.tabContent,
        tabId: state.tabId,
        tabList: state.tabList,
        user: state.user,
        tabObject: state.tabObject
    }
}

export default connect(mapStateToProps, { clearTabContent, getTabObject })(TabResults);