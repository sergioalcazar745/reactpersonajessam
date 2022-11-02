import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Global from './../Global';

export default class NuevoPersonaje extends Component {

    state = {
        series: [],
        status: false,
        correcto: false
    }

    selectSerie = React.createRef();
    nombre = React.createRef();
    imagen = React.createRef();

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

    nuevoPersonaje = (e) => {
        e.preventDefault();

        var request = Global.url + "api/Personajes/"

        var personaje = {
            idPersonaje: 0,
            nombre: this.nombre.current.value,
            imagen: this.imagen.current.value,
            idSerie: parseInt(this.selectSerie.current.value)
        }

        axios.post(request, personaje).then(response => {
            this.setState({
                correcto: true
            })
        })
    }

    render() {

        if (this.state.correcto) {
            return (<Navigate to={"/personajes/" + this.selectSerie.current.value}/>)
        }   

        return (
            <div className='container'>
                <h1>Nuevo Personaje</h1>
                <form onSubmit={this.nuevoPersonaje}>
                    <div className='mt-3'>
                        <label className='form-label'>Nombre</label>
                        <input type="text" className='form-control' ref={this.nombre}/>
                    </div>
                    <div className='mt-3'>
                        <label className='form-label'>Imagen</label>
                        <input type="text" className='form-control' ref={this.imagen}/>
                    </div>
                    <div className='mt-3'>
                        <label>Seleciona la serie</label>
                        <select className="form-select" ref={this.selectSerie}>
                            {
                                this.state.status&&
                                this.state.series.map((serie, index) => {
                                    return (<option value={serie.idSerie} key={index}>{serie.nombre}</option>)
                                })
                            }
                        </select>
                    </div>
                    <button className='btn btn-success mt-3'>Crear personaje</button>
                </form>
            </div>
        )
    }
}
