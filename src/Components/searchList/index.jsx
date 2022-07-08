import React from "react";
import styled from "styled-components"
import {useDispatch, useSelector} from "react-redux";
import {removeItem} from "../../slices/search";


const SearchList = ({onItemClick, isOpen, searchText, filteredData, filteredRecentRequests, active}) => {
    const recentRequests = useSelector((state) => state.searchSlice.recentRequests)
    const dispatch = useDispatch()

    const renderClassName = (index) => {
        if (index < filteredRecentRequests.length) {
            return index === active ? "active fav" : "fav"
        } else {
            return index === active ? "active" : ""
        }
    }
    const handleRemove = (e, item) => {
        e.stopPropagation()
        dispatch(removeItem(item))
    }
    const renderListItems = (data) => {
        return (
            <ResultList>
                {data.slice(0, 10).map((suggestion, index) => {
                    return (
                        <li key={suggestion + index} className={renderClassName(index)}
                            onClick={(e) => onItemClick(e, suggestion)}>
                            {suggestion}
                            {index < filteredRecentRequests.length &&
                                <span onClick={(e) => handleRemove(e, suggestion)}>Remove</span>}
                        </li>
                    );
                })}
            </ResultList>
        )

    }

    {
        if (isOpen && searchText && filteredData.length) {

            return renderListItems([...filteredRecentRequests, ...filteredData])

        } else if (isOpen && searchText) {
            return <></>;
        } else if (isOpen && recentRequests.length > 0 && !searchText) {
            return renderListItems(recentRequests)
        }
    }


}

const ResultList = styled.ul`
  border: 2px solid black;
  border-top-width: 0;
  list-style: none;
  margin-top: 0;
  overflow-y: auto;
  padding-left: 0;
  border-radius: 10px;
  width: 100%;
  position: absolute;
  background-color: #f3e9e9;

  li {
    padding: 8px 8px 8px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 10px;
      color: #6b6969;

      &:hover {
        color: #426ec9;
        text-decoration: underline;
      }
    }


    &:hover {
      background-color: #b7bbbb;
      cursor: pointer;
      font-weight: 700;
    }
  }

  .active {
    background-color: #d3d5d5;
    cursor: pointer;
    font-weight: 700;
    z-index: 10000;
  }

  .fav {
    color: #b95de0;
    font-weight: bold;
    position: relative;

    &:before {
      content: url("https://img.icons8.com/windows/20/clock--v1.png");
      display: inline-block;
      position: absolute;
      top: 10px;
      left: 10px;
      bottom: 0;
      width: 15px;
      height: 15px;
    }
  }
`
const NoResult = styled.div`
  color: #999;
  padding: 8px;
`
export default SearchList

