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
import { LogInFetch } from "../Api/AccountFetch";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../Redux/store";
import { BackButton } from "./BackButton";
import Swal from "sweetalert2";

export default function LogInCard() {
    const [showPassword, setShowPassword] = useState(false);
    const status = useSelector((state: RootState) => state.account.status);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    // if (status === "loading") {
    //     return (
    //         <Spinner
    //             thickness="4px"
    //             speed="0.65s"
    //             emptyColor="gray.200"
    //             color="blue.500"
    //             size="xl"
    //         />
    //     );
    // }

    async function logInSubmit(e: FormEvent) {
        // need to fetch logIn time
        e.preventDefault();
        const form = e.target as HTMLInputElement;
        const email = form.email.value;
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
        console.log("this is data:", email.length, password.length);
        const logInResponse = await dispatch(LogInFetch({ email, password }));
        console.log("logInResponse:", logInResponse);

        if (logInResponse.payload.success === true) {
            Swal.fire({
                title: "Log In",
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
                title: `${logInResponse.payload.message}`,
                showClass: {
                    popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                },
            });
        }
    }

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <BackButton />
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Log in
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    padding={20}
                >
                    <form onSubmit={logInSubmit}>
                        <Stack spacing={7}>
                            <FormControl isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" name="email" id="email" />
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
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
                                        color="blue.500"
                                        size="xl"
                                    />
                                ) : (
                                    <Button
                                    type="submit"
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                >
                                    Log In
                                </Button>
                                )}
                            </Stack>
                            <Stack pt={6}>
                                <Text align={"center"}>
                                    Not a user?{" "}
                                    <Link as={RouteLink} to="/signUp" color={"blue.400"}>
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
