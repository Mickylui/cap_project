import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    IconButton,
    Button,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
    Image,
    Center,
} from "@chakra-ui/react";
import { MdPhone, MdEmail, MdLocationOn, MdFacebook, MdOutlineEmail } from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import { CheckIcon } from "@chakra-ui/icons";
import { MdOutlineCancel } from "react-icons/md";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getOrderFetch } from "../../Api/adminFetch";
import DataList from "../../Components/DataList";
export function ShippingManage() {
    // fetch order data
    const dispatch: AppDispatch = useDispatch();
    const orderData = useSelector((state: RootState) => state.admin.orderData);
    const [orderId, setOrderId] = useState("");
    // console.log("this is orderId:", orderId);
    let products = [];
    useEffect(() => {
        const getOrderData = async () => {
            const getOrderFetchResp = await dispatch(getOrderFetch());
            console.log("getOrderFetchResp:", getOrderFetchResp);
        };
        getOrderData();
    }, []);

    const data = {
        _id: "ats1999",
        name: "Jason",
        profileTagLine: "Fullstack",
        location: "Tsuen Wan",
        bio: "I Love basketball, skateboard and swimming",
        skills: ["nodejs", "reactjs", "java", "c++"],
        socialProfiles: {},
    };
    console.log("this is orderData:", orderData);
    const orderDetailArr = useMemo(
        () => orderData.filter((orderDetail) => orderDetail.order_id === orderId),
        [orderId]
    );
    console.log("orderDetailArr:", orderDetailArr);
    const DEVELOP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

    // const handleShipping = () =>{
    //     await
    // }

    if (orderDetailArr.length > 0) {
        products = [];
        const orderDetail = orderDetailArr[0];
        console.log("orderDetail:", orderDetail);
        for (let i = 0; i < orderDetail.name_size_quantity_price.length; i++) {
            const info = orderDetail.name_size_quantity_price[i].split(",");
            const combineProduct = {
                productName: info[0],
                productSize: info[1],
                productQuantity: info[2],
                productPrice: info[3],
            };
            products.push(combineProduct);
            console.log(orderDetail.name_size_quantity_price[i]);
        }
        return (
            <Container bg="#9DC4FB" maxW="full" mt={0} centerContent overflow="hidden">
                <Flex>
                    <Box
                        bg="#02054B"
                        color="white"
                        borderRadius="lg"
                        // m={{ sm: 4, md: 16, lg: 10 }}
                        p={{ sm: 5, md: 5, lg: 16 }}
                    >
                        <Box p={4}>
                            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                                <WrapItem>
                                    <Box>
                                        <Container mt={4}>
                                            <Image
                                                src={`${DEVELOP_IMAGE_URL}/${orderDetail.icon}`}
                                                alt={orderDetail.account_name}
                                                boxSize="200px"
                                                borderRadius="full"
                                                fallbackSrc="https://res.cloudinary.com/dsabyte/image/upload/v1630411853/users/user-svgrepo-com_vdq4rw.svg"
                                                mx="auto"
                                            />
                                            <Center>
                                                <VStack>
                                                    <Heading>{orderDetail.account_name}</Heading>
                                                </VStack>
                                            </Center>
                                        </Container>
                                        <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                                            <VStack pl={0} spacing={3} alignItems="flex-start">
                                                <Button
                                                    size="md"
                                                    height="48px"
                                                    width="200px"
                                                    variant="ghost"
                                                    color="#DCE2FF"
                                                    _hover={{ border: "2px solid #1C6FEB" }}
                                                    leftIcon={
                                                        <MdPhone color="#1970F1" size="20px" />
                                                    }
                                                >
                                                    {orderDetail.contact}
                                                </Button>
                                                <Button
                                                    size="md"
                                                    height="48px"
                                                    width="200px"
                                                    variant="ghost"
                                                    color="#DCE2FF"
                                                    _hover={{ border: "2px solid #1C6FEB" }}
                                                    leftIcon={
                                                        <MdLocationOn color="#1970F1" size="20px" />
                                                    }
                                                >
                                                    {orderDetail.delivery_address}
                                                </Button>
                                            </VStack>
                                        </Box>
                                    </Box>
                                </WrapItem>
                                <WrapItem>
                                    <Box bg="white" borderRadius="lg">
                                        <Box m={8} color="#0B0E3F">
                                            <VStack spacing={5}>
                                                <Box
                                                    display={"flex"}
                                                    width={"100%"}
                                                    justifyContent={"space-between"}
                                                >
                                                    <Heading>Items List</Heading>
                                                    <CheckIcon onClick={() => {}} />
                                                    <MdOutlineCancel />
                                                </Box>
                                                {/* need table!! */}
                                                <table>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Product</th>
                                                        <th>Number</th>
                                                        <th>Size</th>
                                                        <th>Price</th>
                                                    </tr>
                                                    {products.map((product, index) => (
                                                        <tr key={`orderIndex_${index + 1}`}>
                                                            <td>{index + 1}</td>
                                                            <td>{product.productName}</td>
                                                            <td>{product.productQuantity}</td>
                                                            <td>{product.productSize}</td>
                                                            <td>{product.productPrice}</td>
                                                        </tr>
                                                    ))}
                                                </table>
                                            </VStack>
                                        </Box>
                                    </Box>
                                </WrapItem>
                            </Wrap>
                        </Box>
                    </Box>
                    <DataList setOrderId={setOrderId} />
                </Flex>
            </Container>
        );
    }
    return (
        <Container bg="#9DC4FB" maxW="full" mt={0} centerContent overflow="hidden">
            <Flex>
                <Box
                    bg="#02054B"
                    color="white"
                    borderRadius="lg"
                    // m={{ sm: 4, md: 16, lg: 10 }}
                    p={{ sm: 5, md: 5, lg: 16 }}
                >
                    <Box p={4}>
                        <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                            <WrapItem>
                                <Box></Box>
                            </WrapItem>
                            <WrapItem></WrapItem>
                        </Wrap>
                    </Box>
                </Box>
                <DataList setOrderId={setOrderId} />
            </Flex>
        </Container>
    );
}
