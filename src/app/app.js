/*const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan("dev"));

app.use(require('./routes/index'));

module.exports = app;*/

import React, {Component} from 'react';
import WeatherInfo from './components/WeatherInfo';
import WeatherForm from './components/WeatherForm';
import {WEATHER_KEY} from './keys';

class App extends Component {

    state = {
        temperature: '',
        error: null
    }

    getWeather = async e => {
        e.preventDefault();
        const {city, country} = e.target.elements;
        const cityValue = city.value;
        const countryValue = country.value;
        if (cityValue != 'CABA' ){
        var Lat = 51.50354;
        var Lon = -0.12768;
       }else{
           var Lat =  -34.6083;
           var Lon =  -58.3712;
       }
        const API_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&appid=${WEATHER_KEY}&units=metric`;
        const response = await fetch(API_URL);
        const data = await response.json();
        this.setState({
            temperature: data.main.temp,
            error: null
        })

    }
    
    
    render() {
        return (
            <div className ="containerp-4">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <WeatherForm getWeather={this.getWeather}/>
                        <WeatherInfo {...this.state}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;