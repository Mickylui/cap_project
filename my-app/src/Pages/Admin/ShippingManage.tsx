import {
    Container,
    Flex,
    Box,
    Heading,
    Button,
    VStack,
    Wrap,
    WrapItem,
    Image,
    Center,
} from "@chakra-ui/react";
import { MdPhone, MdLocationOn } from "react-icons/md";
import { CheckIcon } from "@chakra-ui/icons";
import { MdOutlineCancel } from "react-icons/md";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { cancelOrderFetch, getOrderFetch, shipOrderFetch } from "../../Api/adminFetch";
import DataList from "../../Components/DataList";
import "../css/shippingManage.css";
import Swal from "sweetalert2";

export function ShippingManage() {
    // fetch order data
    const dispatch: AppDispatch = useDispatch();
    const orderData = useSelector((state: RootState) => state.admin.orderData);
    const [orderId, setOrderId] = useState<string>();
    let products = [];

    useEffect(() => {
        console.log("shipping useEffect")
        dispatch(getOrderFetch());
    }, [dispatch]);

    console.log("this is orderData:", orderData);
    const orderDetailArr = useMemo(
        () => orderData.filter((orderDetail) => orderId ? orderDetail.order_id === orderId : true),
        [orderId, orderData]
    );
    console.log("orderDetailArr:", orderDetailArr);
    const DEVELOP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

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
            <div>
                <Container maxW="full" mt={0} centerContent overflow="hidden">
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
                                                    src={`${DEVELOP_IMAGE_URL}/users/${orderDetail.icon}`}
                                                    alt={orderDetail.account_name}
                                                    boxSize="200px"
                                                    borderRadius="full"
                                                    fallbackSrc="https://res.cloudinary.com/dsabyte/image/upload/v1630411853/users/user-svgrepo-com_vdq4rw.svg"
                                                    mx="auto"
                                                />
                                                <Center>
                                                    <VStack>
                                                        <Heading>
                                                            {orderDetail.account_name}
                                                        </Heading>
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
                                                            <MdLocationOn
                                                                color="#1970F1"
                                                                size="20px"
                                                            />
                                                        }
                                                    >
                                                        {orderDetail.delivery_address}
                                                    </Button>
                                                </VStack>
                                            </Box>
                                        </Box>
                                    </WrapItem>
                                    <WrapItem>
                                        <Box bg="white" borderRadius="lg" >
                                            <Box m={8} color="#0B0E3F">
                                                <VStack spacing={5}>
                                                    <Box
                                                        display={"flex"}
                                                        width={"100%"}
                                                        justifyContent={"space-between"}
                                                    >
                                                        <Heading>Items List</Heading>
                                                        <CheckIcon
                                                            id={orderDetail.order_id}
                                                            onClick={async (e) => {
                                                                const orderId = e.target.id;
                                                                const shipOrderFetchResult =
                                                                    await dispatch(
                                                                        shipOrderFetch(orderId)
                                                                    );
                                                                if (shipOrderFetchResult) {
                                                                    Swal.fire({
                                                                        title: "ship",
                                                                        showClass: {
                                                                            popup: "animate__animated animate__fadeInDown",
                                                                        },
                                                                        hideClass: {
                                                                            popup: "animate__animated animate__fadeOutUp",
                                                                        },
                                                                    });
                                                                    await dispatch(getOrderFetch());
                                                                }
                                                            }}
                                                        />
                                                        <MdOutlineCancel
                                                            id={orderDetail.order_id}
                                                            onClick={async (e) => {
                                                                const orderId = e.target.id;
                                                                // console.log("orderId:", orderId);
                                                                const cancelOrderFetchResp =
                                                                    await dispatch(
                                                                        cancelOrderFetch(orderId)
                                                                    );
                                                                if (cancelOrderFetchResp) {
                                                                    Swal.fire({
                                                                        title: "cancel",
                                                                        showClass: {
                                                                            popup: "animate__animated animate__fadeInDown",
                                                                        },
                                                                        hideClass: {
                                                                            popup: "animate__animated animate__fadeOutUp",
                                                                        },
                                                                    });
                                                                    await dispatch(getOrderFetch());
                                                                }
                                                            }}
                                                        />
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
                        <Box >
                        <DataList setOrderId={setOrderId}  />
                        </Box>
                    </Flex>
                </Container>
            </div>
        );
    }
    return (
        <Container maxW="full" mt={0} centerContent overflow="hidden">
            <Flex className="shipping-data-container">
                <Box
                    className=""
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
                <DataList setOrderId={setOrderId} className="table" />
            </Flex>
        </Container>
    );
}
