import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearTabContent, getTabObject, getFavorites } from '../../ducks/reducer';
import './TabResults.css';
import backArrowLogo from '../../backArrow.png';

class TabResults extends Component {

    add(tabId) {
        const config = { tabId: this.props.tabObject.url, userId: this.props.user.user_id }

        axios.post('https://tab-slam-server.herokuapp.com/api/addFavoriteTab', config).then(res => {
            if (this.props.user.hasOwnProperty('displayName')) {
                axios.get('https://tab-slam-server.herokuapp.com/api/getFavorites/' + this.props.user.user_id)
                    .then(response => {
                        this.props.getFavorites(response.data)
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
        let tabID;
        let isFavorite = false

        if (this.props.tabId === '') {
            tabID = this.props.tabObject.url
        } else {
            tabID = this.props.tabObject.url
        }
        
        for (var i = 0; i < this.props.userFavorites.length; i++) {
            if (this.props.userFavorites[i].url === tabID) {
                isFavorite = true;
                break;
            }
        }

        return (
            <div className='tab_page_container'>

                <div className='tab_nav_container'>

                    <a href='/home'>TabSlam</a>

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
                            <a href={process.env.REACT_APP_LOGIN}>Login</a>
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

                        {/* <section>
                            {
                                this.props.tabObject.difficulty === 'undefined'
                                    ?
                                    <h3>Tab Difficulty: ---</h3>
                                    :
                                    <h3>{'Tab Difficulty: ' + this.props.tabObject.difficulty}</h3>
                            }
                        </section> */}

                        <section>
                            {
                                // this.props.tabObject.rating 
                                // &&
                                // <h3>{'Tab Rating: ' + this.props.tabObject.rating.toFixed(1) + '/5'}</h3>
                                this.props.tabObject.rating === 0
                                    ?
                                    <h3></h3>
                                    :
                                    <h3>{'Tab Rating: ' + this.props.tabObject.rating + '/5'}</h3>
                            }
                        </section>

                        <section>
                            {
                                this.props.tabObject.tab_rates === 0
                                    ?
                                    <h3></h3>
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
                                    <i className="fa fa-heart fa-2x" aria-hidden="true"></i>
                                    :
                                    <i onClick={() => this.updateFavoriteIcon(this.props.tabObject.url)} className="fa fa-heart-o fa-2x" aria-hidden="true"></i>
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