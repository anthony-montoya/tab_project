import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearTabContent } from '../../ducks/reducer';
import './TabResults.css';

class TabResults extends Component {

    add(tabId) {
        const config = { tabId: tabId }

        axios.post('/api/addFavoriteTab', config).then(res => {
            alert(res.data);
        })

    }

    render() {
        console.log("THIS IS IMPORTANT", this.props.tabContent);
        return (
            <div className='page_container'>
                <link rel="stylesheet" media="screen" href="https://fontlibrary.org/face/sani-trixie-sans" type="text/css" />

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
    }
}

export default connect(mapStateToProps, { clearTabContent })(TabResults);