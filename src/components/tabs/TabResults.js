import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearTabContent, getTabObject, getFavorites } from '../../ducks/reducer';
import AppLogin from '../login/AppLogin';
import './TabResults.css';
import backArrowLogo from '../../backArrow.png';

const serverURL = process.env.NODE_ENV === 'production' ? 'https://tab-slam-server.herokuapp.com' : 'http://localhost:3020'

class TabResults extends Component {
    add(tabId) {
        const config = { tabId: this.props.tabObject.url, authId: this.props.user.auth_id }

        axios.post(`${serverURL}/api/addFavoriteTab`, config).then(res => {
            if (this.props.user.hasOwnProperty('displayName')) {
                axios.get(`${serverURL}/api/getFavorites/${this.props.user.auth_id}`)
                    .then(res => {
                        this.props.getFavorites(res.data)
                    })
            }
            alert(res.data);
        })
    }

    updateFavoriteIcon(tabId) {
        if (!this.props.user.hasOwnProperty('displayName')) {
            alert('Please log in to favorite a tab!');
        } else {
            this.add(tabId);
        }
    }

    render() {
        let tabID = this.props.tabObject.url
        let isFavorite = false;

        for (var i = 0; i < this.props.userFavorites.length; i++) {
            if (this.props.userFavorites[i].url === tabID) {
                isFavorite = true;
                break;
            }
        }

        return (
            <div className='tab_page_container'>

                <div className='tab_nav_container'>

                    <Link to='/home'>
                        <h1>TabSlam</h1>
                    </Link>

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

                <div className='tab_results_container'>
                    <div className='tab_information_header'>

                        <section>
                            {
                                this.props.isFromFavorites
                                    ?
                                    <Link to='/my-favorites'>
                                        <img src={backArrowLogo} alt='' onClick={() => this.props.clearTabContent()} />
                                    </Link>
                                    :
                                    <Link to='/search-results'>
                                        <img src={backArrowLogo} alt='' onClick={() => this.props.clearTabContent()} />
                                    </Link>
                            }
                        </section>

                        <section>
                            <h3>{this.props.tabObject.name + ' Tab'}</h3>
                            <h4>{'By: ' + this.props.tabObject.artist}</h4>
                        </section>

                        <section>
                            {
                                this.props.tabObject.rating === 0
                                    ?
                                    null
                                    :
                                    <h3>{'Tab Rating: ' + this.props.tabObject.rating + '/5'}</h3>
                            }
                        </section>

                        <section>
                            {
                                this.props.tabObject.tab_rates === 0
                                    ?
                                    null
                                    :
                                    <h3>{'Tab Votes: ' + this.props.tabObject.tab_rates}</h3>
                            }
                        </section>

                        <section>
                            {
                                this.props.tabObject.difficulty
                                &&
                                <h3>{'Tab Difficulty: ' + this.props.tabObject.difficulty}</h3>
                            }
                        </section>

                        <section>
                            {
                                isFavorite
                                    ?
                                    <i className="fa fa-heart fa-2x" aria-hidden="false"></i>
                                    :
                                    <i onClick={(event) => { this.updateFavoriteIcon(this.props.tabObject.url) }} className="fa fa-heart-o fa-2x" aria-hidden="true"></i>
                            }

                        </section>

                    </div>

                    <div className='tab_selected_content'>
                        <pre>
                            {
                                this.props.tabObject.content
                                    ?
                                    this.props.tabObject.content
                                    :
                                    this.props.tabContent
                            }
                        </pre>
                    </div>
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
        tabObject: state.tabObject,
        isFromFavorites: state.isFromFavorites,
        userFavorites: state.userFavorites
    }
}

export default connect(mapStateToProps, { clearTabContent, getTabObject, getFavorites })(TabResults);