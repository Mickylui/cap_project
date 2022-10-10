import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BackButton } from "./BackButton";

export default function SignUpCard() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const DEVELOP_HOST = process.env.REACT_APP_API_URL;
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={"#F5F5F5"}
        >
            <BackButton />
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign up
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
                    height={500}
                    // p={8}
                >
                    <Stack spacing={7}>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const form = e.target;     
                                if (form.password.value !== form.confirmPassword.value) {
                                    alert("passwords are not the same!!");
                                    return;
                                }
                                const accountName = form.accountName.value;
                                const email = form.email.value;
                                const password = form.password.value;
        

                                const resp = await fetch(`${DEVELOP_HOST}/account/signUp`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ accountName, email, password }),
                                });
                                const signUpResult = await resp.json();

                                if (signUpResult.success === true) {
                                    Swal.fire({
                                        title: "Good Decision, Welcome To Our Family",
                                        text: "Congratulations! You get 100 points for your registration. Try to get more points by completing your profile.",
                                        showClass: {
                                            popup: "animate__animated animate__fadeInDown",
                                        },
                                        hideClass: {
                                            popup: "animate__animated animate__fadeOutUp",
                                        },
                                    }).then(() => {
                                        navigate("/logIn");
                                    });
                                } else {
                                    Swal.fire({
                                        title: `${signUpResult.message}`,
                                        showClass: {
                                            popup: "animate__animated animate__fadeInDown",
                                        },
                                        hideClass: {
                                            popup: "animate__animated animate__fadeOutUp",
                                        },
                                    });
                                }
                            }}
                        >
                 
                            <FormControl isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input type="text" id="accountName" name="accountName" background='white' width={350} outline={'2px solid'} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" id="email" name="email" background='white' outline={'2px solid'}/>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        outline={'2px solid'}
                                        background='white'
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
                            <FormControl isRequired>
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        outline={'2px solid'}
                                        background='white'
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
                                <Button
                                    type="submit"
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={"black"}
                                    color={"white"}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                    width={"20"}
                                    margin='0px auto 0px auto'
                                >
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={"center"}>
                                    Already a user?{" "}
                                    <Link as={RouteLink} to="/logIn" color={"blue.900"}>
                                        Login
                                    </Link>
                                </Text>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
