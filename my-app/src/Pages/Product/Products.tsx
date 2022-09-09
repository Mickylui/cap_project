import React from "react";
import { Input, Button, Box, Image } from "@chakra-ui/react";

function Products() {
    const productItem = {
        imageUrl: "./SkateBoardLogo.png",
        imageAlt: "SkateBoardLogo",
        title: "Airwind",
        formattedPrice: "$1,90.00",
    };
    return (
        <div>
            <>
                <Input size="lg" htmlSize={50} width="auto" margin="50px" type="text" value="" />
                <Button colorScheme="teal" size="md">
                    Search
                </Button>

                <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Image src={productItem.imageUrl} alt={productItem.imageAlt} />

                    <Box p="6">
                        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                            {productItem.title}
                        </Box>

                        <Box>{productItem.formattedPrice}</Box>
                    </Box>
                </Box>
            </>
        </div>
    );
}

export default Products;
