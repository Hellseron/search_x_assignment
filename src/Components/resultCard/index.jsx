import React from "react"
import styled from "styled-components"

const ResultCard = ({data}) => {
    return (
        <Wrapper>
            <Title  target="_blank" href={data.link}> {data.title}</Title>
            <Description> {data.description} </Description>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  width: 60%;
`
const Title = styled.a`
  font-size: 25px;
`
const Description = styled.div`
  font-size: 16px;
  color: darkgrey;
  margin-top: 10px;
`

export default ResultCard