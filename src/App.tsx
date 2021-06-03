import React, {ReactElement} from 'react';
import axios from 'axios'
import './App.css';
import Game from "./components/game";

import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';
const engine = new Styletron();

function AxiosProvider({children}: { children: ReactElement }) {
    axios.defaults.baseURL = 'https://pokeapi.co/api/v2/'

    return children
}

function App() {
    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <AxiosProvider>
                    <div className="App">
                        <Game/>
                    </div>
                </AxiosProvider>
            </BaseProvider>
        </StyletronProvider>
    );
}

export default App;
