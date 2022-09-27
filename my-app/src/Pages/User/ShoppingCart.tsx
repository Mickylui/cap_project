import { useState } from "react";
import { Box, Button, Grid, GridItem, Heading, VStack, Text, background } from "@chakra-ui/react";
// import { Link as ReachLink } from "@reach/router"
import { Link as RouteLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import CartList from "./CartList";
import PayWithPoints from "./PayWithPoints";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { FaShoppingCart } from "react-icons/fa";
import { BsJustify } from "react-icons/bs";

export default function ShoppingCart() {
    const cartItemArr = useSelector((state: RootState) => state.cart.product);
    const [usePoint, setUsePoint] = useState(false);

    return (
        <div>
            {/* {usePoint ? (
                <PayWithPoints usePoint={usePoint} backToCart={() => setUsePoint(false)} /> */}
            {cartItemArr.length === 0 ? (
                    <VStack m='6rem'>
                    <Box  fontSize={'3rem'}
                    display="inline-block"
                    as="h2"
                    p="1rem"
                    bgGradient="linear(to-r, teal.400, teal.600)"
                    backgroundClip="text">
                        SHOPPING CART
                        </Box>
                    <Box fontSize={'4rem'}>
                        <FaShoppingCart color={'teal'}/>
                    </Box>

                <Box  fontSize={'2rem'}>Your cart is currently empty</Box>
                <p>Before proceed to checkout you must add some products to your shopping cart.</p>
                <p>You will find a lot of interesting products on our "Products" page.</p>
                <Link as={RouteLink} to={"/products"}>
                <Button
                    colorScheme="teal"
                    bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                    color="white"
                    variant="solid"
                    mt="1.5rem"
                >
                    Go to Store
                </Button>
            </Link>
                </VStack>
                
            ) : (
                <Grid
                    templateAreas={`"header"
                  "main"`}
                    gridTemplateRows={"60px"}
                    gridTemplateColumns={".5fr"}
                    gap="1"
                    color="blackAlpha.700"
                    fontWeight="bold"
                    width="fit-content"
                    margin={"2rem auto 2rem auto"}
                    
                    justifyItems={"center"}
                >
                    <GridItem pl="2" bg="grey.300" area={"header"} fontSize={"2rem"} >
                        Shopping Cart
                    </GridItem>
                    <GridItem pl="2"  width={"1300px"} bg="teal100" borderColor="black" border="2px" area={"main"} background={"#DBDBDB"} borderRadius={"15px"}>
                        <Box m="2em" fontSize={"1.7rem"} height={"40px"} margin={"10px auto 25px auto"}>Cart List</Box>
                        <CartList usePoint={usePoint} />
                        <Link as={RouteLink} to="/cart/contact" >
                           Use default address or click to change address
                        </Link>
                        {/* <Button mt="4em" onClick={() => setUsePoint(!usePoint)}>
                            Checkout
                        </Button> */}
                        <GridItem m="2rem">
                            <RouteLink to="/cart/payment">
                                <Button fontWeight={"700"} background={"#FFFFFF"}>Checkout</Button>
                            </RouteLink>
                        </GridItem>
                    </GridItem>

                </Grid>
            )}
        </div>
    );
}
