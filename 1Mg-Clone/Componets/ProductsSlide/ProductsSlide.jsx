import React, { useRef, useState } from "react";
import { TweenLite, Power3 } from "gsap";
import "./ProductSlide.css";
import { Link } from 'react-router-dom'
import generateRandomInfo from "../genrateRendom";

const Box = ({series, id, imgurl, Tittle, discription }) => {
    let datedata = generateRandomInfo()
    return (
        <div className="boxsliderpro">
            <Link to={`/Products/${series}${id}`}>
                <img src={imgurl} alt='img' />
                <div id="textbox">
                    <br />
                    <h2 >{Tittle}</h2>
                    <h5>{discription}</h5>
                    <h5 className="Priceproducts">Get it In <b>{datedata.leftDays}</b></h5>
                    <div>
                        <h3 style={{ color: 'green' }}>{datedata.discount}</h3>
                        <h3>Total MRP : ₹<s>{datedata.totalPrice}</s></h3>
                        <h3>Offer : ₹{datedata.price}</h3>
                    </div>
                </div>
            </Link>
        </div>
    );
}
const ProductSlide = ({ data, textshopby }) => {





    const [count, setCount] = useState(3);


    const [multiplier, setMultiplier] = useState(1);

    const boxContainerRef = useRef();


    const boxWidth = 250;


    const prev = () => {

        setCount((p) => p - 1);
        setMultiplier((p) => p - 1);


        [...Array(10).keys()].forEach((i) => slideRight(i, multiplier - 1));
    };


    const slideLeft = (index, multiplied) => {

        TweenLite.to(boxContainerRef.current.children[index], 1, {

            x: -boxWidth * multiplied,
            ease: Power3.easeOut
        });
    };


    const slideRight = (index, multiplied) => {

        TweenLite.to(boxContainerRef.current.children[index], 1, {

            x: -boxWidth * multiplied + boxWidth,
            ease: Power3.easeOut
        });
    };


    const next = () => {

        setCount((p) => p + 1);
        setMultiplier((p) => p + 1);
        [...Array(10).keys()].forEach((i) => slideLeft(i, multiplier));
    };

    const renderBox = () => (
        <>
            {data.map((d, i) => (
                <Box key={i} series={d.series} id={d.id} onclickurl={d.clickurl} discription={d.discription} imgurl={d.imgurl} Tittle={d.Tittle} />
            ))}
        </>
    );

    return (
        <>
            <div><h1 id="textshopbypro" >{textshopby}</h1></div>
            <div className='sliderboxwholepro'>
                <div>
                    <div className="buttonboxpro">
                        <div>
                            <button disabled={count - 3 === 0} onClick={prev}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ff6f61" id="Bold" viewBox="0 0 24 24" width="20" ><path d="M17.921,1.505a1.5,1.5,0,0,1-.44,1.06L9.809,10.237a2.5,2.5,0,0,0,0,3.536l7.662,7.662a1.5,1.5,0,0,1-2.121,2.121L7.688,15.9a5.506,5.506,0,0,1,0-7.779L15.36.444a1.5,1.5,0,0,1,2.561,1.061Z" /></svg>
                            </button>
                        </div>
                        <div>
                            <button disabled={count === data.length} onClick={next}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ff6f61" id="Bold" viewBox="0 0 24 24" width="20" ><path d="M6.079,22.5a1.5,1.5,0,0,1,.44-1.06l7.672-7.672a2.5,2.5,0,0,0,0-3.536L6.529,2.565A1.5,1.5,0,0,1,8.65.444l7.662,7.661a5.506,5.506,0,0,1,0,7.779L8.64,23.556A1.5,1.5,0,0,1,6.079,22.5Z" /></svg>
                            </button>
                        </div>
                    </div>
                    <div className="containersliderpro">
                        <div className="box-containersliderpro" ref={boxContainerRef}>
                            {renderBox()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// Box component for each box with an integer value to differentiate


export default ProductSlide;