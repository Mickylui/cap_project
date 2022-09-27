import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Spinner,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { LogInFetch } from "../Api/accountFetch";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../Redux/store";
import { BackButton } from "./BackButton";
import Swal from "sweetalert2";
import { getCartFetch } from "../Api/productFetch";
import "./css/login.css"

export default function LogInCard() {
    const [showPassword, setShowPassword] = useState(false);

    const status = useSelector((state: RootState) => state.account.status);
    const hasLoggedIn = useSelector((state: RootState) => state.account.isLoggedIn);
    const isAdmin = useSelector((state: RootState) => state.account.isAdmin);
    const combineUserData = useSelector((state: RootState) => state.account.combineUserData);

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    async function logInSubmit(e: FormEvent) {
        // need to fetch logIn time
        e.preventDefault();
        const form = e.target as HTMLInputElement;
        const email = form.email!.value;
        const password = form.password.value;

        if (email.length === 0 || password.length === 0) {
            Swal.fire({
                title: "Please input all the fields",
                showClass: {
                    popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                },
            });
            return;
        }

        dispatch(LogInFetch({ email, password }))
            .unwrap()
            .then((logInResponse) => {
                if (logInResponse.success === true) {
                    Swal.fire({
                        title: "Log In",
                        text: `Welcome`,
                        showClass: {
                            popup: "animate__animated animate__fadeInDown",
                        },
                        hideClass: {
                            popup: "animate__animated animate__fadeOutUp",
                        },
                    }).then(() => {
                        navigate("/");
                    });
                } else {
                    Swal.fire({
                        title: `${logInResponse.message}`,
                        showClass: {
                            popup: "animate__animated animate__fadeInDown",
                        },
                        hideClass: {
                            popup: "animate__animated animate__fadeOutUp",
                        },
                    });
                }
            })
            .then(() => {
                const token = window.localStorage.getItem("token");
                dispatch(getCartFetch({ token }));
            });
    }

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            // bg={useColorModeValue("gray.50", "gray.800")}
            bg={"#F5F5F5"}

        >

            <BackButton />
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} className={"abc"}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"} color={"black"}>
                        Log in
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("#D3D3D3", "gray.700")}
                    boxShadow={"lg"}
                    padding={10}
                    width={450}
                    height={450}
                >
                    <form onSubmit={logInSubmit}>
                        <Stack spacing={7}>
                            <FormControl isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" name="email" id="email" outline={'2px solid'}/>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        outline={'2px solid'}
                                    />
                                    <InputRightElement h={"full"}>
                                        <Button
                                            variant={"ghost"}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }
                                        >
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                {status === "loading" ? (
                                    <Spinner
                                        thickness="4px"
                                        speed="0.65s"
                                        emptyColor="gray.200"
                                        color="gray.500"
                                        size="xl"
                                    
                                    />
                                ) : (
                                    <Button
                                        type="submit"
                                        loadingText="Submitting"
                                        size="lg"
                                        width={"20"}
                                        bg={"black"}
                                        color={"white"}
                                        _hover={{
                                            bg: "gray.500",
                                        }}
                            
                        
                                    >
                                        Log In
                                    </Button>
                                )}
                            </Stack>
                            <Stack pt={6}>
                                <Text align={"center"}>
                                    Not a user?{" "}
                                    <Link as={RouteLink} to="/signUp" color={"blue.900"}>
                                        signUp
                                    </Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}
