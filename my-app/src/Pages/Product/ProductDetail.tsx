import { ArrowBackIcon } from "@chakra-ui/icons";
import {
    Button,
    Divider,
    Icon,
    IconButton,
    Stack,
    TagCloseButton,
    Tag,
    HStack,
    Input,
    useNumberInput,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../../Components/css/productDetail.scss";
import { BackButton } from "../../Components/BackButton";
import { QuantityRange } from "../../Components/QuantityRange";
import { FcLikePlaceholder } from "react-icons/fc";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { Slideshow } from "../../Components/AutoSlider";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetailByProductIdFetch } from "../../Api/productFetch";

export function ProductDetail() {
    const productDetail = useSelector((state: RootState) => state.product.productDetail);
    const combineUserData = useSelector((state: RootState) => state.account.combineUserData);
    const { productId } = useParams();

    const dispatch: AppDispatch = useDispatch();

    let userId: number | string;
    if (combineUserData.length > 0) {
        userId = combineUserData[0].id as number;
    } else {
        userId = 1;
    }
    const sizes = productDetail.size as Array<number>;

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        max: 6,
    });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    const [inputValue, setInputValue] = useState(1);
    function getQuantity() {
        console.log(inputValue);
    }

    useEffect(() => {
        dispatch(getProductDetailByProductIdFetch(productId));
    }, [productId]);

    // const isAdmin = useSelector((state: RootState) => state.account.isAdmin);
    // const [isEdit, setIsEdit] = useState(false);
    // if (isAdmin === true) {
    //     return (
    //         <form
    //             onSubmit={(e) => {
    //                 e.preventDefault();
    //                 console.log("submit");
    //                 setIsEdit(false);
    //             }}
    //         >
    //             <Slideshow />
    //             <Stack>
    //                 <div className="product-single">
    //                     <div className={"left-image-like-box"}>
    //                         <div className="backButton-box">
    //                             <BackButton />
    //                         </div>
    //                         <div className="productImage-box">
    //                             <img
    //                                 className="productImage"
    //                                 src="./SkateBoardLogo.png"
    //                                 alt="skateBoard-product"
    //                             />
    //                         </div>
    //                         <div className="like-box">
    //                             {isAdmin ? (
    //                                 <Icon
    //                                     className="like"
    //                                     as={FcLikePlaceholder}
    //                                     fontSize={{ md: "2rem" }}
    //                                 />
    //                             ) : (
    //                                 <Icon
    //                                     className="like"
    //                                     as={FcLikePlaceholder}
    //                                     fontSize={{ md: "2rem" }}
    //                                 />
    //                             )}
    //                             <div className="product-like">190</div>
    //                         </div>
    //                     </div>
    //                     <div className={"right-information-box"}>
    //                         <IconButton aria-label={""} onClick={() => setIsEdit(true)}>
    //                             <AiOutlineEdit />
    //                         </IconButton>
    //                         <IconButton aria-label={""}>
    //                             <AiOutlineDelete />
    //                         </IconButton>
    //                         <div className="product-subtitle product-title-box">
    //                             {isEdit ? (
    //                                 <h2 className="product-key" contentEditable>
    //                                     PAIRS SKATING
    //                                 </h2>
    //                             ) : (
    //                                 <h2 className="product-key">PAIRS SKATING</h2>
    //                             )}
    //                         </div>
    //                         <div className="product-subtitle product-cost-box">
    //                             {isEdit ? (
    //                                 <h6 className="product-key" contentEditable>
    //                                     $0.00
    //                                 </h6>
    //                             ) : (
    //                                 <h6 className="product-key">$0.00</h6>
    //                             )}
    //                         </div>
    //                         <div className="product-subtitle product-availability-box">
    //                             <span className="product-availability">
    //                                 <h2 className="product-key">Availability</h2>
    //                                 {isEdit ? (
    //                                     <div
    //                                         className="product-value product-availability"
    //                                         contentEditable
    //                                     >
    //                                         Many
    //                                     </div>
    //                                 ) : (
    //                                     <div className="product-value product-availability">
    //                                         Many
    //                                     </div>
    //                                 )}
    //                             </span>
    //                         </div>
    //                         <div className="product-subtitle product-introduction-box">
    //                             <span className="product-introduction">
    //                                 <h2 className="product-key">Product</h2>
    //                                 {isEdit ? (
    //                                     <div
    //                                         className="product-value product-introduction"
    //                                         contentEditable
    //                                     >
    //                                         demo
    //                                     </div>
    //                                 ) : (
    //                                     <div className="product-value product-introduction">
    //                                         demo
    //                                     </div>
    //                                 )}
    //                             </span>
    //                         </div>
    //                         <Divider orientation="horizontal" />
    //                         <div className="product-subtitle product-size-box">
    //                             {isEdit ? (
    //                                 <span className="product-size">
    //                                     <h2 className="product-key product-size-key">Size</h2>
    //                                     <IconButton aria-label={""}>
    //                                         <GrAddCircle />
    //                                     </IconButton>

    //                                     <Tag className="product-value product-sizes">
    //                                         7.0
    //                                         <TagCloseButton />
    //                                     </Tag>
    //                                     <Tag className="product-value product-sizes">
    //                                         7.3
    //                                         <TagCloseButton />
    //                                     </Tag>
    //                                     <Tag className="product-value product-sizes">
    //                                         7.5
    //                                         <TagCloseButton />
    //                                     </Tag>
    //                                 </span>
    //                             ) : (
    //                                 <span className="product-size">
    //                                     <h2 className="product-key product-size-key">Size</h2>

    //                                     <div className="product-value product-sizes">7.0</div>
    //                                     <div className="product-value product-sizes">7.3</div>
    //                                     <div className="product-value product-sizes">7.5</div>
    //                                 </span>
    //                             )}
    //                         </div>
    //                         <div className="product-subtitle product-quantity-box">
    //                             <QuantityRange />
    //                         </div>
    //                         <div className="product-subtitle product-share-line-box">
    //                             {isAdmin ? (
    //                                 <Button isDisabled>Copy link</Button>
    //                             ) : (
    //                                 <Button>Copy link</Button>
    //                             )}
    //                         </div>
    //                     </div>
    //                 </div>
    //                 {isEdit ? (
    //                     <div className="submit-button">
    //                         <button type="submit">Save</button>
    //                     </div>
    //                 ) : (
    //                     <></>
    //                 )}
    //             </Stack>
    //         </form>
    //     );
    // }
    return (
        <>
            <Slideshow />
            <Stack>
                <div className="product-single">
                    <div className={"left-image-like-box"}>
                        <div className="backButton-box">
                            <BackButton />
                        </div>

                        <div className="productImage-box">
                            <img
                                className="productImage"
                                src="./SkateBoardLogo.png"
                                alt="skateBoard-product"
                            />
                        </div>
                        <div className="like-box">
                            <Icon
                                className="like"
                                as={FcLikePlaceholder}
                                fontSize={{ md: "2rem" }}
                            />
                            <div className="product-like">190</div>
                        </div>
                    </div>
                    <div className={"right-information-box"}>
                        <div className="product-subtitle product-title-box">
                            <h2 className="product-key">{productDetail.name}</h2>
                        </div>
                        <div className="product-subtitle product-cost-box">
                            <h6 className="product-key">${productDetail.unit_price}</h6>
                        </div>
                        <div className="product-subtitle product-availability-box">
                            <span className="product-availability">
                                <h2 className="product-key">Availability</h2>
                                <div className="product-value product-availability">
                                    {productDetail.quantity}
                                </div>
                            </span>
                        </div>
                        <div className="product-subtitle product-introduction-box">
                            <span className="product-introduction">
                                <h2 className="product-key">Product</h2>
                                <div className="product-value product-introduction">
                                    {productDetail.description}
                                </div>
                            </span>
                        </div>
                        <Divider orientation="horizontal" />

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target;
                                console.log("form", form);
                                const quantity = form.qty.value;
                                console.log("qty", quantity);
                            }}
                        >
                            <div className="product-subtitle product-size-box">
                                <span className="product-size">
                                    <h2 className="product-key product-size-key">Size</h2>

                                    {sizes.map((size) => (
                                        <Button
                                            colorScheme="teal"
                                            className="product-value product-sizes"
                                        >
                                            {size}
                                        </Button>
                                    ))}
                                </span>
                            </div>

                            <div className="product-subtitle product-quantity-box">
                                <HStack maxW="320px" border={"solid"}>
                                    <Button {...dec}>-</Button>
                                    <Input {...input} name={"qty"} />
                                    <Button {...inc}>+</Button>
                                    <Button onClick={() => getQuantity()} type="submit">
                                        Add to Cart
                                    </Button>
                                </HStack>
                            </div>
                        </form>
                        <div className="product-subtitle product-share-line-box">
                            <button>Copy link</button>
                        </div>
                    </div>
                </div>
            </Stack>
        </>
    );
}

export default ProductDetail;
