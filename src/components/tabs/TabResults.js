import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './TabResults.css';

class TabResults extends Component {

    add(tabId) {
        const config = {tabId: tabId}

        axios.post('/api/addFavoriteTab', config).then(res => {
            alert(res.data);
        })

    }

    render() {
        console.log('THIS IS TABCONTENT ', this.props.tabContent);
        return (
            <div className='page_container'>
                <link rel="stylesheet" media="screen" href="https://fontlibrary.org/face/sani-trixie-sans" type="text/css" />

                <div className='nav_container'>
                    <a href='/' className='site_name'>TabSlam</a>
                    <a href={process.env.REACT_APP_LOGIN} className='login'>Login</a>
                </div>
                <div className='search_results_container'>
                    <pre>
                        <div className='tab_information_header'>
                        <button onClick={ () => this.add(this.props.tabId)}>Add tab to Favorites</button>
                        <br />
                        {this.props.tabContent}
                        </div>
                    </pre>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tabContent: state.tabContent,
        tabId: state.tabId
    }
}

export default connect(mapStateToProps)(TabResults);