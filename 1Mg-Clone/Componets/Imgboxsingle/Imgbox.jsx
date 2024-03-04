import React from "react";
import './imgbox.css'


function Imgbox ({link}){
    return(
        <>
            <div onClick={()=> window.location.href = 'https://www.1mg.com/subscription-plan/subscriptions?utm_source=cpsales&utm_medium=allcampaigns&utm_campaign=homepage_bottom_scroller&referer=mini_care_plan_home_page'} className="box">
                <img src={link} alt="img" />
            </div>
        </>
    )
}
export default Imgbox