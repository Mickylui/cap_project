import { FormControl, FormLabel, Input, RadioGroup, HStack, Radio, Select, Button, Box, Flex,  useColorModeValue} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, Link as  RouteLink } from "react-router-dom";
import { BackButton } from "../../Components/BackButton";
import CartList from "./CartList";

function DeliveryAddress() {
    const [inputRoom, setRoom] = useState("");
    const [inputBuilding, setBuilding] = useState("");

    const handleInputChangeRoom = (e: { target: { value: React.SetStateAction<string> } }) =>
        setRoom(e.target.value);
    const handleInputChangeBuilding = (e: { target: { value: React.SetStateAction<string> } }) =>
        setBuilding(e.target.value);

    return (
        <div>
            <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <BackButton />
            <Box maxW='80vw' borderWidth='1px' borderRadius='lg' overflow='hidden' m="4rem auto" p="6rem">
            <Box mb='4rem' fontSize='2em'>Cart List</Box>
            <CartList />
            <FormControl id="room" mt='4rem'>
                <FormLabel>Please input your Address:</FormLabel>
                <FormLabel>Room/ Flat</FormLabel>
                <Input type="text" value={inputRoom} onChange={handleInputChangeRoom} />
            </FormControl>
            <FormControl id="building">
                <FormLabel>Building</FormLabel>
                <Input type="text" value={inputBuilding} onChange={handleInputChangeBuilding} />
            </FormControl>

            <FormControl id="district">
                <FormLabel>District</FormLabel>
                <Select placeholder="Select District">
                    <option value="option1">Central & Western</option>
                    <option value="option2">Wan Chai</option>
                    <option value="option3">Eastern</option>
                    <option value="option1">Southern</option>

                    <option value="option2">Yau Tsim Mong</option>
                    <option value="option3">Sham Shui Po</option>
                    <option value="option1">Kowloon City</option>
                    <option value="option2">Wong Tai Sin</option>
                    <option value="option3">Kwun Tung</option>
                    <option value="option1">Kwai Tsing</option>
                    <option value="option2">Tsuen Wan</option>

                    <option value="option3">Tuen Mun</option>
                    <option value="option1">Yuen Long</option>
                    <option value="option2">North</option>
                    <option value="option3">Tai Po</option>
                    <option value="option1">Sha Tin</option>
                    <option value="option2">Sai Kung</option>
                    <option value="option3">Islands</option>
                </Select>
            </FormControl>
            <FormControl id="area">
                <FormLabel as="legend">Area</FormLabel>
                <RadioGroup defaultValue="Hong Kong">
                    <HStack spacing="24px">
                        <Radio value="hongKong">Hong Kong</Radio>
                        <Radio value="kowloon">Kowloon</Radio>
                        <Radio value="newTerritories">New Territories</Radio>
                    </HStack>
                </RadioGroup>
            </FormControl>
            <Link to='/cart/contact/usePoints'>
                <Button mt='4em'>Buy/Save</Button>
            </Link>
            </Box>
            </Flex>
        </div>
    );
}

export default DeliveryAddress;
