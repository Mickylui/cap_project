import { Box, Button, Flex, Image, Wrap, WrapItem, Text, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProductFetch } from "../Api/productFetch";
import { AppDispatch, RootState } from "../Redux/store";
import { Link as RouteLink } from "react-router-dom";
import "./css/autoSlider.css";

const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const delay = 5000;

export function Slideshow() {
    const dispatch: AppDispatch = useDispatch();
    const [index, setIndex] = React.useState(0);
    const timeoutRef: any = React.useRef(null);
    const productList = useSelector((state: RootState) => state.product.list);

    // console.log("productList:", productList);

    const DEVELOP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

    useEffect(() => {
        dispatch(getProductFetch({}));
    }, []);

    const pathName = window.location.pathname;

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    // different page: fetch diff image src
    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setIndex((prevIndex) => (prevIndex === colors.length - 1 ? 0 : prevIndex + 1)),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    return pathName === "/" ? (
        <Box className="slideshow">
            <Box
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {productList.map((product) => (
                    <Wrap
                        className="slide"
                        key={product.id}
                        align={"center"}
                        justify={"center"}
                        height={{ ml: "50em" }}
                    >
                        <WrapItem className="imageTitle" paddingRight={{ md: "10em" }}>
                            <Image
                                src={`${DEVELOP_IMAGE_URL}/products/${product.image}`}
                                alt={product.name}
                                width={"50em"}
                            />
                        </WrapItem>
                        <WrapItem
                            className="productInfo"
                            display={"box"}
                            width={"30vw"}
                            minWidth={"300px"}
                        >
                            <Box
                                className="productTitle"
                                width={"100%"}
                                textAlign={"start"}
                                marginTop={"2em"}
                                w="30"
                            >
                                {product.name}
                            </Box>
                            <Box className="productPrice" width={"100%"} textAlign={"start"}>
                                {product.unit_price}
                            </Box>
                            <Stack className="productIntro" width={{ md: "30vw" }}>
                                <Text
                                    noOfLines={[4, 7, 9]}
                                    textAlign={"start"}
                                    width={{ ml: "40rem" }}
                                    height={"max-content"}
                                    whiteSpace={"break-spaces"}
                                    marginTop={"20px"}
                                    marginBottom={"20px"}
                                >
                                    {product.description}
                                </Text>
                            </Stack>
                            <Box className="productBuyButton" width={{ ml: "40rem" }}>
                                <RouteLink
                                    to={`/products/productDetail/${product.id}`}
                                >
                                    <Button className="productButton" backgroundColor={"black"}>
                                        BUY NOW!
                                    </Button>
                                </RouteLink>
                            </Box>
                        </WrapItem>
                    </Wrap>
                ))}
            </Box>

            <Box className="slideshowDots">
                {productList.map((_, idx) => (
                    <div
                        key={idx}
                        className={`slideshowDot${index === idx ? " active" : ""}`}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </Box>
        </Box>
    ) : (
        <Box
            className="auto-Slider"
            height={"20em"}
            backgroundColor={"aliceblue"}
            overflow={"hidden"}
        >
            <Box
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {productItem.map((product) => (
                    <Wrap
                        className="slide"
                        key={product.id}
                        align={"center"}
                        justify={"center"}
                        height={{ ml: "50em" }}
                    >
                        <WrapItem className="imageTitle">
                            <Image src={product.imageUrl} alt={product.imageAlt} />
                        </WrapItem>
                    </Wrap>
                ))}
            </Box>
        </Box>
    );
}
function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
