import {
    Button,
    Divider,
    Icon,
    Stack,
    HStack,
    Input,
    useNumberInput,
    CloseButton,
    IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "../../Components/css/productDetail.scss";
import { BackButton } from "../../Components/BackButton";
import { FcLikePlaceholder } from "react-icons/fc";
import { Slideshow } from "../../Components/AutoSlider";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCartFetch, getProductDetailByProductIdFetch } from "../../Api/productFetch";
import { SmallAddIcon } from "@chakra-ui/icons";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export function AdminProductDetail() {
    const productDetail = useSelector((state: RootState) => state.product.productDetail);
    const combineUserData = useSelector((state: RootState) => state.account.combineUserData);
    // const [sizeButton, setSizeButton] = useState<number[]>([]);
    const [isEditable, setIsEditable] = useState(false);
    const { productId } = useParams();
    const [sizeValue, setSizeValue] = useState<number>();
    const {
        value: qtyValue,
        getInputProps,
        getIncrementButtonProps,
        getDecrementButtonProps,
    } = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        max: 6,
    });

    const dispatch: AppDispatch = useDispatch();

    let userId: number | string;
    if (combineUserData.length > 0) {
        userId = combineUserData[0].id as number;
    } else {
        userId = 1;
    }

    useEffect(() => {
        dispatch(getProductDetailByProductIdFetch(productId));
    }, [productId]);

    useEffect(() => {
        setSizeValue(productDetail.size[0]);
    }, [productDetail]);

    const handleDeletedSize = (size) => {
        console.log("handleDeletedSize:", size);
    };
    // const handleDeletedAddButton = () => {

    //     setSizeButton([...sizeButton, 1]);
    // };
    return (
        <>
            <Slideshow />
            <Stack>
                <div className="product-single">
                    <div className={"left-image-like-box"}>
                        <div className="backButton-box">
                            <BackButton />
                        </div>
                        <IconButton
                            icon={<AiFillEdit />}
                            aria-label={"Edit"}
                            onClick={() => setIsEditable(!isEditable)}
                        />
                        <IconButton icon={<AiFillDelete />} aria-label={"Delete"} />

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
                                const token = window.localStorage.getItem("token");

                                if (!sizeValue || !qtyValue) {
                                    return;
                                }

                                dispatch(
                                    addToCartFetch({
                                        token,
                                        product: productDetail,
                                        size: sizeValue,
                                        quantity: Number(qtyValue),
                                    })
                                );
                            }}
                        >
                            <div className="product-subtitle product-size-box">
                                <span className="product-size">
                                    <p className="product-key product-size-key">Size</p>
                                    {/* <IconButton
                                        icon={<SmallAddIcon />}
                                        aria-label={"Adding Size button"}
                                        onClick={() => handleAddSize}
                                    />
                                    {sizeButton.map((item, index) => {
                                        <Button key={index} className="product-value product-sizes">
                                            <Input />
                                            <CloseButton></CloseButton>
                                        </Button>;
                                    })} */}
                                    {productDetail.size.map((size) => (
                                        <Button
                                            key={size}
                                            onClick={() => setSizeValue(size)}
                                            colorScheme={sizeValue === size ? "teal" : "facebook"}
                                            className="product-value product-sizes"
                                        >
                                            {size}
                                        </Button>
                                    ))}
                                </span>
                            </div>

                            <div className="product-subtitle product-quantity-box">
                                <HStack maxW="320px" border={"solid"}>
                                    <Button {...getDecrementButtonProps()}>-</Button>
                                    <Input {...getInputProps()} name={"qty"} disabled />
                                    <Button {...getIncrementButtonProps()}>+</Button>
                                    <Button type="submit" isDisabled>
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

export default AdminProductDetail;