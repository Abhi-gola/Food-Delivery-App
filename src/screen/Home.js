import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
    const [search, setsearch] = useState('');

    const [foodCat, setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();

        setfoodItem(response[0])
        setfoodCat(response[1])
        // console.log(response[0], response[1]);
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://images.unsplash.com/photo-1617692855027-33b14f061079?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item"  style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src="https://images.unsplash.com/photo-1563310761-f8d8ed164063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGluZGlhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" className="centered-image d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGluZGlhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" className="w-100" style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdpZGUlMjBzY3JlZW4lMjBpbWFnZXMlMjBvZiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGluZGlhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {foodItem !== []
                                        ?
                                        foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                                            .map(filterItems => {
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                        <Card foodItem = {filterItems}
                                                            options={filterItems.options[0]}
                                                            ImgSrc={filterItems.img}
                                                        ></Card>
                                                    </div>
                                                )
                                            }
                                            ) : <div> No Such Data Found</div>}
                                </div>
                            )
                        })
                        : ""
                }
            </div>
            <div><Footer /></div>
        </div>
    )
}
