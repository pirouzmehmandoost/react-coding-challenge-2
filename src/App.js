import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { TextField } from '@mui/material';
import './App.css';
const baseUrl = 'https://robohash.org/';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Container>
            <RobotList/>
          </Container>
      </header>
    </div>
  );
}

const RobotList = () => {
  const [query, setQuery] = useState('');
  const [queryDict, setQueryDict] = useState({});

  const appendToQueryDict = (event) => {
    console.log('appendToQueryDict', event.timeStamp)
    const newQuery = {
      id: event.timeStamp,
      query: baseUrl + event.target.value
    };

    const newQueryDict = {...queryDict};
    newQueryDict[event.timeStamp] = newQuery;
    setQueryDict(newQueryDict);
  };

  const removeFromQueryDict = (elem) => {
    setQuery('');
    let newQueryDict = {...queryDict}
    delete newQueryDict[elem.target.id]
    setQueryDict(newQueryDict);
  }

  const handleButtonClick = useCallback((elem) => {
    removeFromQueryDict(elem);
  }, [queryDict]);

  const handleTextInput = (event) => {
    setQuery(event.target.value);
    appendToQueryDict(event);

  }

  const renderImage = useCallback(() => {
      return (
        <ItemContainer>
        { 
          Object.values(queryDict).map( elem => {
            console.log('map elem:', elem);
            return (
              <ImageButton onClick = {handleButtonClick} Akey={elem.id}>
                  <img src={baseUrl + elem.query} id={elem.id}/>
              </ImageButton>
            )
          })
        }
        </ItemContainer>
    );
  }, [queryDict]);

  return (
    <Container>
      <TextField 
        input={query}
        label={'Search'}
        onChange = {handleTextInput}
      />
    {
      Object.values(queryDict).length ? 
      renderImage()
      : 
      <></>
    }
    </Container>  
  );
};

export default App;

const Container = styled.div ` 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #77fc03;
`;

const ItemContainer = styled.div ` 
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
`;

const ImageButton = styled.button ` 
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
`;