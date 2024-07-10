import React from 'react';
import Phonebook from './Phonebook/Phonebook';

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        padding: 50 ,
        justifyContent:'center',
        fontSize: 20,
        color: '#010101',
       
      }}
    >
      <header>
        <h1>AEM React homework template</h1>
      </header>
      <main>
        <Phonebook />
      </main>
    </div>
  );
};
