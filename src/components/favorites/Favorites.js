import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Favorites.css';
import backArrowLogo from '../../backArrow.png';

class Favorites extends Component {
    constructor() {
        super();

        this.state = {
            userFavorites: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3020/api/getFavorites/' + this.props.user.user_id)
            .then(response => {
                console.log('res ', response);
                this.setState({
                    userFavorites: response.data
                })
            })
    }

    render() {
        let favoritesList = this.state.userFavorites.map((favorites, i) => {
            return <div className='tab_content' key={i}>

                <section>
                    <h1>{favorites.artist}</h1>
                </section>

                <section>
                    <h1>{favorites.name}</h1>
                </section>

                <section>
                    <h1>{favorites.tab_type}</h1>
                </section>

                <section>
                    <h1>{favorites.difficulty}</h1>
                </section>
            </div>
        })
        return (
            <div className='search_page_container'>

                <div className='search_nav_container'>
                    {
                        this.props.user.hasOwnProperty('username')
                            ?
                            <a href='/#/logged_in_home'>TabSlam</a>
                            :
                            <a href='/'>TabSlam</a>
                    }

                    {
                        this.props.user.hasOwnProperty('username')
                            ?
                            <a href={process.env.REACT_APP_LOGOUT}>Logout</a>
                            :
                            <a href={process.env.REACT_APP_LOGIN}>Login</a>
                    }

                </div>

                <div className='search_results_container'>
                    <div className='search_container_header'>
                        <section className='search_header_buttons'>

                            <Link to='/'>
                                <img src={backArrowLogo}/>
                            </Link>

                            <section className='search_container_resultText'>
                                <h1>My Favorite Tabs</h1>
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
                        {favoritesList}
                    </section>
                </div>

            </div>
            // <div className='favorites_page_container'>

            //     <div className='favorites_nav_container'>

            //         <a href='/'>TabSlam</a>
            //         {
            //             this.props.user.hasOwnProperty('username')
            //                 ?
            //                 <a href={process.env.REACT_APP_LOGOUT}>Logout</a>
            //                 :
            //                 <a href={process.env.REACT_APP_LOGIN}>Login</a>
            //         }

            //     </div>
            //     <section>
            //         <div className='favorites_header'>

            //             <section>
            //                 <h1>Artist</h1>
            //             </section>

            //             <section>
            //                 <h1>Song</h1>
            //             </section>

            //             <section>
            //                 <h1>Tab Type</h1>
            //             </section>

            //             <section>
            //                 <h1>Difficulty</h1>
            //             </section>

            //         </div>
            //     </section>
            //     {favoritesList}
            // </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Favorites);