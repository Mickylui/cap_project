import { Box, FormControl, FormLabel, Input, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { ImageUpload } from "../../Components/ImageUpload";

function Settings() {
    const userProfile = {
        id: 1,
        userName: "Jason",
        firstName: "Jason",
        lastName: "Lee",
        bio: "I love basketball, skateboard & swimming",
        icon: " ",
        email: "jason@tecky.io",
        password: "1234",
        confirm_password: "",
        address: "New Territories, Tsuen Wan West, One Town",
        contact: "123456",
    };
    const [userName, setUsername] = useState("");

    return (
        <div>
            <Box p="2rem" borderWidth="1px" borderRadius="lg" overflow="hidden" m="4rem">
                <Box mb="2rem" fontWeight='bold' fontSize='2rem'>Settings</Box>

                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>Username:</FormLabel>
                        <Input type="string" placeholder={userProfile.userName}></Input>
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>First Name:</FormLabel>
                        <Input type="string" placeholder={userProfile.firstName}></Input>
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>Last Name:</FormLabel>
                        <Input type="string" placeholder={userProfile.lastName}></Input>
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>Bio:</FormLabel>
                        <Input type="string" placeholder={userProfile.bio}></Input>
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>Email:</FormLabel>
                        <Input type="string" placeholder={userProfile.email}></Input>
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>Password:</FormLabel>
                        <Input type="string" placeholder={userProfile.password}></Input>
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>Confirm Password</FormLabel>
                        <Input type="string" placeholder={userProfile.password}></Input>
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>Address</FormLabel>
                        <Input type="string" placeholder={userProfile.address}></Input>
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>Contact</FormLabel>
                        <Input type="string" placeholder={userProfile.contact}></Input>
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack>
                        <FormLabel>Profile Image:</FormLabel>
                    <ImageUpload />
                    </HStack>
                    
                </FormControl>
            </Box>
        </div>
    );
}

export default Settings;
