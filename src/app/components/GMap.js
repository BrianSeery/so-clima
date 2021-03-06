import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import WeatherForm from './WeatherForm';
import WeatherInfo from './WeatherInfo';
import { WEATHER_KEY } from '../Weather';
import { CLIMA_CELL_KEY } from '../ClimaCell';
import { AccuWeather} from '../AccuWeather';

Geocode.setApiKey("AIzaSyB7-xPxXdnAk14Eto8ngIlq_vXsd44vNDQ");
Geocode.enableDebug();

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: props.temperature,
            city: '',
            area: '',
            state: '',
            mapPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            markerPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            temperature: ''
        }
    }
    /**
      * Get the current address from the default map position and set those values in the state
      */
    componentDidMount() {
        Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);
                console.log('city', city, area, state);

                this.setState({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                })
            },
            error => {
                //console.error(error);
            }
        );
    };
    /**
      * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
      *
      * @param nextProps
      * @param nextState
      * @return {boolean}
      */
    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.state.markerPosition.lat !== this.props.center.lat ||
            this.state.address !== nextState.address ||
            this.state.city !== nextState.city ||
            this.state.area !== nextState.area ||
            this.state.state !== nextState.state
        ) {
            return true
        } else if (this.props.center.lat === nextProps.center.lat) {
            return false
        }
    }
    /**
      * Get the city and set the city input value to the one selected
      *
      * @param addressArray
      * @return {string}
      */
    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };
    /**
      * Get the area and set the area input value to the one selected
      *
      * @param addressArray
      * @return {string}
      */
    getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };
    /**
      * Get the address and set the address input value to the one selected
      *
      * @param addressArray
      * @return {string}
      */
    getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };
    /**
      * And function for city,state and address input
      * @param event
      */
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    /**
      * This Event triggers when the marker window is closed
      *
      * @param event
      */
    onInfoWindowClose = (event) => {
    };
    /**
      * When the user types an address in the search box
      * @param place
      */
    onPlaceSelected = (place) => {      //Cuando buscar
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = this.getCity(addressArray),
            area = this.getArea(addressArray),
            state = this.getState(addressArray),
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();
            console.log(lngValue);
            console.log(latValue);
        // Set these values in the state.
        this.setState({
            address: (address) ? address : '',
            area: (area) ? area : '',
            city: (city) ? city : '',
            state: (state) ? state : '',
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
        })
    };
    /**
      * When the marker is dragged you get the lat and long using the functions available from event object.
      * Use geocode to get the address, city, area and state from the lat and lng positions.
      * And then set those values in the state.
      *
      * @param event
      */
    onMarkerDragEnd = (event) => {      //Cuando arrastro
        console.log('event', event);
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng(),
            addressArray = [];
        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);
                this.setState({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : ''
                })
            },
            error => {
                console.error(error);
            }
        );
    };

    getTemperature = async e => {
        e.preventDefault();

        //Consulta ClimaCell
        const ClimaCell_URL = `https://api.climacell.co/v3/weather/nowcast?lat=${this.state.markerPosition.lat}&lon=${this.state.markerPosition.lng}&unit_system=si&timestep=5&start_time=now&fields=temp&apikey=${CLIMA_CELL_KEY}`;
        const res = await fetch(ClimaCell_URL);
        const info = await res.json();
        var lista = [];
        info.forEach(element => {   //armo lista de temperaturas
            //console.log(element.temp.value);
            lista.push(element.temp.value);
        });

        //Consulta OpenWeatherMap
        const OpenWeatherMap_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${this.state.markerPosition.lat}&lon=${this.state.markerPosition.lng}&appid=${WEATHER_KEY}&units=metric`;
        const response = await fetch(OpenWeatherMap_URL);
        const data = await response.json();
        console.log(data.main.temp);
        lista.push(data.main.temp);

        //Consulta AccuWeather para el ID
        const AccuWeather_URL = `http://dataservice.accuweather.com/locatiosns/v1/cities/geoposition/search?apikey=${AccuWeather}&q=${this.state.markerPosition.lat},${this.state.markerPosition.lng}`;
        const Accu = await fetch(AccuWeather_URL);
        const accuValue = await Accu.json();
        console.log(accuValue.Key);
        
        //Consulta AccuWeather para la temperatura
        const AccuWeather_URL_Temp = `http://dataservice.accuweather.com/currentconditions/v1/${accuValue.Key}?apikey=${AccuWeather}`;
        const AccuTemp = await fetch(AccuWeather_URL_Temp);
        const accuValueTemp = await AccuTemp.json();
        var accuWeatherTemperatura = accuValueTemp[0].Temperature.Metric.Value;
        lista.push(accuWeatherTemperatura);

        //Promedios
        let sum = lista.reduce((previous, current) => current += previous);
        let avg = sum / lista.length;
        
        //Envio el promedio de todos los sensores a renderizar
        this.setState({
            temperature: avg.toFixed(1),
        })
    }

    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap google={this.props.google}
                        defaultZoom={this.props.zoom}
                        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                    >
                        {/* For Auto complete Search Box */}
                        <Autocomplete
                            style={{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '2px',
                                marginBottom: '100px'
                            }}
                            onPlaceSelected={this.onPlaceSelected}
                            types={['(regions)']}
                        />
                        {/*Marker*/}
                        <Marker google={this.props.google}
                            name={'Dolores park'}
                            draggable={true}
                            onDragEnd={this.onMarkerDragEnd}
                            position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                        />
                        <Marker />
                        {/* InfoWindow on top of marker */}
                        <InfoWindow
                            onClose={this.onInfoWindowClose}
                            position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
                        >
                            <div>
                                <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
                            </div>
                        </InfoWindow>
                    </GoogleMap>
                )
            )
        );
        let map;
        if (this.props.center.lat !== undefined) {
            map = <div>
                <div>
                    <div className="form-group">
                        <label htmlFor="">Ciudad</label>
                        <input type="text" name="address" className="form-control" onChange={this.onChange} readOnly="readOnly" value={this.state.address} />
                    </div>
                </div>
                <div>
                    <WeatherForm handleClick={this.getTemperature} />
                    <WeatherInfo {...this.state} />
                </div>
                <AsyncMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB7-xPxXdnAk14Eto8ngIlq_vXsd44vNDQ&libraries=places"
                    loadingElement={
                        <div style={{ height: `100%` }} />
                    }
                    containerElement={
                        <div style={{ height: this.props.height }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                />
            </div>
        } else {
            map = (
                <div style={{ height: this.props.height }}>
                    <WeatherInfo temperature={this.state.temperature} />
                </div>
            )
            
        }
        return (map)
    }
}
export default Map