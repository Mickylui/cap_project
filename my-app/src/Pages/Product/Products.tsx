import React, { useEffect } from "react";
import { Input, Button, Box, Image, flexbox, VStack, Center, HStack } from "@chakra-ui/react";
import { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getProductFetch } from "../../Api/productFetch";
import ScrollToTopButton from "../../Components/ScrollToTopButton";
import {Link as RouteLink} from "react-router-dom";

export function Products() {
    
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
                    background={"#DCDCDC"}
                    width={"25em"}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    style={{ margin: "10px" }}
                    display={"flex"}
                    // flexWrap={"wrap"}
                >
                    {/* <Image src={product.imageUrl} alt={product.imageAlt} width={"100%"}/> */}
                    
                    <RouteLink to={`/productDetail/${product.id}`} replace={true}>
                            <Center >
                                <Image 
                        // src={`${DEVELOP_IMAGE_URL}/products/${product.image}`} 
                        src="fish.jpg"
                        />
                            </Center>
                    <Box 
                        p="6"
                        display={"flex"}
                        justifyContent={"center"}
                        flexWrap={"wrap"}
                        width={"100%"}
                    >
                        
                        
                        <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"                            
                            lineHeight="tight"
                            noOfLines={1}
                            fontSize={{ md: "2rem" }}
                            margin={"20px"}
                            width={"100%"}
                            height={"50px"}
                            color='teal'
                        >
                            {(product.name).toUpperCase()}
                        </Box>
                        
                        <VStack>
                            <Box fontSize={{ md: "1.2rem" }}
                            h='6rem'                    
                            overflow='hidden'
                        //    textDecoration={'none'}
                            >Description: {product.description}</Box>
                            <HStack color='teal'>
                                <Box>HKD </Box><Box fontSize={{ md: "1.5rem" }} fontWeight='bold'>{product.unit_price}</Box>
                            </HStack>
                            
                        </VStack>
                        
                    </Box>
                    </RouteLink>
                </Box>
            ))}
            <ScrollToTopButton />
        </div>
    );
}

export default Products;
