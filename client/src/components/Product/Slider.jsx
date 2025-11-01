import React from 'react'
import { Link } from 'react-router-dom'
import ProductStore from '../../Store/ProductStore'
import SliderSkeleton from '../../Skeleton/SliderSkeleton'

const Slider = () => {
    const { SliderStore } = ProductStore()

    if (!SliderStore) {
        return <SliderSkeleton />
    }

    return (
        <div>
            <div id="carouselExampleDark" className="carousel slide carousel-dark" data-bs-ride="carousel">
                {/* Indicators */}
                <div className="carousel-indicators">
                    {SliderStore.map((item, index) => (
                        <button
                            key={item._id}
                            type="button"
                            data-bs-target="#carouselExampleDark"
                            data-bs-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                            aria-current={index === 0 ? 'true' : undefined}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>

                {/* Slides */}
                <div className="carousel-inner py-5">
                    {SliderStore.map((item, index) => (
                        <div
                            key={item._id}
                            className={`carousel-item ${index === 0 ? 'active' : ''}`}
                            data-bs-interval="5000"
                        >
                            <div className="container">
                                <div className="row justify-content-center align-items-center">
                                    <div className="col-12 col-lg-5 col-md-5 col-sm-12 p-5">
                                      <div className="w-full bg-gray-100 border-t-4 border-b-4 border-gray-800 overflow-hidden py-4">
                                            <div className="bg-light border-dark py-3 overflow-hidden">
                                                <div className="marquee">
                                                    <h3 className="fw-bold text-uppercase text-dark">
                                                    A Warm Welcome from Boni Amin
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>

                                        <p>{item.des}</p>
                                        <Link to={`/product/${item.productID}`} className="btn btn-success text-white px-5">
                                            Buy Now
                                        </Link>
                                    </div>
                                    <div className="col-12 col-lg-5 col-md-5 col-sm-12 p-5">
                                        <img 
                                            src={item.image} 
                                            className="w-100" 
                                            alt={item.title} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default Slider
