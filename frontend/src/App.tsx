import './App.css';

import * as React from 'react';
import styled from 'styled-components';

import DatasetSelectContainer from './components/DatasetSelectContainer';
import ParameterSelectContainer from './components/ParameterSelectContainer';
import SampleSelectContainer from './components/SampleSelectContainer';
import TrainModeSelectContainer from './components/TrainModeSelectContainer';
import logo from './logo.svg';

const Container = styled.div`
   width: 60%;
   margin 0 auto;
   margin-top: 1em;
   display: grid;
   grid-template:
      'mode mode mode' auto
      'dataset sample sample' auto
      'parameter parameter parameter' / 1fr 1fr 1fr;
   grid-column-gap: 1em;
   grid-row-gap: 3em;
`;

class App extends React.Component {
   render() {
      return (
         <div className="App" id="App">
            <header className="App-header">
               <img src={logo} className="App-logo" alt="logo" />
               <h1 className="App-title">Welcome to React</h1>
            </header>
            <Container>
               <TrainModeSelectContainer />
               <DatasetSelectContainer />
               <SampleSelectContainer />
               <ParameterSelectContainer />
            </Container>
         </div>
      );
   }
}

export default App;
