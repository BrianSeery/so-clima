import React, { Component } from 'react';
<<<<<<< HEAD
import WeatherInfo from './components/WeatherInfo';
import WeatherForm from './components/WeatherForm';
import { WEATHER_KEY } from './keys';
=======
>>>>>>> ee6e2a17513110fef790fff4e3717b561d55d56d
import Map from "./components/GMap";

class App extends Component {

<<<<<<< HEAD
    statee = {
        temperature: '',
        lat: '',
        lon: '',
        error: null
    }

    getWeather = async e => {
        e.preventDefault();
        const { city, country } = e.target.elements;
        const cityValue = city.value;
        const countryValue = country.value;
        if (cityValue != 'CABA') {
            var Lat = 51.50354;
            var Lon = -0.12768;
        } else {
            var Lat = -34.6083;
            var Lon = -58.3712;
        }
        const API_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&appid=${WEATHER_KEY}&units=metric`;
        const response = await fetch(API_URL);
        const data = await response.json();
        this.setStatee({
            temperature: data.main.temp,
            error: null
        })

    }


=======
>>>>>>> ee6e2a17513110fef790fff4e3717b561d55d56d
    render() {
        
        return (
            <div className="containerp-4">
                <div className="row">
                    <div className="col-md-6 mx-auto">
<<<<<<< HEAD
                        <WeatherForm getWeather={this.getWeather} />
                        <WeatherInfo {...this.statee} />
=======
>>>>>>> ee6e2a17513110fef790fff4e3717b561d55d56d
                        <Map
                            {...this.statee}
                            google={this.props.google}
                            center={{ lat: -34.6083, lng: -58.3712 }}
                            height='300px'
                            zoom={15}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default App;