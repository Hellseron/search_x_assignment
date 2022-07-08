
import styled from "styled-components"
import {Routes, Route} from 'react-router-dom';
import "./index.css"
import ResultsPage from "./pages/results_page";
import HomePage from "./pages/home_page";

function App() {
    return (
        <AppWrapper>
            <Routes>
                <Route path="*" element={<HomePage/>}/>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/results/:searchtext" element={<ResultsPage/>}/>
            </Routes>
        </AppWrapper>
    )
}

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px;

`

export default App
