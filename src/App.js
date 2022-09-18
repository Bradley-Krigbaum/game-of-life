import React from 'react';
import './css/App.css'

import Game from './components/Game'

class App extends React.Component {

    render() {

        return(
            <>
                <div className="pageContainer">
                    <div className="heading">
                        <h1>GAME OF LIFE</h1>
                    </div>
                    <div className="gameScreen">
                        <Game />
                    </div>
                </div>
            </>
        )
    }
}

export default App;
