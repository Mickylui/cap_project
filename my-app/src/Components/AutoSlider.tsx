import { Box, Button, Flex, Image, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./css/autoSlider.css";

const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const delay = 5000;

const productItem = [
    {
        id: 1,
        imageUrl: "./SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Airwind",
        formattedPrice: "$190",
    },
    {
        id: 2,
        imageUrl: "./SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Airwind",
        formattedPrice: "$190",
    },
    {
        id: 3,
        imageUrl: "./SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Airwind",
        formattedPrice: "$190",
    },
    {
        id: 4,
        imageUrl: "./SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Airwind",
        formattedPrice: "$190",
    },
];

export function Slideshow() {
    const [index, setIndex] = React.useState(0);
    const timeoutRef: any = React.useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setIndex((prevIndex) => (prevIndex === colors.length - 1 ? 0 : prevIndex + 1)),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <Box className="slideshow">
            <Box
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {productItem.map((product) => (
                    // <Wrap className="slide" key={product.id}>
                    <Wrap className="slide" key={product.id}>
                        <WrapItem>
                            <Image src={product.imageUrl} alt={product.imageAlt} width={"20em"} />
                        </WrapItem>
                        <WrapItem display={"flex"} flexWrap={"wrap"}>
                            <Box className="productTitle" width={"100%"}>
                                {product.title}
                            </Box>
                            <Box className="productPrice" width={"100%"}>
                                {product.formattedPrice}
                            </Box>
                            <Box className="productPrice" width={"100%"}>
                            <Button className="productButton" backgroundColor={"purple"} >
                                BUY NOW!
                            </Button>
                            </Box>
                        </WrapItem>
                        {/* </WrapItem> */}
                    </Wrap>
                ))}
            </Box>

            <Box className="slideshowDots">
                {colors.map((_, idx) => (
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
    );
}
