import React from "react";
import styled from "styled-components"
import {Link} from "react-router-dom";
import AutoCompleteComponent from "../Components/autocomplete";
import {countries} from "../Components/autocomplete/mocks";


const HomePage = () => {

    return (
        <Wrapper>

            <Header>Welcome to SearchX!</Header>
            <AutoCompleteComponent data={countries}/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const Header = styled.h1`
  margin-top: 100px;
  margin-bottom: 100px;
  text-align: center;
`
export default HomePage