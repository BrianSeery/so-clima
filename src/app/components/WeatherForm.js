import React from 'react';

const WeatherForm = ({ handleClick }) => (
    <div className='card card-body'>
        <button className='btn btn-success btn-block' onClick={handleClick}>
            Obtener Temperatura
        </button>
    </div>
);

export default WeatherForm;

