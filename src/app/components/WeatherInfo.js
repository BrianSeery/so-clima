import React from 'react';

const WeatherInfo = ({temperature, standardDeviation, minTemp, maxTemp, ...others}) => {

    return (
        <div>
            {
                others.error &&
                <div className='alert alert-denger'>
                    <p>{props.error} </p>
                </div>
            }
            {
                temperature ? 
                    <div className='card card-body'>
                        <p>
                            Temperatura: {temperature.toFixed(2)} Cº
                        </p>
                    </div>
                : 
                <div className='card card-body'>
                    <p>No se obtuvo ningún dato de temperatura</p>
                </div>
            }
            {
                standardDeviation ? 
                    <div className='card card-body'>
                        <p>
                            Desvío estándar: {standardDeviation.toFixed(4)}
                        </p>
                    </div>
                : 
                <div className='card card-body'>
                    <p>Desvío estándar: N/A</p>
                </div>
            }
            {
                minTemp ? 
                    <div className='card card-body'>
                        <p>
                            Temperatura mínima registrada: {minTemp.toFixed(2)} Cº
                        </p>
                    </div>
                : 
                null
            }
            {
                maxTemp ? 
                    <div className='card card-body'>
                        <p>
                            Temperatura máxima registrada: {maxTemp.toFixed(2)} Cº
                        </p>
                    </div>
                : 
                null
            }
        </div>
    )
}

export default WeatherInfo;