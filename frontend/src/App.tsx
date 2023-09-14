import React from 'react';
import HomePage from './containers/HomePage/HomePage';
import { Route, Routes } from 'react-router-dom';
import OneArtistPage from './containers/OneArtistPage/OneArtistPage';
import './index.css';

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={(<HomePage />)}/>
      <Route path='/albums/:id' element={(<OneArtistPage/>)}/>
    </Routes>
    </>
  );
}

export default App;
