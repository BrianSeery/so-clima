import React from 'react';

const NewWeatherInfo = props => {

    return (
        <div>
            {
                props.error &&
                <div className='alert alert-denger'>
                    <p>{props.error} </p>
                </div>
            }
            {
                props.temperature ? 
                    <div className='card card-body'>
                        <p>
                            Temperatura: {props.temperature} Cº
                        </p>
                    </div>
                : 
                <div className='card card-body'>
                    <p>No request yet</p>
                </div>
            }
        </div>
    )
}

export default NewWeatherInfo;