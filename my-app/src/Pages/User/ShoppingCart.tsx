import { useState } from "react";
import { Box, Button, Grid, GridItem, VStack } from "@chakra-ui/react";
// import { Link as ReachLink } from "@reach/router"
import { Link as RouteLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import CartList from "./CartList";
import PayWithPoints from "./PayWithPoints";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { FaShoppingCart } from "react-icons/fa";

export default function ShoppingCart() {
    const cartItemArr = useSelector((state: RootState) => state.cart.product);
    const [usePoint, setUsePoint] = useState(false);

    return (
        <div>
            {/* {cartItemArr.length === 0? (<p>Your cart is currently empty</p>): ()} */}
            {/* {usePoint ? (
                <PayWithPoints usePoint={usePoint} backToCart={() => setUsePoint(false)} /> */}
                { cartItemArr.length === 0? ( 
                    <VStack m='6rem'>
                    <Box  fontSize={'3rem'}>SHOPPING CART</Box>
                    <Box fontSize={'2rem'}>
                        <FaShoppingCart />
                    </Box>
                    
                <Box  fontSize={'2rem'}>Your cart is currently empty</Box>
                <p>Before proceed to checkout you must add some products to your shopping cart.</p>
                <p>You will find a lot of interesting products on our "Products" page.</p>
                </VStack>
            ) : (
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
                        <CartList usePoint={usePoint} />
                        <Link as={RouteLink} to="/cart/contact">
                            Use default address or click to change address
                        </Link>
                        {/* <Button mt="4em" onClick={() => setUsePoint(!usePoint)}>
                            Checkout
                        </Button> */}
                        <GridItem m="2rem">
                            <RouteLink to="/cart/payment">
                                <Button>Checkout</Button>
                            </RouteLink>
                        </GridItem>
                    </GridItem>

                    {/* show products */}
                    <GridItem pl="2" bg="grey.300" area={"main"}>
                        Your Items in detail
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                marginTop: "20px",
                                marginBottom: "20px",
                            }}
                        >
                            {cartItemArr.map((product) => (
                                <Box
                                    key={product.id}
                                    w="200px"
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    overflow="hidden"
                                    style={{ margin: "10px" }}
                                >
                                    {/* <Image src={product.image} alt={product.name} /> */}
                                    <Box p="6">
                                        <Box
                                            mt="1"
                                            fontWeight="semibold"
                                            as="h4"
                                            lineHeight="tight"
                                            noOfLines={1}
                                        >
                                            {product.name}
                                        </Box>
                                        <Box>Price: ${product.unit_price}</Box>
                                        <Box>Quantity: {product.quantity}</Box>
                                        <Box>Size: {Number(product.size)}</Box>
                                    </Box>
                                </Box>
                            ))}
                        </div>
                    </GridItem>
                </Grid>
            )}
        </div>
    );
}
