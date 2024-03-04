import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css'
import {
    AlertDialog,
    Tooltip,
    AlertDialogBody,
    AlertDialogFooter,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    Select,
    DrawerHeader,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Heading,
    Stack,
    StackDivider,
    Box,
    Text,
    DrawerOverlay,
    Divider,
    DrawerContent,
    DrawerCloseButton,
    Alert,
} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    useToast,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import getmedician from "../Data/medician-namesfordebouncing";
import { Button, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { AuthContext } from "../../Context/AuthContextProvider";
function Header() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [medician, setmedician] = useState([])

    const { isOpen: LoginisOpen, onOpen: LoginonOpen, onClose: LoginonClose } = useDisclosure()

    const { isOpen: locationisOpen, onOpen: locationOnOpen, onClose: locationonCloser } = useDisclosure()

    const [debounce, setdebounce] = useState(false)

    const [value, setvalue] = useState('')

    const [timeoutid, settimeoutid] = useState(null)

    const { Auth, setAuth } = useContext(AuthContext)

    const getFilteredMedician = (input) => {
        return getmedician().filter(medician => medician.toLowerCase().includes(input.toLowerCase()));
    };

    const handlesearch = () => {
        if (value === '') {
            console.log("empty value")
        } else (
            window.location.href = `https://www.1mg.com/search/all?filter=true&name=${value}`
        )
    }

    const onclickdouncedata = (e) => {
        const value = e.target.textContent;
        console.log(value);
        window.location.href = `https://www.1mg.com/search/all?filter=true&name=${value}`
        setvalue('')
    }

    const handlechangeinput = (e) => {
        const value = e.target.value
        if (value == '') {
            setvalue('')
            setdebounce(false)
        } else {
            setvalue(value)

            clearTimeout(timeoutid);

            const newtimeoutid = setTimeout(() => {
                const filterddata = getFilteredMedician(value)
                setmedician(filterddata);
                setdebounce(true)
            }, 1000);

            settimeoutid(newtimeoutid);
        }

    }

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState(false)
    const toast = useToast()
    const AuthForm = () => {

        const authpromise = new Promise((resolve, reject) => {
            fetch("https://reqres.in/api/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "email": 'eve.holt@reqres.in', "password": 'pistol' })
            })
                .then((res) => {
                    if (!res.ok) {

                        reject('NetWork Response Was Not Ok')
                    }
                    return res.json();
                })
                .then((res) => {
                    if (res.token) {
                        console.log(res)
                        resolve("ohk")
                        setAuth({
                            isAuth: true,
                            token: res.token,
                            Username: email
                        })
                        console.log(Auth)
                        LoginonClose()
                    } else {
                        console.log('here')
                        reject('Unknow Error')
                    }
                })
                .catch((error) => {
                    // iam just makeing that if the all creadetials are wrong it will also login you
                    seterror(true)
                    reject(error)
                });
        })
        toast.promise(authpromise, {
            success: { title: 'Login Successful With 1-MG.', description: "We've Successfully logged into your account." },
            error: { title: 'Login Failed-Check-Net.', description: 'Sorry Try again.' },
            loading: { title: 'Logging You Wait', description: 'Please wait' },
        })

    }
    const handleclicklogin = () => {
        Auth.isAuth ? alertonOpen() : LoginonOpen()
    }
    const { isOpen: alertisOpen, onOpen: alertonOpen, onClose: alertonClose } = useDisclosure()

    const Logout = () => {
        setAuth({
            isAuth: false,
            token: null,
            Username: null
        })
        alertonClose()
    }

    const data = [
        'Health Resource Center',
        'Vitamins & Nutrition',
        'Personal care',
        'Health Care',
        'Ayurveda Products',
        'Diabetes',
        'Health Conditions',
        'Homeopathy',
        'Featured'
    ]

    const [dropdownStates, setDropdownStates] = useState([
        'Health Resource Center',
        'Vitamins & Nutrition',
        'Personal care',
        'Health Care',
        'Ayurveda Products',
        'Diabetes',
        'Health Conditions',
        'Homeopathy',
        'Featured'
    ].fill(false));

    const navigate = useNavigate()
    const handlecartclick = ()=>{
        navigate('/Cart')
    }
    const handleorderlogoc = ()=>{
        navigate('/Orders')
    }
    const handlehome = ()=>{
        navigate('/')
    }
    const handleMouseEnter = (index) => {
        const newDropdownStates = [...dropdownStates];
        newDropdownStates[index] = true;
        setDropdownStates(newDropdownStates);
    };

    const handleMouseLeave = (index) => {
        const newDropdownStates = [...dropdownStates];
        newDropdownStates[index] = false;
        setDropdownStates(newDropdownStates);
    };

    return (
        <>
            <div className="navbarpc">
                <div id="burgurmanu">
                    <HamburgerIcon onClick={onOpen} boxSize={6} />
                </div>
                <img onClick={handlehome} style={{ marginLeft: '25px' }} src="https://www.1mg.com/images/tata_1mg_logo.svg" alt="TATA1mg" />
                <div className="linksbox">
                    <Link id="onhover" href="/" target="_blank" rel="noopener noreferrer">MEDICINES</Link>
                    <a id="onhover" href="https://www.1mg.com/labs" target="_blank" rel="noopener noreferrer">LAB TEST</a>
                    <a id="onhover" href="https://www.1mg.com/online-doctor-consultation" target="_blank" rel="noopener noreferrer">CONSULT DOCTORS</a>
                    <a id="onhover" href="https://www.1mg.com/cancer-care/home" target="_blank" rel="noopener noreferrer">CANCER CARE</a>
                    <a id="onhover" href="https://www.1mg.com/ayurveda" target="_blank" rel="noopener noreferrer">AYURVEDA</a>
                    <a id="onhover" href="https://www.1mg.com/subscription-plan/subscriptions" target="_blank" rel="noopener noreferrer">CAREPLAN</a>
                </div>
                <div className="offersbutton">
                    <button >Offers</button>
                </div>
                <div>
                    <div className="boxicon">
                        <svg onClick={handleclicklogin} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" className="icon" viewBox="0 0 24 24" ><path d="M16.043,14H7.957A4.963,4.963,0,0,0,3,18.957V24H21V18.957A4.963,4.963,0,0,0,16.043,14Z" /><circle cx="12" cy="6" r="6" /></svg>
                        <svg onClick={handlecartclick} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="icon" ><path d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077ZM21.4,6.178l-.786,4.354A3,3,0,0,1,17.657,13H5.419L4.478,5H20.41A1,1,0,0,1,21.4,6.178Z" /><circle cx="7" cy="22" r="2" /><circle cx="17" cy="22" r="2" /></svg>
                        <svg onClick={handleorderlogoc} id="Layer_1" className="icon" height="512" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m17 14a1 1 0 0 1 -1 1h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1zm-4 3h-5a1 1 0 0 0 0 2h5a1 1 0 0 0 0-2zm9-6.515v8.515a5.006 5.006 0 0 1 -5 5h-10a5.006 5.006 0 0 1 -5-5v-14a5.006 5.006 0 0 1 5-5h4.515a6.958 6.958 0 0 1 4.95 2.05l3.484 3.486a6.951 6.951 0 0 1 2.051 4.949zm-6.949-7.021a5.01 5.01 0 0 0 -1.051-.78v4.316a1 1 0 0 0 1 1h4.316a4.983 4.983 0 0 0 -.781-1.05zm4.949 7.021c0-.165-.032-.323-.047-.485h-4.953a3 3 0 0 1 -3-3v-4.953c-.162-.015-.321-.047-.485-.047h-4.515a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3z"/></svg>
                    </div>
                </div>
            </div>
            <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='3px'><img style={{ marginLeft: "18vw" }} src="https://www.1mg.com/images/tata_1mg_logo.svg" alt="TATA1mg" /></DrawerHeader>
                    <Divider orientation='horizontal' />
                    <DrawerBody>
                        <div onClick={handleclicklogin} class="cardlogin">
                            <div class="imglogin"><svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="25" height="d"><path d="M16.043,14H7.957A4.963,4.963,0,0,0,3,18.957V24H21V18.957A4.963,4.963,0,0,0,16.043,14Z" /><circle cx="12" cy="6" r="6" /></svg>
                            </div>
                            <div class="textBox">
                                <div class="textContent">
                                    <p class="h1">Hi, There!</p>
                                    <span class="span">1MG</span>
                                </div>
                                {Auth.isAuth ? <p>{Auth.Username}</p> : <p class="p">Login / Sign Up</p>}
                                <div></div>
                            </div>
                        </div>
                        <div onClick={locationOnOpen} class="cardlogin">
                            <div class="imglogin"><svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" width="25" height="d" data-name='Layer 1' viewBox="0 0 24 24"><path d="M12,.042a9.992,9.992,0,0,0-9.981,9.98c0,2.57,1.99,6.592,5.915,11.954a5.034,5.034,0,0,0,8.132,0c3.925-5.362,5.915-9.384,5.915-11.954A9.992,9.992,0,0,0,12,.042ZM12,14a4,4,0,1,1,4-4A4,4,0,0,1,12,14Z" /></svg>
                            </div>
                            <div class="textBox">
                                <div class="textContent">
                                    <p class="h1">Location</p>
                                    <span class="span"></span>
                                </div>

                                <p class="p">Get Fastest Delivery</p>
                                <div></div>
                            </div>
                        </div>
                        <hr />
                        <div class="error">
                            <div class="error__title"><Link href="/" target="_blank" rel="noopener noreferrer">MEDICINES</Link></div>
                        </div>
                        <div class="error">
                            <div class="error__title"><a href="https://www.1mg.com/labs" target="_blank" rel="noopener noreferrer">LAB TEST</a></div>
                        </div>
                        <div class="error">
                            <div class="error__title"> <a href="https://www.1mg.com/online-doctor-consultation" target="_blank" rel="noopener noreferrer">CONSULT DOCTORS</a></div>
                        </div>
                        <div class="error">
                            <div class="error__title"><a href="https://www.1mg.com/cancer-care/home" target="_blank" rel="noopener noreferrer">CANCER CARE</a></div>
                        </div>
                        <div class="error">
                            <div class="error__title"><a href="https://www.1mg.com/ayurveda" target="_blank" rel="noopener noreferrer">AYURVEDA</a></div>
                        </div>
                        <div class="error">
                            <div class="error__title"> <a href="https://www.1mg.com/subscription-plan/subscriptions" target="_blank" rel="noopener noreferrer">CAREPLAN</a></div>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Drawer placement={'bottom'} size={'xl'} onClose={locationonCloser} isOpen={locationisOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Location</DrawerHeader>
                    <DrawerBody>
                        <Select  >
                            <option value='Andhra Pradesh'>Andhra Pradesh</option>
                            <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
                            <option value='Assam'>Assam</option>
                            <option value='Bihar'>Bihar</option>
                            <option value='Chhattisgarh'>Chhattisgarh</option>
                            <option value='Goa'>Goa</option>
                            <option value='Gujarat'>Gujarat</option>
                            <option value='Haryana'>Haryana</option>
                            <option value='Himachal Pradesh'>Himachal Pradesh</option>
                            <option value='Jharkhand'>Jharkhand</option>
                            <option value='Karnataka'>Karnataka</option>
                            <option value='Kerala'>Kerala</option>
                            <option value='Madhya Pradesh'>Madhya Pradesh</option>
                            <option value='Maharashtra'>Maharashtra</option>
                            <option value='Manipur'>Manipur</option>
                            <option value='Meghalaya'>Meghalaya</option>
                            <option value='Mizoram'>Mizoram</option>
                            <option value='Nagaland'>Nagaland</option>
                            <option value='Odisha'>Odisha</option>
                            <option value='Punjab'>Punjab</option>
                            <option value='Rajasthan'>Rajasthan</option>
                            <option value='Sikkim'>Sikkim</option>
                            <option value='Tamil Nadu'>Tamil Nadu</option>
                            <option value='Telangana'>Telangana</option>
                            <option value='Tripura'>Tripura</option>
                            <option value='Uttar Pradesh'>Uttar Pradesh</option>
                            <option value='Uttarakhand'>Uttarakhand</option>
                            <option value='West Bengal'>West Bengal</option>
                            <option value='Andaman and Nicobar Islands'>Andaman and Nicobar Islands</option>
                            <option value='Chandigarh'>Chandigarh</option>
                            <option value='Dadra and Nagar Haveli'>Dadra and Nagar Haveli</option>
                            <option value='Daman and Diu'>Daman and Diu</option>
                            <option value='Lakshadweep'>Lakshadweep</option>
                            <option value='Delhi'>Delhi</option>
                            <option value='Puducherry'>Puducherry</option>
                            <option value='Ladakh'>Ladakh</option>
                            <option value='Lakshadweep'>Lakshadweep</option>
                        </Select>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <AlertDialog
                isOpen={alertisOpen}
                onClose={alertonClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Already Logged In
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Want To Log-Out ? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={alertonClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={Logout} ml={3}>
                                Log-Out
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <hr />
            <Modal isOpen={LoginisOpen} onClose={LoginonClose}>
                {<ModalOverlay
                    bg='none'
                    backdropFilter='auto'
                    backdropInvert='80%'
                    backdropBlur='2px'
                />}
                <ModalContent>
                    <ModalHeader>Login</ModalHeader>
                    <ModalCloseButton />
                    <form>
                        <ModalBody>
                            <Text>Email address</Text>
                            <Input value={email} onChange={(e) => setemail(e.target.value)} type='email' />
                            <Text>Password</Text>
                            <Input value={password} onChange={(e) => setpassword(e.target.value)} type='password' />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='orange' onClick={AuthForm}>
                                Login
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            <div className="searchbox">
                <div className="secboxtwo">
                    <div id="bottonloco">
                        <div className="buttonloco">
                            <svg className="bell" xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24"><path d="M12,.042a9.992,9.992,0,0,0-9.981,9.98c0,2.57,1.99,6.592,5.915,11.954a5.034,5.034,0,0,0,8.132,0c3.925-5.362,5.915-9.384,5.915-11.954A9.992,9.992,0,0,0,12,.042ZM12,14a4,4,0,1,1,4-4A4,4,0,0,1,12,14Z" /></svg>
                            <Select id='selectoption' >
                                <option value='Andhra Pradesh'>Andhra Pradesh</option>
                                <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
                                <option value='Assam'>Assam</option>
                                <option value='Bihar'>Bihar</option>
                                <option value='Chhattisgarh'>Chhattisgarh</option>
                                <option value='Goa'>Goa</option>
                                <option value='Gujarat'>Gujarat</option>
                                <option value='Haryana'>Haryana</option>
                                <option value='Himachal Pradesh'>Himachal Pradesh</option>
                                <option value='Jharkhand'>Jharkhand</option>
                                <option value='Karnataka'>Karnataka</option>
                                <option value='Kerala'>Kerala</option>
                                <option value='Madhya Pradesh'>Madhya Pradesh</option>
                                <option value='Maharashtra'>Maharashtra</option>
                                <option value='Manipur'>Manipur</option>
                                <option value='Meghalaya'>Meghalaya</option>
                                <option value='Mizoram'>Mizoram</option>
                                <option value='Nagaland'>Nagaland</option>
                                <option value='Odisha'>Odisha</option>
                                <option value='Punjab'>Punjab</option>
                                <option value='Rajasthan'>Rajasthan</option>
                                <option value='Sikkim'>Sikkim</option>
                                <option value='Tamil Nadu'>Tamil Nadu</option>
                                <option value='Telangana'>Telangana</option>
                                <option value='Tripura'>Tripura</option>
                                <option value='Uttar Pradesh'>Uttar Pradesh</option>
                                <option value='Uttarakhand'>Uttarakhand</option>
                                <option value='West Bengal'>West Bengal</option>
                                <option value='Andaman and Nicobar Islands'>Andaman and Nicobar Islands</option>
                                <option value='Chandigarh'>Chandigarh</option>
                                <option value='Dadra and Nagar Haveli'>Dadra and Nagar Haveli</option>
                                <option value='Daman and Diu'>Daman and Diu</option>
                                <option value='Lakshadweep'>Lakshadweep</option>
                                <option value='Delhi'>Delhi</option>
                                <option value='Puducherry'>Puducherry</option>
                                <option value='Ladakh'>Ladakh</option>
                                <option value='Lakshadweep'>Lakshadweep</option>
                            </Select>
                        </div>
                    </div>

                    <div className="search">
                        <input value={value} onChange={handlechangeinput} type="text" class="search__input" placeholder="Type your text" />
                        <button onClick={handlesearch} class="search__button">
                            <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                                <g>
                                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                                </g>
                            </svg>
                        </button>
                    </div>
                    {debounce ?
                        <div id="debouncingcard">
                            {medician.map((item, index) => (
                                <li className="bouncecard" onClick={onclickdouncedata} key={index}>{item}</li>
                            ))}
                        </div> : ''}
                </div>
                <div class='searchbutton2' id='searchbutton'>
                    <h2>QUICK BUY! Get 15% Off on Medicines</h2>
                </div>
                <div id='searchbutton'>
                    <button id='buttonsearch'>
                        <div class="svg-wrapper-1">
                            <div class="svg-wrapper">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="15"
                                    height="15"
                                >
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path
                                        fill="currentColor"
                                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        <span>Quick order</span>
                    </button>
                </div>
            </div>
            <div className="dropdownmanubox">
                {dropdownStates.map((isOpen, index) => (
                    <div className="dropdown" key={index} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)}>
                        <button className="dropdown-toggle">{isOpen ? '▲' : '▼'} {data[index]}</button>
                        {isOpen && (
                            <div className="dropdown-content">
                                <div id='dropdownitem' >
                                    <h2>Vitamins & Supplements</h2>
                                    <li>Multivitamins</li>
                                    <li>Vitamin D3 </li>
                                    <li>Vitamin C</li>
                                    <li>Minerals</li>
                                    <li>Calcium</li>
                                    <li>Vitamin B12 & B Complex</li>
                                    <li>Other Vitamins</li>
                                </div>
                                <div id='dropdownitem' >
                                    <h2>Global Supplements</h2>
                                        <li>Now Foods</li>
                                        <li>Nutritional Supplements</li>
                                        <li>Dr. Morepen</li>
                                        <li>Power Gummies</li>
                                        <li>Tata 1mg Vitamins & Supplements</li>
                                        <li>HealthKart</li>
                                        <li>Carbamide Forte</li>
                                        <li>Swisse</li>
                                        <li>Zingevita</li>
                                </div>
                                <div id='dropdownitem' >
                                    <h2>Healthy Snacks & Drinks</h2>
                                        <li>Green Tea & Herbal Tea</li>
                                        <li>Energy Foods</li>
                                        <li>Rehydration Beverages</li>
                                        <li>Apple Cider Vinegar</li>
                                        <li>Nuts & Cereals</li>
                                        <span>Chyawanprasha</span>
                                </div>
                                <div id='dropdownitem' >
                                    <h2>Supplements by Concern</h2>
                                        <li>Weight Management</li>
                                        <li>Daily Wellness</li>
                                        <li>Energy</li>
                                        <li>Immunity Boosters</li>
                                        <li>Hair, Skin & Nails</li>
                                        <li>Sleep</li>
                                        <li>Bone & Joint</li>
                                        <li>Solgar</li>
                                        <li>Nordic Naturals</li>
                                        <li>Collagen</li>
                                        <li>Antioxidants</li>
                                        <li>Biotin</li>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}
export default Header