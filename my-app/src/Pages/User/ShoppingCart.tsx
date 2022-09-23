import { useState } from "react";
import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
// import { Link as ReachLink } from "@reach/router"
import { Link as RouteLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import CartList from "./CartList";
import PayWithPoints from "./PayWithPoints";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

export default function ShoppingCart() {
    const cartItemArr = useSelector((state: RootState) => state.cart.product);
    const [usePoint, setUsePoint] = useState(false);

    return (
        <div>
            {usePoint ? (
                <PayWithPoints usePoint={usePoint} backToCart={() => setUsePoint(false)} />
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
                        <Button mt="4em" onClick={() => setUsePoint(!usePoint)}>
                            Buy/Save
                        </Button>
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
                            {cartItemArr.map((product) => (
                                <Box
                                    key={product.id}
                                    w="200px"
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    overflow="hidden"
                                    style={{ margin: "10px" }}
                                >
                                    {/* <Image src={product.imageUrl} alt={product.imageAlt} /> */}
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
                                        <Box>${product.unit_price}</Box>
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
