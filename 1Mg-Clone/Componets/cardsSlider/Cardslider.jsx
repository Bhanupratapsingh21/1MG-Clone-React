import React, { useRef, useState } from "react";
import { TweenLite, Power3 } from "gsap";
import "./cardslider.css";

const Box = ({ onclickurl, imgurl , Tittle }) => (
    <div onClick={()=>{ window.location.href = onclickurl}} className="boxslider">
        <img src={imgurl} alt='img' />
        <h2 className="tittlename">{Tittle}</h2>
    </div>
);
const Cardslider = ({data , textshopby}) => {

    //Count is used to check the status of last element visible
    // At initial stage, third element is the last which is visible
    const [count, setCount] = useState(3);

    //Multiplier is used to shift the boxes by some fixed width
    //First will be 1 * boxWidth
    //Second will be 2 * boxWidth
    //Used because box 1 is at 0 in initial stage
    //After 1 next click shifted to (-1*boxWidth) = -310.
    //After 2 next click shifted to (-2*boxWidth) = -620.
    const [multiplier, setMultiplier] = useState(1);

    //To get DOM element of boxContainer -> will have all children
    const boxContainerRef = useRef();

    //Fixed width by which we need to shift boxes
    // box width + margin = 250 + 30 + 30 = 310
    const boxWidth = 250;

    //Called on Prev btn click
    const prev = () => {
        //Reducing count & multiplier by 1
        setCount((p) => p - 1);
        setMultiplier((p) => p - 1);

        //Creating Array of data length (10)
        //Iterating and calling on each element slideRight func
        //i -> index, multiplier - 1 -> multiplying factor
        //multiplier-1 because we want to use previous-1 value
        //of multiplier but since setState is async that's why we get
        //old value instead of multiplier - 1
        [...Array(10).keys()].forEach((i) => slideRight(i, multiplier - 1));
    };

    //slideLeft func
    const slideLeft = (index, multiplied) => {
        //GSAP function
        TweenLite.to(boxContainerRef.current.children[index], 1, {
            //-boxWidth * multiplied to move it in x -ve axes
            //Example for first element
            // -310 * 1 = -310
            // -310 * 2 = -620
            x: -boxWidth * multiplied,
            ease: Power3.easeOut
        });
    };

    //slideRight func
    const slideRight = (index, multiplied) => {
        //GSAP function
        TweenLite.to(boxContainerRef.current.children[index], 1, {
            //-boxWidth * multiplied + boxWidth to move it in x +ve axes
            //Example for first element
            // It's at -620 (shifted 2 times left)
            // -310 * 2 + 310 = -310
            // Now, it's at -310 (shifted 1 times left)
            // -310 * 1 + 310 = 0
            x: -boxWidth * multiplied + boxWidth,
            ease: Power3.easeOut
        });
    };

    //Called on Next btn click
    const next = () => {
        //Increasing count & multiplier by 1
        setCount((p) => p + 1);
        setMultiplier((p) => p + 1);

        //Calling slidLeft func on every element
        // i -> index, multiplier -> multiplying factor
        //Here we're just sending multiplying factor without any operation
        [...Array(10).keys()].forEach((i) => slideLeft(i, multiplier));
    };

    const renderBox = () => (
        <>
            {data.map((d, i) => (
                <Box key={i} onclickurl={d.clickurl} imgurl={d.imgurl} Tittle={d.Tittle}  />
            ))}
        </>
    );

    return (
        <>
        <div><h1 id="textshopby" >{textshopby}</h1></div>
        <div className='sliderboxwhole'>
            <div>
                <div className="buttonbox">
                    <div>
                        <button disabled={count - 3 === 0} onClick={prev}>
                        <svg xmlns="http://www.w3.org/2000/svg"  fill="#ff6f61" id="Bold" viewBox="0 0 24 24" width="20" ><path d="M17.921,1.505a1.5,1.5,0,0,1-.44,1.06L9.809,10.237a2.5,2.5,0,0,0,0,3.536l7.662,7.662a1.5,1.5,0,0,1-2.121,2.121L7.688,15.9a5.506,5.506,0,0,1,0-7.779L15.36.444a1.5,1.5,0,0,1,2.561,1.061Z"/></svg>
                        </button>
                    </div>
                    <div>
                    <button disabled={count === data.length} onClick={next}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ff6f61" id="Bold" viewBox="0 0 24 24" width="20" ><path d="M6.079,22.5a1.5,1.5,0,0,1,.44-1.06l7.672-7.672a2.5,2.5,0,0,0,0-3.536L6.529,2.565A1.5,1.5,0,0,1,8.65.444l7.662,7.661a5.506,5.506,0,0,1,0,7.779L8.64,23.556A1.5,1.5,0,0,1,6.079,22.5Z"/></svg>
                    </button>
                    </div>
                </div>
                <div className="containerslider">
                    {/* Subtract number of cards visible and if 0 then disable */}
                    <div className="box-containerslider" ref={boxContainerRef}>
                            {renderBox()}
                    </div>
                    {/* When the count value becomes equal to the data length (initial 3) */}
                </div>
            </div>
        </div>
        </>
    );
};

// Box component for each box with an integer value to differentiate


export default Cardslider;

