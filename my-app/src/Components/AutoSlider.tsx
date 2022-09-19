import { Box, Button, Flex, Image, Wrap, WrapItem, Text, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
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
                {productItem.map((product) => (
                    <Wrap
                        className="slide"
                        key={product.id}
                        align={"center"}
                        justify={"center"}
                        height={{ ml: "50em" }}
                    >
                        <WrapItem className="imageTitle" paddingRight={{ md: "10em" }}>
                            <Image src={product.imageUrl} alt={product.imageAlt} width={"50em"} />
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
                                {product.title}
                            </Box>
                            <Box className="productPrice" width={"100%"} textAlign={"start"}>
                                {product.formattedPrice}
                            </Box>
                            <Stack className="productIntro" width={{ md: "30vw" }}>
                                <Text
                                    noOfLines={[4, 7, 9]}
                                    textAlign={"start"}
                                    width={{ ml: "40rem" }}
                                    height={"15em"}
                                    whiteSpace={"break-spaces"}
                                    marginTop={"20px"}
                                    marginBottom={"20px"}
                                >
                                    ritatis recusandae reprehenderit. Lorem ipsum dolor sit, amet
                                    consectetur adipisicing elit. Qui quam dolore voluptatum aperiam
                                    officia, porro harum voluptatem quae nihil, neque nobis
                                    asperiores facere blanditiis velit, in alias ipsum quaerat
                                    dolorum. Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit. Culpa nam minima ipsam itaque id sit quibusdam sed velit
                                    odio, in reiciendis earum necessitatibus laudantium cumque non
                                    omnis! Fugiat, vitae? Quo?
                                </Text>
                            </Stack>
                            <Box className="productPrice" width={{ ml: "40rem" }}>
                                <Button className="productButton" backgroundColor={"black"}>
                                    BUY NOW!
                                </Button>
                            </Box>
                        </WrapItem>
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
    ) : (
        <Box className="auto-Slider" height={"20em"} backgroundColor={"aliceblue"} overflow={"hidden"}>
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
                            <Image src={product.imageUrl} alt={product.imageAlt}/>
                        </WrapItem>
                    </Wrap>
                ))}
            </Box>
        </Box>
    );
}
