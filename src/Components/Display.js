import React, { useState } from 'react'

const Display = ({ bookData }) => {

    const [toggle, setToggle] = useState(false)

    let modal = document.getElementsByClassName("modal");

    const showMore = (i) => {
        modal[i].style.display = "block"
    }

    const close = (i) => {
        modal[i].style.display = "none"
    }



    return (
        <div className='container'>
            {
                bookData.map((element, index) => {
                    return (
                        <>
                            <div className='item' key={index}>
                                <div className='left'>
                                    {
                                        element.volumeInfo.imageLinks ? <img onClick={() => showMore(index)} src={element.volumeInfo.imageLinks.thumbnail} alt="random" /> : null
                                    }
                                    <button className='check-more' onClick={() => showMore(index)}>Read More...</button>
                                    <div clas="myModal" className="modal">
                                        <div className="modal-content">
                                            <button style={{ float: "right", cursor: "pointer", padding: "0px 5px" }} onClick={() => close(index)}>X</button>
                                            <h1>{element.volumeInfo.title}</h1>
                                            <h2>{element.volumeInfo.subtitle}</h2>
                                            <h4>Description</h4>
                                            <p className='mod-desc'>{element.volumeInfo.description}</p>
                                            {"publisher" in element.volumeInfo ? <p>Publisher: {element.volumeInfo.publisher}</p> : null}
                                            {"language" in element.volumeInfo ? <p>Language: {element.volumeInfo.language === "en" ? "English" : "en"}</p> : null}
                                            <button className='shop-btn'><a className='shop-a' href={element.saleInfo.buyLink} target="_blank">BUY NOW<i className="fa fa-shopping-cart" aria-hidden="true"></i></a></button>
                                        </div>
                                    </div>
                                </div>
                                <div className='right'>
                                    <h3 className='cont-head'>{element.volumeInfo.title}</h3>

                                    {
                                        "categories" in element.volumeInfo ? <p className="p-line"><span style={{ fontWeight: "bolder" }} >Genre: </span>{element.volumeInfo.categories}</p> : <><br /> <span style={{ fontWeight: "bolder" }}>Genre: </span>N/A</>
                                    }
                                    {
                                        "authors" in element.volumeInfo ? <p className="p-line"><span style={{ fontWeight: "bolder" }} >Author: </span>{element.volumeInfo.authors}</p> : <><br /><span style={{ fontWeight: "bolder" }}>Authors: </span> N/A</>
                                    }
                                    {
                                        "categories" in element.volumeInfo ? <p className="p-line"><span style={{ fontWeight: "bolder" }} >Release Date: </span>{element.volumeInfo.publishedDate}</p> : <><br /><span style={{ fontWeight: "bolder" }}>Release Date: </span> N/A</>
                                    }
                                    {
                                        "averageRating" in element.volumeInfo ? < p className="p-line"><span style={{ fontWeight: "bolder" }} >Rating: </span>{element.volumeInfo.averageRating}</p> : <><br /><span style={{ fontWeight: "bolder" }}>Rating: </span > N/A</>
                                    }
                                    {
                                        "pageCount" in element.volumeInfo ? <p className="p-line"><span style={{ fontWeight: "bolder" }} >Page Count: </span>{element.volumeInfo.pageCount}</p> : <><br /><span style={{ fontWeight: "bolder" }}>Page Count : </span > N/A</>
                                    }
                                    {
                                        "retailPrice" in element.saleInfo ? <p className="p-line"><span style={{ fontWeight: "bolder" }} >Price(INR): </span>{Math.floor(element.saleInfo.retailPrice.amount)} /-</p> : <><br /><span style={{ fontWeight: "bolder" }}>Price:  </span> N/A</>
                                    }

                                </div>
                            </div>
                        </>
                    )
                })
            }
        </div >
    )
}

export default Display