import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Global from '../Global';

export default class Serie extends Component {

    state = {
        serie: {},
        status: false
    }

    loadSerie = () => {
        var request = Global.url + "api/series/" + this.props.id;

        axios.get(request).then(response => {
            this.setState({
                serie: response.data,
                status: true
            })
        });
    }

    componentDidMount = () => {
        this.loadSerie();
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.id != this.props.id){
            this.loadSerie();
        }
    }

    render() {
        return (
            <div className='container'>
                <div className="card">                       
                    {
                        this.state.status&&
                        <div className="card-body">
                            <h5 className="card-title text-center">{this.state.serie.nombre}</h5>
                            <img src={this.state.serie.imagen} style={{width: "300px"}} class="d-block m-auto"/>
                            <p className="card-text text-center">IMDB: {this.state.serie.puntuacion}</p>
                            <NavLink to={"/personajes/" + this.state.serie.idSerie} className='btn btn-success d-block'>Personajes</NavLink>
                        </div>
                    }                            
                </div>
            </div>
        )
    }
}
