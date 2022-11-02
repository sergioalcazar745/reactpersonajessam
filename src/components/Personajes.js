import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from '../Global'

export default class Personajes extends Component {

    state = {
        personajes: [],
        status: false
    }

    loadPersonajes = () => {
        var request = Global.url + "api/Series/PersonajesSerie/" + this.props.id;

        axios.get(request).then(response => {
            this.setState({
                personajes: response.data,
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.loadPersonajes();
    }

    render() {
        return (
            <div className='container'>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Personaje</th>
                            <th scope="col">Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.status&&
                            this.state.personajes.map((personaje, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{personaje.nombre}</td>
                                        <td><img src={personaje.imagen} alt='imagen'/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <NavLink to={"/serie/" + this.props.id } className={"btn btn-danger"}>Volver</NavLink>
            </div>
        )
    }
}
