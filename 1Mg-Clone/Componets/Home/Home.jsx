import React from "react";
import Slider from '../Slider/Slider'
import images from '../Data/Sliderdata'
import Textbox from "../Textbox/Textbox ";
import Imgbox from "../Imgboxsingle/Imgbox";
import Cardslider from "../cardsSlider/Cardslider";
import Slidershopbyconcerns from '../Data/slidershopbyconcerns';
import branddata from '../Data/Brandshopbydata'
import ProductSlide from '../ProductsSlide/ProductsSlide'
import Personalcare from '../Data/Personalcare'
import ProductsData from "../Data/ProductsData";
import './Home.css'

function Home (){  


    return(
    <>
        <Slider>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
        })}
        </Slider>
        <Textbox text={"Tata 1mg : India's Leading Online Pharmacy & Healthcare Platform"}/>
        <Imgbox link={'https://onemg.gumlet.io/marketing/d037f049-0426-43b5-b365-c89ccd788d2d.png'} />
        <Cardslider textshopby={'Shop By Health Concerns'} data={Slidershopbyconcerns} />
        <Cardslider textshopby={"Featured Brands"} data={branddata} />
        <ProductSlide textshopby={"Collagen | supplement of the week"} data={ProductsData.a} />
        <Cardslider  textshopby={'Personal care'} data={Personalcare}/>
        <ProductSlide textshopby={'Skin Care Products'} data={ProductsData.b} />
        <Imgbox link={'https://onemg.gumlet.io/marketing/d037f049-0426-43b5-b365-c89ccd788d2d.png'} />
        <ProductSlide textshopby={'Womens HealthCare'} data={ProductsData.d} />
        <Imgbox link={'https://onemg.gumlet.io/marketing/d037f049-0426-43b5-b365-c89ccd788d2d.png'} />
        <ProductSlide  textshopby={'Tata 1MG Products'} data={ProductsData.c} />
    </>
    )
}
export default Home