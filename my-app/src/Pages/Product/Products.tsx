import React from "react";
import { Input, Button, Box, Image, flexbox } from "@chakra-ui/react";

export function Products() {
    //auto slider
    //fetch data
    //link the card
    const productItem = [
        {
            id:1,
            imageUrl: "./SkateBoardLogo.png",
            imageAlt: "SkateBoardLogo",
            title: "Airwind",
            formattedPrice: "$190",
        },
        {
            id:2,
            imageUrl: "./SkateBoardLogo.png",
            imageAlt: "SkateBoardLogo",
            title: "Airwind",
            formattedPrice: "$190",
        },
        {
            id:3,
            imageUrl: "./SkateBoardLogo.png",
            imageAlt: "SkateBoardLogo",
            title: "Airwind",
            formattedPrice: "$190",
        },
        {
            id:4,
            imageUrl: "./SkateBoardLogo.png",
            imageAlt: "SkateBoardLogo",
            title: "Airwind",
            formattedPrice: "$190",
        },
    ];
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
            {productItem.map((product) => 
                (<Box
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
                    <Image src={product.imageUrl} alt={product.imageAlt} width={"100%"}/>
                    <Box p="6" display={"flex"} justifyContent={"center"} flexWrap={"wrap"}  width={"100%"}>
                        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1} fontSize={{md:"5rem"}}  width={"100%"}>
                            {product.title}
                        </Box>
                        <Box fontSize={{md:"2rem"}}>{product.formattedPrice}</Box>
                    </Box>
                </Box>)
            )}
        </div>
    );
}

export default Products;
