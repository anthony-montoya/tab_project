import React, { Component } from 'react';
import './Loading.css';

class LoadingScreen extends Component {
    render() {
        return (
            <div class="loading">
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
            </div>
        )

    }
}

export default LoadingScreen;