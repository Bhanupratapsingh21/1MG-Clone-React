import { Text } from "@chakra-ui/react";
import useLocalStorageArray from "../Hook/localStorage";
import ProductsData from "../Data/ProductsData";
import generateRandomInfo from "../genrateRendom";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import Imgbox from "../Imgboxsingle/Imgbox";
import Slidershopbyconcerns from '../Data/slidershopbyconcerns';
import Personalcare from '../Data/Personalcare'
import Cardslider from "../cardsSlider/Cardslider";
import Textbox from "../Textbox/Textbox ";
import ProductSlide from "../ProductsSlide/ProductsSlide";
import branddata from "../Data/Brandshopbydata";

function Cart() {
    const [array1] = useLocalStorageArray('Cart');
    const [arry, setarry] = useState(array1)
    const navigate = useNavigate()

    const deleteFromLocalStorageArray = (keyToRemove) => {
        const items = JSON.parse(localStorage.getItem('Cart'));
        let key = 'Cart';
        if (items) {
            // Filter out the item with the specified index
            const newArray = items.filter((_, index) => index !== keyToRemove);
            // Update the local storage with the modified array
            localStorage.setItem(key, JSON.stringify(newArray));
            setarry(newArray)
            return newArray;
        } else {
            console.log("Array not found in local storage.");
            return [];
        }
    };



    if (!arry || arry.length === 0) {
        return (

            <div style={{ textAlign: 'center' }}>
                <br />
                <br />
                <Text fontSize='2xl'>Your Cart Is Empty</Text>
            </div>
        );
    } else {
        return (
            <>
                <div style={{ textAlign: 'center' }}>
                    <Text fontSize='5xl'>Cart</Text>
                </div>

                {arry.map((obj, index) => {
                    const datedata = generateRandomInfo();
                    return (
                        <div key={index} id="Wholeproductsbox">
                            <div className="pricesectionsproducts">
                                <Link to={`/Products/${obj.series}${obj.id}`} >
                                    <img src={obj.imgurl} alt="" />
                                    <br />
                                    <div>
                                        <h2>Product Name : {obj.Tittle}</h2>
                                        <h2>Description : {obj.discription}</h2>

                                        <div>
                                            <h3 style={{ color: 'green' }}>{datedata.discount}</h3>
                                            <h3>Total MRP : ₹<s>{datedata.totalPrice}</s></h3>
                                            <h3>Offer : ₹{datedata.price}</h3>
                                        </div>
                                    </div>
                                </Link>
                                <br />
                                <div>
                                    <button id='productsbutton' onClick={() => { navigate(`/Products/${obj.series}${obj.id}`) }} >Buy Now</button>
                                    <button id='productsbutton' onClick={() => { deleteFromLocalStorageArray(index) }} >Remove-Cart</button>
                                </div>
                            </div>
                        </div>

                    );
                })
                }
                <Textbox text={"Tata 1mg : India's Leading Online Pharmacy & Healthcare Platform"} />
                <Imgbox link={'https://onemg.gumlet.io/marketing/d037f049-0426-43b5-b365-c89ccd788d2d.png'} />
                <Cardslider textshopby={'Shop By Health Concerns'} data={Slidershopbyconcerns} />
                <ProductSlide textshopby={"Collagen | supplement of the week"} data={ProductsData.a} />
                <Cardslider textshopby={'Personal care'} data={Personalcare} />
                <ProductSlide textshopby={'Skin Care Products'} data={ProductsData.b} />
                <Imgbox link={'https://onemg.gumlet.io/marketing/d037f049-0426-43b5-b365-c89ccd788d2d.png'} />
                <ProductSlide textshopby={'Womens HealthCare'} data={ProductsData.d} />
                <Imgbox link={'https://onemg.gumlet.io/marketing/d037f049-0426-43b5-b365-c89ccd788d2d.png'} />
                <ProductSlide textshopby={'Tata 1MG Products'} data={ProductsData.c} />

            </>
        );
    }
}

export default Cart;
