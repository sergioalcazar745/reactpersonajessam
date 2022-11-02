import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../../assets/images/logo.png';
import './Menu.css';
import Global from './../../Global'
import axios from 'axios';

export default class Menu extends Component {

    state = {
        series: [],
        status: false
    }

    loadSeries = () => {
        var request = Global.url + "api/series";

        axios.get(request).then(response => {
            this.setState({
                series: response.data,
                status: true
            })
        });
    }

    componentDidMount = () => {
        this.loadSeries();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <img src={logo} alt='logo'/>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to={"/"} className={"nav-link"}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/nuevo"} className={"nav-link"}>Nuevo Personaje</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/modificar"} className={"nav-link"}>Modificar Personaje</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Series
                                </a>
                                <ul className="dropdown-menu">
                                    {
                                        this.state.status&&
                                        this.state.series.map((serie, index) => {
                                            return (
                                                <li key={index}>
                                                    <NavLink to={"/serie/" + serie.idSerie} className='dropdown-item'>{serie.nombre}</NavLink>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
