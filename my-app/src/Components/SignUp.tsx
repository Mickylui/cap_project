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
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouteLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SignUpFetch } from "../Api/AccountFetch";

export default function SignUpCard() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
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
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target;
                                //need some checking...name, phoneNumb
                                if (form.password.value !== form.confirmPassword.value) {
                                    //need sweetAlert!
                                    alert("passwords are not the same!!");
                                    return;
                                }
                                const accountName = form.accountName.value;
                                const email = form.email.value;
                                const password = form.password.value;
                                console.log("this is data:",accountName,email, password);
                                dispatch(
                                    SignUpFetch({ accountName, email, password })
                                );
                            }}
                        >
                            {/* <HStack>
                                <Box>
                                    <FormControl isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input type="text" id="firstName" name="firstName" />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input type="text" id="lastName" name="lastName" />
                                    </FormControl>
                                </Box>
                            </HStack> */}
                            <FormControl isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input type="text" id="accountName" name="accountName" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" id="email" name="email" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
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
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                >
                                    Sign up
                                </Button>
                            </Stack>
                            <RouteLink to="/logIn">
                                <Stack pt={6}>
                                    <Text align={"center"}>
                                        Already a user? <Link color={"blue.400"}>Login</Link>
                                    </Text>
                                </Stack>
                            </RouteLink>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
