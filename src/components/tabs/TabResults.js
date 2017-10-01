import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearTabContent, getTabObject } from '../../ducks/reducer';
import './TabResults.css';
import backArrowLogo from '../../backArrow.png';

class TabResults extends Component {

    add(tabId) {
        const config = { tabId: tabId, userId: this.props.user.user_id }

        axios.post('/api/addFavoriteTab', config).then(res => {
            alert(res.data);
        })
    }

    render() {
        return (
            <div className='tab_page_container'>

                <div className='tab_nav_container'>

                    <a href='/'>TabSlam</a>

                    {
                        this.props.user.hasOwnProperty('username')
                            ?
                            <a href={process.env.REACT_APP_LOGOUT}>Logout</a>
                            :
                            <a href={process.env.REACT_APP_LOGIN}>Login</a>
                    }

                </div>

                <div className='tab_results_container'>
                    <div className='tab_information_header'>

                        <section>
                            <Link to='/search-results'>
                                <img src={backArrowLogo} onClick={() => this.props.clearTabContent()} />
                            </Link>
                        </section>

                        <section>
                            <h3>{this.props.tabObject.name + ' Tab'}</h3>
                            <h4>{'By: ' + this.props.tabObject.artist}</h4>
                        </section>

                        <section>
                            {
                                this.props.tabObject.difficulty === ''
                                    ?
                                    <h3>{'Tab Difficulty: ' + this.props.tabObject.difficulty}</h3>
                                    :
                                    <h3>Tab Difficulty: ---</h3>

                            }
                        </section>

                        <section>
                            {
                                this.props.tabObject.rating
                                    ?
                                    <h3>{'Tab Rating: ' + this.props.tabObject.rating + '/5'}</h3>
                                    :
                                    <h3>Tab Rating: ---</h3>

                            }
                        </section>

                        <section>
                            {
                                this.props.tabObject.tab_rates
                                    ?
                                    <h3>{'Tab Votes: ' + this.props.tabObject.tab_rates}</h3>
                                    :
                                    <h3>Tab Votes: ---</h3>

                            }
                        </section>

                        <section>
                            <i onClick={() => this.add(this.props.tabId)} className="fa fa-heart-o fa-2x" aria-hidden="true"></i>
                        </section>

                    </div>

                    <div className='tab_selected_content'>
                        <pre>
                            {this.props.tabContent}
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
        tabObject: state.tabObject
    }
}

export default connect(mapStateToProps, { clearTabContent, getTabObject })(TabResults);