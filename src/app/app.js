import React, { Component } from 'react';
import Map from "./components/GMap";

class App extends Component {

    render() {
        return (
            <div className="containerp-4">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <Map
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