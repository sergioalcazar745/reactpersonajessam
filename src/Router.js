import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu/Menu';
import Serie from './components/Serie';
import ModificarPersonaje from './components/ModificarPersonaje';
import NuevoPersonaje from './components/NuevoPersonaje';
import Personajes from './components/Personajes';

export default class Router extends Component {
    render() {

        function GetParamSerie(){
            const {id} = useParams();
            return <Serie id={id}/>
        }

        function GetParamPersonaje(){
            const {id} = useParams();
            return <Personajes id={id}/>
        }

        return (
            <BrowserRouter>
            <Menu/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/nuevo' element={<NuevoPersonaje/>}/>
                    <Route path='/modificar' element={<ModificarPersonaje/>}/>
                    <Route path='/serie/:id' element={<GetParamSerie/>}/>
                    <Route path='/personajes/:id' element={<GetParamPersonaje/>}/>
                </Routes>
            </BrowserRouter>
        )
    }
}
