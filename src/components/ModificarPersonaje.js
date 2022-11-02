import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Global from './../Global';

export default class ModificarPersonaje extends Component {

    state = {
        series: [],
        statusSeries: false,
        personajes: [],
        statusPersonajes: false,
        serie: null, 
        personaje: null,
        correcto: false
    }

    selectSerie = React.createRef();
    selectPersonaje = React.createRef();

    loadSeries = () => {
        var request = Global.url + "api/series";

        axios.get(request).then(response => {
            this.setState({
                series: response.data,
                statusSeries: true,
            })
        });
    }

    loadPersonajes = () => {
        var request = Global.url + "api/personajes";

        axios.get(request).then(response => {
            this.setState({
                personajes: response.data,
                statusPersonajes: true,
            })
        });
    }

    changeSerie = () => {
        var request = Global.url + "api/series/" + this.selectSerie.current.value;

        axios.get(request).then(response => {
            this.setState({
                serie: response.data,
                statusSeries: true
            })
        });
    }

    changePersonaje = () => {
        var request = Global.url + "api/personajes/" + this.selectPersonaje.current.value;

        axios.get(request).then(response => {
            this.setState({
                personaje: response.data,
                statusPersonajes: true
            })
        });
    }

    componentDidMount = () => {
        this.loadSeries();
        this.loadPersonajes();
    }

    modificarPersonaje = (e) => {
        e.preventDefault();

        var request = Global.url + "api/Personajes/"

        var personaje = {
            idPersonaje: this.state.personaje.idPersonaje,
            nombre: this.state.personaje.nombre,
            imagen: this.state.personaje.imagen,
            idSerie: parseInt(this.state.serie.idSerie)
        }

        console.log(personaje)

        axios.put(request, personaje).then(response => {
            this.setState({
                correcto: true
            })
        })
    }

    render() {

        if(this.state.correcto){
            return (<Navigate to={"/personajes/" + this.state.serie.idSerie}/>)
        }

        return (
            <div className='container'>
                <h1 className='mt-3'>Modificar personaje</h1>
                <form onSubmit={this.modificarPersonaje}>
                    <div className='mt-3'>
                        <label>Seleciona una serie</label>
                        <select className="form-select" ref={this.selectSerie} onChange={this.changeSerie}>
                            {
                                this.state.statusSeries&&
                                this.state.series.map((serie, index) => {
                                    return (<option value={serie.idSerie} key={index+ "/serie"}>{serie.nombre}</option>)
                                })
                            }
                        </select>
                    </div>
                    <div className='mt-3'>
                        <label>Seleciona un personaje</label>
                        <select className="form-select" ref={this.selectPersonaje} onChange={this.changePersonaje}>
                            {
                                this.state.statusPersonajes&&
                                this.state.personajes.map((personaje, index) => {
                                    return (<option value={personaje.idPersonaje} key={index+ "/personaje"}>{personaje.nombre}</option>)
                                })
                            }
                        </select>
                    </div>
                    <button className='btn btn-success mt-3'>Modificar personaje</button>
                </form>
                <hr/>
                {
                    this.state.serie != null&&
                    <div>
                        <h1 style={{color: "red"}}>{this.state.serie.nombre}</h1>
                        <img src={this.state.serie.imagen} alt="imagen"/>
                    </div>
                }

                {
                    this.state.personaje != null&&
                    <div>
                        <h1 style={{color: "blue"}}>{this.state.personaje.nombre}</h1>
                        <img src={this.state.personaje.imagen} alt="imagen"/>
                    </div>
                }
            </div>
        )
    }
}
