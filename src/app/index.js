import React from 'react';
import {render} from 'react-dom';

import App from './app';
import './index.css';

//const app = require("./app");
//const morgan = require("morgan");
//const PORT = 3000;


render(<App/>, document.getElementById('app'));
/*
async function main() {
    await app.listen(3000);
    console.log("Server is running");
}

main();
*/