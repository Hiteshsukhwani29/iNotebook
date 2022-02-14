import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import About from './components/about/About';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert type="success" alert_title="Note name" alert_desc="deleted successfully"/>
        <div className='App'>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/about'>
              <About />
            </Route>
          </Switch>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
