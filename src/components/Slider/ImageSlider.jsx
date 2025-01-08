import React from "react";
import "./ImageSlider.css"

export default function ImageSlider(props) {

    const slides =props.imageURLs;
        
        let count = 0;
        const handleAnimation = () =>{
            const slides = document.querySelectorAll('.slideImage');
            slides.forEach ((slide) =>{
                slide.style.transform =`translateX(-${count * 100}%)`
            })
        }
        const handleNextClick = ()=>{
            count === 2 ? count = 0 : count++;
            handleAnimation()
        }
        const handleprevClick = ()=>{
            count === 0 ? count = 2 : count--;
            handleAnimation()
        }
    return (
        <div className="caurosel-container">
            <div className="caoursel-slider">
                {slides.map((src, index) => (
                    <img key={index} src={src} alt={`Slide ${index + 1}`} className="slideImage" style={{left:`${index*100}%`}}/>
                ))}
            </div>
            <div className="carousal-Btn">

                <div className='carousal-leftBtn' onClick={() => handleprevClick()}>
                    <i className="carousal-arrow carousal-left" ></i>
                </div>
                <div className='carousal-rightBtn'onClick={() => handleNextClick()}>
                    <i className="carousal-arrow carousal-right"></i>
                </div>
            </div>
        </div>
    )
}