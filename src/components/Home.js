import React, { Component } from 'react';
import portada from './../assets/images/portada.jpg'

export default class home extends Component {
    render() {
        return (
            <div className='container'>
                <img src={portada} alt='portada' id='portada'/>
            </div>
        )
    }
}
