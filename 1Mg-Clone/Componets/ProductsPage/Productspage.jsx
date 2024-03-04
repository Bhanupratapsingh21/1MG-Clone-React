import { useParams } from "react-router-dom"
import ProductsData from "../Data/ProductsData"
import { useContext, useState } from "react";
import './Products.css'
import Imgbox from "../Imgboxsingle/Imgbox";
import Slidershopbyconcerns from '../Data/slidershopbyconcerns';
import Personalcare from '../Data/Personalcare'
import Cardslider from "../cardsSlider/Cardslider";
import Textbox from "../Textbox/Textbox ";
import ProductSlide from "../ProductsSlide/ProductsSlide";
import generateRandomInfo from '../genrateRendom'
import branddata from "../Data/Brandshopbydata";

import useLocalStorageArray from "../Hook/localStorage";

import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    AlertDialog,
    Input,
    FormControl,
    FormLabel,
    Text,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
    AlertDialogHeader,
    AlertDialogContent,
    Box,
    useDisclosure,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'

import { AuthContext } from "../../Context/AuthContextProvider";
import { useEffect } from "react";
function Productspage() {

    const { id } = useParams()

    const [input, setinput] = useState({
        name: '',
        Addreas: '',
    })

    const [arry2, addToArray2] = useLocalStorageArray('Order')
    const [array1, addToArray1] = useLocalStorageArray('Cart')

    const handleinput = (e) => {
        setinput((pravstate => ({
            ...pravstate,
            [e.target.name]: e.target.value
        })))
    }
    
    

        const series = id.charAt(0);

        const { isOpen: checkisOpen, onOpen: checkonOpen, onClose: checkonClose } = useDisclosure()

        const { isOpen: BuynowisOpen, onOpen: BuynowonOpen, onClose: BuynowonClose } = useDisclosure()

        const { Auth } = useContext(AuthContext)

        const productId = id.substring(1);

        const data = ProductsData[series][productId]

        const datedata = generateRandomInfo()

        const [qty, setqty] = useState(1)

        function generateRandomNumber() {
            const randomNum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
            return randomNum
        }
        const [orderno, setorderno] = useState({
            orderno: ""
        })

        const handleOrderSubmit = () => {
            setstep(3)
            let no = generateRandomNumber()
            setorderno({
                orderno: no
            })
            console.log(input)
            let Orderdata = {
                ...data,
                qty: qty,
                orderno: no,
                ...input,
                ...datedata
            };

            addToArray2(Orderdata)
        }
        const handleaddtocart = () => {
            let Productsdata = Object.assign(data, qty)
            addToArray1(Productsdata)
        }

        const handleqty = (e) => {
            console.log(e.target.value)
            setqty(e.target.value)
        }
        const steps = [
            { title: 'First', description: 'Contact Info' },
            { title: 'Second', description: 'Payment Method' },
            { title: 'Third', description: 'Done' },
        ]

        const [step, setstep] = useState(1)

        return (
            <>
                <Textbox text={"Tata 1mg : India's Leading Online Pharmacy & Healthcare Platform"} />
                <Imgbox link={'https://onemg.gumlet.io/marketing/d037f049-0426-43b5-b365-c89ccd788d2d.png'} />
                <div id="Wholeproductsbox">
                    <div className="pricesectionsproducts" >
                        <img src={data.imgurl} alt="" />
                        <br />
                        <div>
                            <h1>Product Name : {data.Tittle}</h1>
                            <h2>Discription : {data.discription}</h2>
                            <div>
                                <h3 style={{ color: 'green' }}>{datedata.discount}</h3>
                                <h3>Total MRP : ₹<s>{datedata.totalPrice}</s></h3>
                                <h3>Offer : ₹{datedata.price}</h3>
                            </div>
                            <br />
                            <div>
                                <button id='productsbutton' onClick={() => { Auth.isAuth ? BuynowonOpen() : checkonOpen() }} > Buy Now </button>
                                <button id='productsbutton' onClick={handleaddtocart} > Add To Cart </button>
                            </div>
                            <br />
                            <div>
                                <label id='qttxt' htmlFor="quantity">Quantity:</label>
                                <br />
                                <select onChange={handleqty} id='productsselect'>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <AlertDialog
                    isOpen={checkisOpen}
                    onClose={checkonClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Please Login
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Hey Bro You Are Not Logged-In Please Login
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button colorScheme='red' onClick={checkonClose} ml={3}>
                                    Ohk
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
                <Modal isOpen={BuynowisOpen} onClose={BuynowonClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Thanku For Choseing US</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>{
                            (step == 1) && <Box>
                                <FormControl>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input name="name" onChange={handleinput} placeholder='Full Name' />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Full-Addreas</FormLabel>
                                    <Input name="Addreas" onChange={handleinput} placeholder='Addreas' />
                                </FormControl>
                                <br />
                                <Button onClick={() => setstep(2)} >Submit</Button>
                            </Box>
                        }
                            {
                                (step == 2) && <Box>
                                    <FormControl>
                                        <Text fontSize='3xl' >Payment Method</Text>
                                        <br />
                                        <Text fontSize='2xl' >We Only Have Cash On Delivery</Text>
                                    </FormControl>
                                    <br />
                                    <Button onClick={handleOrderSubmit} >Order</Button>
                                </Box>
                            }
                            {
                                (step == 3) && <Box>
                                    <FormControl>
                                        <Text fontSize='3xl' >Your Order Conformed</Text>
                                        <br />
                                        <Text fontSize='2xl' >Order Id #{orderno.orderno}</Text>
                                    </FormControl>
                                    <br />
                                    <Button onClick={() => { BuynowonClose(), setstep(1) }} >Done</Button>
                                </Box>
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Stepper colorScheme='red' index={step}>
                                {steps.map((step, index) => (
                                    <Step key={index}>
                                        <StepIndicator>
                                            <StepStatus
                                                complete={<StepIcon />}
                                                incomplete={<StepNumber />}
                                                active={<StepNumber />}
                                            />
                                        </StepIndicator>

                                        <Box flexShrink='0'>
                                            <StepTitle>{step.title}</StepTitle>
                                            <StepDescription>{step.description}</StepDescription>
                                        </Box>
                                        <StepSeparator />
                                    </Step>
                                ))}
                            </Stepper>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }
export default Productspage 