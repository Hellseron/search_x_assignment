import React, {useEffect, useState} from "react";
import styled from "styled-components"
import {createMockArr} from "../Components/autocomplete/mocks";
import AutoCompleteComponent from "../Components/autocomplete";
import {countries} from "../Components/autocomplete/mocks";
import { useParams } from 'react-router-dom'
import ResultCard from "../Components/resultCard";
import {Link} from "react-router-dom";


const ResultsPage = () => {
    const { searchtext } = useParams()
    const [results, setResults]= useState([])
    const [time, setTime] = useState(0)

    useEffect(()=> {
        const start = Date.now()
        const res = createMockArr().filter(item=> item.title.toLowerCase().includes(searchtext.toLowerCase()))
        setResults(res)
        setTimeout(()=>{
            const time = Date.now()-start
            setTime(time)
        },10)


    }, [searchtext])
    return (

        <Wrapper>
            <Name to="/">SearchX</Name>
            <AutoCompleteContainer>
                <AutoCompleteComponent data={countries} initialSearchText={searchtext}/>
            </AutoCompleteContainer>
            <ResultsAmount>
                {`We found a ${results.length } results in ${time}ms`}
            </ResultsAmount>

            <ResultsContainer>
                {
                    results.map(item=> <ResultCard data={item} key={item.title}/>)
                }
            </ResultsContainer>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  margin-left: 200px;
  position: relative;
`
const Name = styled(Link)`
  position: absolute;
  top: 0;
  z-index: 500;
  font-size: 38px;
  left: -200px;
  text-decoration: none;
`
const ResultsAmount = styled.div`
  color: #70757a;
  font-size: 16px;
  margin-bottom: 20px;
`
const AutoCompleteContainer = styled.div`
  
  width: 400px;
  margin-bottom: 20px;
`

const ResultsContainer= styled.div`
 
`

export default ResultsPage