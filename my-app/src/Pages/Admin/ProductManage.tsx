import React, { useEffect } from "react";
import { Input, Button, Box, Image, flexbox, VStack, IconButton } from "@chakra-ui/react";
import { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getProductFetch } from "../../Api/productFetch";
import ScrollToTopButton from "../../Components/ScrollToTopButton";
import { Link as RouteLink } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";

export function ProductManage() {
    const dispatch: AppDispatch = useDispatch();
    const productList = useSelector((state: RootState) => state.product.list);
    const DEVELOP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
    // const selectedProduct = (id: number) => {
    //     dispatch(selectProduct(id))
    // }
    useEffect(() => {
        dispatch(getProductFetch({}));
    }, []);

    return (
        <>
            <IconButton icon={<PlusSquareIcon />} aria-label={"add product"} />
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
                        width={"500px"}
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        style={{ margin: "10px" }}
                        display={"flex"}
                        flexWrap={"wrap"}
                        background='#DBDBDB'
                    >
                        {/* <Image src={product.imageUrl} alt={product.imageAlt} width={"100%"}/> */}

                        <Box
                            p="6"
                            display={"flex"}
                            justifyContent={"center"}
                            flexWrap={"wrap"}
                            width={"100%"}
                            
                           
                        >
                            <RouteLink to={`/admin/productDetail/${product.id}`}>
                                <Image
                                    src={`${DEVELOP_IMAGE_URL}/products/${product.image}`}
                                    margin='0 auto 0 auto'
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
                                    marginBottom='20px'
                                    
                                >
                                    {product.name}
                                </Box>

                                <VStack>
                                    <Box fontSize={{ md: "1.3rem" }}>
                                        Description: {product.description}
                                    </Box>
                                    <Box fontSize={{ md: "2rem" }}>
                                        Price: HKD {product.unit_price}
                                    </Box>
                                </VStack>
                            </RouteLink>
                        </Box>
                    </Box>
                ))}
                <ScrollToTopButton />
            </div>
        </>
    );
}

export default ProductManage;
