import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserInfo } from '../../ducks/reducer';
import axios from 'axios';
import './Login.css';

const serverURL = process.env.NODE_ENV === 'production' ? 'https://tab-slam-server.herokuapp.com/' : 'http://localhost:3020'

class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            auth_id: '',
            showLoginContainer: false
        }
    }

    handleLogin = () => {
        axios.get(`${serverURL}/api/login/${this.state.username}/${this.state.password}`).then(response => {
            this.setState({
                username: response.data[0].username,
                auth_id: response.data[0].auth_id
            })
            let user = {
                displayName: this.state.username,
                auth_id: this.state.auth_id
            }
            this.props.setUserInfo(user)
        })
    }


    render() {
        if (this.state.showLoginContainer) {
            return (
                <div className='login_container'>
                    <div className='input_container'>
                        <input onChange={(event) => this.setState({ username: event.target.value })} placeholder="username" />
                        <input onChange={(event) => this.setState({ password: event.target.value })} type="password" placeholder="password" />
                    </div>
                    <button onClick={this.handleLogin}>Login/Create</button>
                </div>
            )
        } else {
            return (
                <a onClick={() => this.setState({ showLoginContainer: true })} className='home_login_button'>Login to TabSlam</a>
            )
        }
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { setUserInfo })(Login);