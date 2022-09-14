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
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    style={{ margin: "10px" }}
                >
                    <Image src={product.imageUrl} alt={product.imageAlt} />
                    <Box p="6">
                        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                            {product.title}
                        </Box>
                        <Box>{product.formattedPrice}</Box>
                    </Box>
                </Box>)
            )}
        </div>
    );
}

export default Products;
