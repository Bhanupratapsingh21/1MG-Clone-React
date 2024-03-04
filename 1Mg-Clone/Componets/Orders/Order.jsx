import { Text } from "@chakra-ui/react";
import useLocalStorageArray from "../Hook/localStorage";
import ProductsData from "../Data/ProductsData";
import generateRandomInfo from "../genrateRendom";
import { useState } from "react";
import branddata from "../Data/Brandshopbydata";
import Cardslider from "../cardsSlider/Cardslider";
import ProductSlide from "../ProductsSlide/ProductsSlide";
import Personalcare from "../Data/Personalcare";
import Imgbox from "../Imgboxsingle/Imgbox";

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
    useDisclosure,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'
function Order() {
    const [array1] = useLocalStorageArray('Order');

    const [arry, setarry] = useState(array1)
    console.log(arry)
    const { isOpen: OrderisOpen, onOpen: OrderonOpen, onClose: OrderonClose } = useDisclosure()

    const deleteFromLocalStorageArray = (keyToRemove) => {
        const items = JSON.parse(localStorage.getItem('Order'));
        let key = 'Order';
        if (items) {
            const newArray = items.filter((_, index) => index !== keyToRemove);
            localStorage.setItem(key, JSON.stringify(newArray));
            setarry(newArray)
            OrderonClose()
            return newArray;
        } else {
            console.log("Array not found in local storage.");
            return [];
        }
    };


    if (!arry || arry.length === 0) {
        return (
            <>
                <div style={{ textAlign: 'center' }}>
                    <br />
                    <br />
                    <Text fontSize='2xl'>Your Order List Is Empty</Text>
                </div>
                <Cardslider textshopby={"Featured Brands"} data={branddata} />
                <Cardslider textshopby={'Personal care'} data={Personalcare} />
                <ProductSlide textshopby={'Skin Care Products'} data={ProductsData.b} />
                <Imgbox link={'https://onemg.gumlet.io/marketing/d037f049-0426-43b5-b365-c89ccd788d2d.png'} />
                <ProductSlide textshopby={'Womens HealthCare'} data={ProductsData.d} />
                <Imgbox link={'https://onemg.gumlet.io/marketing/d037f049-0426-43b5-b365-c89ccd788d2d.png'} />
                <ProductSlide textshopby={'Tata 1MG Products'} data={ProductsData.c} />
            </>
        );
    } else {
        return (
            <>
                <div style={{ textAlign: 'center' }}>
                    <Text fontSize='5xl'>Orders</Text>
                </div>
                {arry.map((obj, index) => {
                    const datedata = generateRandomInfo();
                    return (
                        <>
                            <div key={index} id="Wholeproductsbox">
                                <div className="pricesectionsproducts">
                                    <img src={obj.imgurl} alt="" />
                                    <br />
                                    <div>
                                        <h1>Order By : {obj.name}</h1>
                                        <h2>OrderNo : #{obj.orderno}</h2>
                                        <h2>Address : {obj.Addreas}</h2>
                                        <h2>Product Name : {obj.Tittle}</h2>
                                        <h2>Description : {obj.discription}</h2>
                                        <h2>Left Days : {obj.leftDays}</h2>
                                        <div>
                                            <h3>Qty : {obj.qty}</h3>
                                            <h3 style={{ color: 'green' }}>{obj.discount}</h3>
                                            <h3>Total MRP : ₹<s>{obj.totalPrice}</s></h3>
                                            <h3>Offer : ₹{obj.price}</h3>
                                        </div>
                                        <br />
                                        <div>
                                            <button id='productsbutton' onClick={OrderonOpen} >Cancel Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <AlertDialog
                                key={index + 'alert'}
                                isOpen={OrderisOpen}
                                onClose={OrderonClose}
                            >
                                <AlertDialogOverlay>
                                    <AlertDialogContent>
                                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                            Cancel Order
                                        </AlertDialogHeader>

                                        <AlertDialogBody>
                                            Are you sure? You can't undo this action afterwards.
                                        </AlertDialogBody>

                                        <AlertDialogFooter>
                                            <Button onClick={OrderonClose}>
                                                Don't Cancel
                                            </Button>
                                            <Button colorScheme='red' onClick={() => deleteFromLocalStorageArray(index)} ml={3}>
                                                Cancel Order
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>
                        </>
                    );
                })}
                <Cardslider textshopby={"Featured Brands"} data={branddata} />
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

export default Order;
