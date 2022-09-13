import React from "react";
import { Input, Button, Box, Image, flexbox } from "@chakra-ui/react";

export function Products() {
    //auto slider
    //fetch data
    //link the card
    const productItem = {
        imageUrl: "./SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Airwind",
        formattedPrice: "$190",
    };
    return (
        <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center", marginTop:"20px", marginBottom:"20px"}}>
            <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                style={{ margin: "10px" }}
            >
                <Image src={productItem.imageUrl} alt={productItem.imageAlt} />
                <Box p="6">
                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                        {productItem.title}
                    </Box>
                    <Box>{productItem.formattedPrice}</Box>
                </Box>
            </Box>
            <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                style={{ margin: "10px" }}
            >
                <Image src={productItem.imageUrl} alt={productItem.imageAlt} />
                <Box p="6">
                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                        {productItem.title}
                    </Box>
                    <Box>{productItem.formattedPrice}</Box>
                </Box>
            </Box>
            <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                style={{ margin: "10px" }}
            >
                <Image src={productItem.imageUrl} alt={productItem.imageAlt} />
                <Box p="6">
                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                        {productItem.title}
                    </Box>
                    <Box>{productItem.formattedPrice}</Box>
                </Box>
            </Box>
            <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                style={{ margin: "10px" }}
            >
                <Image src={productItem.imageUrl} alt={productItem.imageAlt} />
                <Box p="6">
                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                        {productItem.title}
                    </Box>
                    <Box>{productItem.formattedPrice}</Box>
                </Box>
            </Box>
        </div>
    );
}

export default Products;
