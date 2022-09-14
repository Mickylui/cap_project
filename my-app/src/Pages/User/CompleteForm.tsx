import {
    Flex,
    Stack,
    useColorModeValue,
    Text,
    Box,
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    Radio,
    RadioGroup,
    Input,
    Select,
    Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

function CompleteForm() {
    const [inputBio, setBio] = useState("");
    const [inputRoom, setRoom] = useState("");
    const [inputBuilding, setBuilding] = useState("");

    const handleInputChangeBio = (e: { target: { value: React.SetStateAction<string> } }) =>
        setBio(e.target.value);
    const handleInputChangeRoom = (e: { target: { value: React.SetStateAction<string> } }) =>
        setRoom(e.target.value);
    const handleInputChangeBuilding = (e: { target: { value: React.SetStateAction<string> } }) =>
        setBuilding(e.target.value);
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={10} mx={"auto"} maxW={"lg"} py={12} px={12}>
                <Stack align={"center"}>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        Complete form to earn more points
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    padding={20}
                >
                    <form>
                        <FormControl id="introduction">
                            <FormLabel>Bio</FormLabel>
                            <Input type="text" value={inputBio} onChange={handleInputChangeBio} />
                        </FormControl>
                        <FormControl id="age">
                            <FormLabel>Age</FormLabel>
                            <Select placeholder="Select age range">
                                <option>12 - 18</option>
                                <option> 19 - 24</option>
                                <option> 25 - 35</option>
                                <option> 35 - 54</option>
                                <option> Above 55</option>
                            </Select>
                        </FormControl>
                        <FormControl id="reason">
                            <FormLabel>Reason for joining</FormLabel>
                            <Select placeholder="Select one">
                                <option>Sport</option>
                                <option>It's fun</option>
                                <option>Because it's cool</option>
                                <option>Because of friends</option>
                            </Select>
                        </FormControl>
                        <FormControl id="level">
                            <FormLabel>Level</FormLabel>
                            <Select placeholder="Select one">
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </Select>
                        </FormControl>
                        <FormControl id="room">
                            <FormLabel>Address:</FormLabel>
                            <FormLabel>Room/ Flat</FormLabel>
                            <Input type="text" value={inputRoom} onChange={handleInputChangeRoom} />
                        </FormControl>
                        <FormControl id="building">
                            <FormLabel>Building</FormLabel>
                            <Input type="text" value={inputBuilding} onChange={handleInputChangeBuilding} />
                        </FormControl>
                        <FormControl id="district">
                            <FormLabel as="legend">District</FormLabel>
                            <RadioGroup defaultValue="Hong Kong">
                                <HStack spacing="24px">
                                    <Radio value="hongKong">Hong Kong</Radio>
                                    <Radio value="kowloon">Kowloon</Radio>
                                    <Radio value="newTerritories">New Territories</Radio>
                                </HStack>
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
                                    Submit
                                </Button>
                            </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}

export default CompleteForm;
