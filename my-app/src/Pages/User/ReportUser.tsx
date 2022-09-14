import React, { useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
    Text,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    VStack,
    Input,
    Radio,
    RadioGroup,
    Select,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";

function ReportUser() {
    const [ reason, setReason ] = useState("");
    const [message, setMessage] = useState("");
    
    const handleChange = (e: { target: { value: React.SetStateAction<string> } }) =>
        setMessage(e.target.value);
    return (
        <div>
            <Box w="100%" fontSize="2rem">
                Report User
            </Box>
            <ArrowBackIcon />
            <Flex
                minH={"100vh"}
                // align={"center"}
                // justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                <Stack spacing={10} mx={"auto"} maxW={"lg"} py={12} px={12}>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        padding={20}
                    >
                        <form>
                            <FormControl id="reportUser">
                                <FormLabel as="legend">Please select a problem</FormLabel>
                                <RadioGroup onChange={setReason}>
                                    <VStack spacing="24px">
                                        <Radio value="fakeAccount">Fake Account</Radio>
                                        <Radio value="nudity">Nudity or Sexual Content</Radio>
                                        <Radio >
                                            Others
                                            <Input
                                                variant='outline' placeholder='Please specify'
                                                type="text"
                                                id="message"
                                                name="message"
                                                onClick={(e)=>handleChange}
                                                value={message}
                                            />
                                        </Radio>
                                    </VStack>
                                </RadioGroup>
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
                                    Report
                                </Button>
                            </Stack>                            
                        </form>
                    </Box>
                </Stack>
            </Flex>
        </div>
    );
}

export default ReportUser;
