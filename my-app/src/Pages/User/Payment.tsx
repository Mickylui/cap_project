import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./payment.module.css";
import { Box } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { clearCartItems } from "../../Api/productFetch";
import { useSelector } from "react-redux";

const CreditCard = () => {
    const product = useSelector((state: RootState) => state.cart.product);
    const token = window.localStorage.getItem("token");
    const [trigger, setTrigger] = useState(true);

    const [number, SetNumber] = useState("");
    const [name, SetName] = useState("");
    const [month, SetMonth] = useState("");
    let [expiry, SetExpiry] = useState("");
    const [cvc, SetCvc] = useState("");
    const [focus, SetFocus] = useState("");
    const handleDate = (e: { target: { value: React.SetStateAction<string> } }) => {
        SetMonth(e.target.value);
        SetExpiry(e.target.value);
    };
    const handleExpiry = (e: { target: { value: string } }) => {
        SetExpiry(month.concat(e.target.value));
    };

    const dispatch: AppDispatch = useDispatch();

    return (
        <>
            <Box p="4rem">
                {/* <div className="rccs__card backcolor"> */}

                <div className="rccs__card rccs__card--unknown">
                    <Cards number={number} name={name} expiry={expiry} cvc={cvc} focused={focus} />
                </div>

                <br />
                <form>
                    <div className="row">
                        <div className="col-sm-11">
                            <label htmlFor="name">Card Number</label>
                            <input
                                required
                                type="tel"
                                className="form-control"
                                value={number}
                                name="number"
                                maxLength="16"
                                pattern="[0-9]+"
                                onChange={(e) => {
                                    SetNumber(e.target.value);
                                }}
                                onFocus={(e) => SetFocus(e.target.name)}
                            ></input>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-11">
                            <label htmlFor="name">Card Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                name="name"
                                onChange={(e) => {
                                    SetName(e.target.value);
                                }}
                                onFocus={(e) => SetFocus(e.target.name)}
                            ></input>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div
                            className="col=sm-8"
                            style={{
                                ...{ "padding-right": "12em" },
                                ...{ "padding-left": "1em" },
                            }}
                        >
                            <label htmlFor="month">Expiration Date</label>
                        </div>
                        <div className="col=sm-4">
                            <label htmlFor="cvv">CVV</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-4">
                            <select className="form-control" name="expiry" onChange={handleDate}>
                                <option value=" ">Month</option>
                                <option value="01">Jan</option>
                                <option value="02">Feb</option>
                                <option value="03">Mar</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">Aug</option>
                                <option value="09">Sep</option>
                                <option value="10">Oct</option>
                                <option value="11">Nov</option>
                                <option value="12">Dec</option>
                            </select>
                        </div>
                        &nbsp;
                        <div className="col-sm-4">
                            <select className="form-control" name="expiry" onChange={handleExpiry}>
                                <option value=" ">Year</option>
                                <option value="21">2021</option>
                                <option value="22">2022</option>
                                <option value="23">2023</option>
                                <option value="24">2024</option>
                                <option value="25">2025</option>
                                <option value="26">2026</option>
                                <option value="27">2027</option>
                                <option value="28">2028</option>
                                <option value="29">2029</option>
                                <option value="30">2030</option>
                            </select>
                        </div>
                        <div className="col-sm-3">
                            <input
                                type="tel"
                                name="cvc"
                                maxLength="3"
                                className=" form-control card"
                                value={cvc}
                                pattern="\d*"
                                onChange={(e) => {
                                    SetCvc(e.target.value);
                                }}
                                onFocus={(e) => SetFocus(e.target.name)}
                            ></input>
                        </div>
                    </div>
                    <br />
                    <RouteLink to="promotion">
                        <input
                            type="submit"
                            className="btn btn-secondary form-control"
                            value="Submit"
                            onClick={() => {
                                setTrigger(!trigger);
                                dispatch(clearCartItems({ token }));
                                Swal.fire({
                                    title: "Thank You for your order",
                                    text: "It will be on its way in 1-3 business days. In the meantime why not go through our platform or post something yourself.",
                                    showClass: {
                                        popup: "animate__animated animate__fadeInDown",
                                    },
                                    hideClass: {
                                        popup: "animate__animated animate__fadeOutUp",
                                    },
                                });
                            }}                            
                        />
                    </RouteLink>
                </form>
            </Box>
        </>
    );
};
export default CreditCard;
