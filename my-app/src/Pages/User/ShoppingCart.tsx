import React from "react";
import { Box, Button, Grid, GridItem, Image } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";


function ShoppingCart() {
    const cart = [
        {
            order: 1,
            product: "PAIRS SKATING",
            num: 2,
            size: "7.0",
            unitPrice: 190,
        },
        {
            order: 2,
            product: "PAIRS SKATING",
            num: 1,
            size: "7.3",
            unitPrice: 190,
        },
    ];

    const selectedItem = [
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
    return (
        <div>
            <Grid
                templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
                gridTemplateRows={"60px 1fr"}
                gridTemplateColumns={".5fr 1fr"}
                gap="1"
                color="blackAlpha.700"
                fontWeight="bold"
                margin="2rem"
            >
                <GridItem pl="2" bg="grey.300" area={"header"}>
                    Shopping Cart
                </GridItem>
                <GridItem pl="2" bg="teal" borderColor="black" border="1px" area={"nav"}>
                    <Box m="2em">Cart List</Box>
                    <div>
                        <TableContainer>
                            <Table size="sm">
                                <Thead>
                                    <Tr>
                                        <Th>Order</Th>
                                        <Th>Product</Th>
                                        <Th>Qty</Th>
                                        <Th>Size</Th>
                                        <Th>Amount</Th>
                                    </Tr>
                                </Thead>
                                {cart.map((item) => (
                                    <Tbody>
                                        <Tr>
                                            <Td>{item.order}</Td>
                                            <Td>{item.product}</Td>
                                            <Td>{item.num}</Td>
                                            <Td>{item.size}</Td>
                                            <Td>
                                                {`$ ${item.unitPrice*item.num}`}
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                ))}
                                <Tfoot>
                                    <Tr>
                                        <Th>Total</Th>
                                        <Th></Th>
                                        <Th></Th>
                                        <Th></Th>
                                        <Th>{`$ `}</Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </div>
                    <>Use default address or click to change address</>
                    <Button mt='6em'>Buy/Save</Button>
                </GridItem>

                {/* show products */}
                <GridItem pl="2" bg="grey.300" area={"main"}>
                    Your Items
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            marginTop: "20px",
                            marginBottom: "20px",
                        }}
                    >
                        {selectedItem.map((product) => (
                            <Box
                                key={product.id}
                                w="200px"
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                style={{ margin: "10px" }}
                            >
                                <Image src={product.imageUrl} alt={product.imageAlt} />
                                <Box p="6">
                                    <Box
                                        mt="1"
                                        fontWeight="semibold"
                                        as="h4"
                                        lineHeight="tight"
                                        noOfLines={1}
                                    >
                                        {product.title}
                                    </Box>
                                    <Box>{product.formattedPrice}</Box>
                                </Box>
                            </Box>
                        ))}
                    </div>
                </GridItem>
            </Grid>
        </div>
    );
}

export default ShoppingCart;
