import Display from './Display';
import { config } from './config';
import React, { useEffect, useState, useRef } from 'react'

function Booksearch() {

    const [bookData, setBooksData] = useState([]);
    const [book, setBook] = useState("");
    const [total, setTotal] = useState(10);
    const [start, setStart] = useState(0)
    const [query, setQuery] = useState("paid-ebooks")
    const [query1, setQuery1] = useState("")
    const [count, setCount] = useState(0)
    const [pageSize, setPageSize] = useState(0)
    const [prices, setPrices] = useState(0)
    const bookName = useRef(null);


    useEffect(() => {
        let maxResults = 40
        book !== "" ?
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}${query1}&filter=${query}&key"${config.apiKey} &maxResults=${maxResults}`)
                .then((res) => res.json())
                .then((response) => {
                    if (pageSize && prices) {
                        let data = response.items.filter((element) => {
                            return "pageCount" in element.volumeInfo && "retailPrice" in element.saleInfo ? Number(element.volumeInfo.pageCount) <= pageSize && Number(element.saleInfo.retailPrice.amount) <= prices : ""
                        })
                        setBooksData(data)
                    } else if (pageSize) {
                        let data = response.items.filter((element) => {
                            return "pageCount" in element.volumeInfo ? Number(element.volumeInfo.pageCount) <= pageSize : ""
                        })
                        setBooksData(data)
                    }
                    else if (prices) {
                        let data = response.items.filter((element) => {
                            return "retailPrice" in element.saleInfo ? Number(element.saleInfo.retailPrice.amount) <= prices : ""
                        })
                        setBooksData(data)
                    }
                    else {
                        setBooksData((response.items).slice(start, total));
                    }
                }).catch((error) => {
                    console.log(error);
                }) : (() => null)()
    }, [book, total, query, query1, pageSize, prices]);
    const handleSearch = () => {
        setBook(bookName.current.value)
    }

    const handleChange = (e) => {
        setStart(0)
        setTotal(Number(e.target.value))
    }

    const handleRight = () => {
        let diff = total - start;
        if (total < 40) {
            setStart(start + diff)
            setTotal(total + diff)
        }
    }

    const handleLeft = () => {
        let diff = total - start;
        if (total > 0) {
            setStart(start - diff)
            setTotal(total - diff)
        }
    }

    let filterThis = () => {
        let fil = document.querySelector("#filters")
        if (fil.style.display === "none") {
            fil.style.display = "block"
        } else {
            fil.style.display = "none"
        }
    }

    const close = (i) => {
        let fil = document.querySelector("#filters")
        fil.style.display = "none"
    }


    return (
        <div>
            <div className='mainPage'>
                <h1 className='heading'>BOOK FINDER</h1>
                <div className="search">
                    <input type="text" className='input-search' ref={bookName} />
                    <button className="search-button" onClick={handleSearch}><i className="fa fa-search" aria-hidden="true"></i></button>
                </div>
                <div className='filter-container'>
                    <button className='fil-btn' onClick={filterThis}>Filter</button>
                    <div className="tooltip">Applied Filters
                        <div className='tooltiptext'>
                            <div>
                                Book Type :{query}
                            </div>
                            <div>
                                Author :{query1}
                            </div>
                            <div>
                                Pages :{pageSize}
                            </div>
                            <div>
                                Prices :{prices}
                            </div>
                        </div>
                    </div>
                    <div className='filters' id='filters'>
                        <button style={{ float: "right", cursor: "pointer", padding: "0px 5px" }} onClick={close}>X</button>

                        <div>
                            <label htmlFor="r1">Free Books: </label>
                            <input name='1' id="r1" value="free-ebooks" onClick={(e) => { setQuery(e.target.value); count < 4 ? setCount(count + 1) : setCount(count) }} type="radio" />
                        </div>
                        <div>
                            <label htmlFor="r2">Paid Books: </label>
                            <input name='1' id='r2' value="paid-ebooks" onClick={(e) => { setQuery(e.target.value); count < 4 ? setCount(count + 1) : setCount(count) }} type="radio" />
                        </div>
                        <div>
                            <label htmlFor='in1'>Author: </label>
                            <input id='in1' className='fil-ip' onChange={(e) => { setQuery1(e.target.value); count < 4 ? setCount(count + 1) : setCount(count) }} type="text" />
                        </div>
                        <div>
                            <label htmlFor='in5'>Pages: </label>
                            <input type="text" id='in5' className='fil-ip' onChange={(e) => { setPageSize(Number(e.target.value)); count < 4 ? setCount(count + 1) : setCount(count) }} />
                        </div>
                        <div>
                            <label htmlFor="in6">Prices: </label>
                            <input type="text" id='in6' className='fil-ip' onChange={(e) => { setPrices(Number(e.target.value)); count < 4 ? setCount(count + 1) : setCount(count) }} />
                        </div>
                    </div>

                </div>
                {
                    book !== "" ? <a href="#content"><i className="fa fa-angle-down" aria-hidden="true"></i></a> : null
                }
            </div>
            <div id='content'>

                {
                    bookData.length !== 0 ? <Display bookData={bookData} /> : null
                }

                {
                    bookData.length !== 0 ? < div className='paging'>
                        <div className='pages'>
                            <select className='dropdown' name="pagination" id="cars" onChange={(e) => handleChange(e)}>
                                <option className='options' value="10">10</option>
                                <option className='options' value="20">20</option>
                                <option className='options' value="30">30</option>
                                <option className='options' value="40">40</option>
                            </select>
                            {
                                pageSize ? null : <>
                                    {
                                        start <= 0 ? null : <button className='left-side' onClick={handleLeft}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                                    }
                                    {
                                        total >= 40 ? null : < button className='right-side' onClick={handleRight}><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                                    }
                                </>
                            }
                        </div>
                    </div> : null
                }
            </div>
        </div >
    )
}

export default Booksearch