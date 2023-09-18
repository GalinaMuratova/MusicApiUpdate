import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './index.css';
import Register from './features/users/Register';
import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Artists from './features/artists/Artists';
import Albums from './features/albums/Albums';
import Tracks from './features/tracks/Tracks';
import Login from './features/users/Login';
import TracksHistory from './features/tracksHistory/TracksHistory';

const App = () => {
  return (
    <>
      <CssBaseline/>
        <header>
          <AppToolbar />
        </header>
        <main>
          <Container>
            <Routes>
              <Route path='/' element={(<Artists />)}/>
              <Route path='/albums/:id' element={(<Albums/>)}/>
              <Route path='/tracks/:id' element={(<Tracks />)} />
              <Route path='/register' element={(<Register />)} />
              <Route path='/login' element={<Login/>} />
              <Route path='/track_history' element={(<TracksHistory />)} />
            </Routes>
          </Container>
        </main>
    </>
  );
}

export default App;
