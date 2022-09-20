import React, { useEffect } from "react";
import { Input, Button, Box, Image, flexbox, VStack } from "@chakra-ui/react";
import { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouteLink } from "react-router-dom";
import { getProductFetch } from "../../Api/productFetch";
import ScrollToTopButton from "../../Components/ScrollToTopButton";

export function Products() {
    //auto slider
    //fetch data
    //link the card
    // const productItem = [
    //     {
    //         id:1,
    //         imageUrl: "./SkateBoardLogo.png",
    //         imageAlt: "SkateBoardLogo",
    //         title: "Airwind",
    //         formattedPrice: "$190",
    //     },
    //     {
    //         id:2,
    //         imageUrl: "./SkateBoardLogo.png",
    //         imageAlt: "SkateBoardLogo",
    //         title: "Airwind",
    //         formattedPrice: "$190",
    //     },
    //     {
    //         id:3,
    //         imageUrl: "./SkateBoardLogo.png",
    //         imageAlt: "SkateBoardLogo",
    //         title: "Airwind",
    //         formattedPrice: "$190",
    //     },
    //     {
    //         id:4,
    //         imageUrl: "./SkateBoardLogo.png",
    //         imageAlt: "SkateBoardLogo",
    //         title: "Airwind",
    //         formattedPrice: "$190",
    //     },
    // ];
    const dispatch: AppDispatch = useDispatch();
    const productList = useSelector((state: RootState) => state.product.list);

    async function getProduct() {
        // @ts-ignore
        const getProductResponse = await dispatch(getProductFetch());
        console.log("this is getProductResponse:", getProductResponse);
        return;
    }
    
    useEffect(() => {
        // console.log("state:", store.getState());
        getProduct();
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: "20px",
                marginBottom: "20px",
            }}
        >
            {productList.map((product) => (
                <Box
                    key={product.id}
                    // maxW="sm"
                    width={"50em"}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    style={{ margin: "10px" }}
                    display={"flex"}
                    flexWrap={"wrap"}
                >
                    {/* <Image src={product.imageUrl} alt={product.imageAlt} width={"100%"}/> */}
                    
                    <Box
                        p="6"
                        display={"flex"}
                        justifyContent={"center"}
                        flexWrap={"wrap"}
                        width={"100%"}
                    >
                        <RouteLink to="productDetailPage">
                        <Image 
                        src={product.image} 
                        // src="./SkateBoardLogo.png"
                        />
                        <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            noOfLines={1}
                            fontSize={{ md: "2rem" }}
                            width={"100%"}
                        >
                            {product.name}
                        </Box>
                        
                        <VStack>
                            <Box fontSize={{ md: "2rem" }}>Description: {product.description}</Box>
                            <Box fontSize={{ md: "2rem" }}>Price: HKD {product.unit_price}</Box>
                        </VStack>
                        </RouteLink>
                    </Box>
                    
                </Box>
            ))}
            <ScrollToTopButton />
        </div>
    );
}

export default Products;
