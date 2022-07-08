import React, {useState, useEffect, useCallback, useRef} from "react"
import styled from "styled-components"
import SearchList from "../searchList";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addNewSearch} from "../../slices/search";

const AutoCompleteComponent = ({data, initialSearchText}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const input= useRef(null)
    const outer = useRef(null)
    const [searchText, setSearchText] = useState(initialSearchText || '')
    const [active, setActive] = useState(-1);
    const [filteredData, setFilteredData] = useState([])
    const [filteredRecentRequests, setFilteredRecentRequests] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const recentRequests = useSelector((state)=>state.searchSlice.recentRequests)

    const onFocusLost=(e)=>{
        setIsOpen(false)
        setActive(-1)
    }

    useEffect(()=>{
        document.addEventListener("mousedown", (e)=>{
            outer.current.contains(e.target) || onFocusLost();
        })
    },[])

    useEffect(()=>{
        const filteredRecent = recentRequests.filter((item) => item.toLowerCase().includes(searchText.toLowerCase()))
        setFilteredRecentRequests(filteredRecent)
    }, [recentRequests])


    const onChange = useCallback((e) => {
        setSearchText(e.target.value)
        const filtered = data.filter((item) => item.toLowerCase().includes(e.target.value.toLowerCase()))
        const filteredRecent = recentRequests.filter((item) => item.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredData(filtered)
        setFilteredRecentRequests(filteredRecent)
        setIsOpen(true)
    },[recentRequests, data])

    const resetInputText = () => {
        setSearchText("")
        setActive(-1)
        setIsOpen(true)
        setFilteredRecentRequests(recentRequests)
        input.current.focus()

    }

    const onItemClick = useCallback((e, url) => {
        setActive(-1);
        setIsOpen(false);
        setSearchText(url)
        dispatch(addNewSearch(url))
        navigate(`/results/` + url)

    },[])

    const onInputClick=useCallback(()=>{
        setIsOpen(true)}, [])


    const onKeyDown = e => {
        if (e.keyCode === 13) { // enter key
            const activeItem= [...filteredRecentRequests,...filteredData][active]
            if(active>=0){
                dispatch(addNewSearch(activeItem))
                onItemClick(e,activeItem)
            }else{
                dispatch(addNewSearch(e.target.value))
                onItemClick(e, e.target.value)
            }
            setActive(-1);
            setIsOpen(false);
        }
        else if (e.keyCode === 38) { // up arrow
            active !== 0 && setActive(active - 1)
        }
        else if (e.keyCode === 40) { // down arrow
            active !== 9 && setActive(active + 1);

        }
    }




    return (
        <Wrapper ref={outer}>
                <StyledInput ref={input} value={searchText} type="text" autoFocus
                             onChange={onChange}
                             onClick={onInputClick}
                             onKeyDown={onKeyDown}/>

                <SearchList isOpen={isOpen} onItemClick={onItemClick} searchText={searchText}
                            filteredData={filteredData} recentRequests={recentRequests}
                            filteredRecentRequests={filteredRecentRequests} active={active}/>
                <StyledCross onClick={resetInputText} src="https://img.icons8.com/ios/25/multiply--v1.png"/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  margin: 0 auto;
  min-width: 600px;
  width: content-box;
  position: relative;
  &:before{
    content: url("https://img.icons8.com/ios/25/search--v1.png");
    display: inline-block;
    position: absolute;
    top: 15px;
    left:15px;
    bottom:0;
    width: 15px;
    height: 15px;
  }
  
`

const StyledInput = styled.input`
  border-radius: 10px;
  padding: 2% 2% 2% 7%;
  width: 91%;
  font-size: 22px;
`
const StyledCross = styled.img`
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
`
export default AutoCompleteComponent