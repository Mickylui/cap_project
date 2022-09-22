import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Box, FormControl, FormLabel, Input, HStack, Flex, IconButton, Radio, RadioGroup } from "@chakra-ui/react";
import React, { useState } from "react";
import { FileUpload } from "../../Components/FileUpload";
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
    const [isEditable, setEditable] = useState(false);
    // console.log("isEditable:", isEditable);
    const [userName, setUsername] = useState("");
    const [inputRoom, setRoom] = useState("");
    const [inputBuilding, setBuilding] = useState("");

    const handleInputChangeRoom = (e: { target: { value: React.SetStateAction<string> } }) =>
        setRoom(e.target.value);
    const handleInputChangeBuilding = (e: { target: { value: React.SetStateAction<string> } }) =>
        setBuilding(e.target.value);

    if (isEditable) {
        return (
            <div>
                <Box p="2rem" borderWidth="1px" borderRadius="lg" overflow="hidden" m="4rem">
                    <Box mb="2rem" fontWeight="bold" fontSize="2rem">
                        Settings
                    </Box>

                    <FormControl>
                        <HStack spacing="2rem">
                            <FormLabel>Username:</FormLabel>
                            <Input type="string" placeholder={userProfile.userName} />
                        </HStack>
                    </FormControl>
                    <FormControl>
                        <HStack spacing="2rem">
                            <FormLabel>First Name:</FormLabel>
                            <Input type="string" placeholder={userProfile.firstName} />
                        </HStack>
                    </FormControl>
                    <FormControl>
                        <HStack spacing="2rem">
                            <FormLabel>Last Name:</FormLabel>
                            <Input type="string" placeholder={userProfile.lastName} />
                        </HStack>
                    </FormControl>
                    <FormControl>
                        <HStack spacing="2rem">
                            <FormLabel>Bio:</FormLabel>
                            <Input type="string" placeholder={userProfile.bio} />
                        </HStack>
                    </FormControl>
                    <FormControl>
                        <HStack spacing="2rem">
                            <FormLabel>Email:</FormLabel>
                            <Input type="string" placeholder={userProfile.email} />
                        </HStack>
                    </FormControl>
                    <FormControl>
                        <HStack spacing="2rem">
                            <FormLabel>Password:</FormLabel>
                            <Input type="string" placeholder={userProfile.password} />
                        </HStack>
                    </FormControl>
                    <FormControl>
                        <HStack spacing="2rem">
                            <FormLabel>Confirm Password</FormLabel>
                            <Input type="string" placeholder={userProfile.password} />
                        </HStack>
                    </FormControl>
                    <FormControl>
                        <HStack spacing="2rem">
                            {/* <FormLabel>Address</FormLabel>
                            <Input type="string" placeholder={userProfile.address} /> */}
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
                        </HStack>
                    </FormControl>
                    <FormControl>
                        <HStack spacing="2rem">
                            <FormLabel>Contact</FormLabel>
                            <Input type="string" placeholder={userProfile.contact} />
                        </HStack>
                    </FormControl>
                    <FormControl>
                        <HStack>
                            <FormLabel>Profile Image:</FormLabel>
                            <FileUpload />
                        </HStack>
                    </FormControl>
                </Box>
            </div>
        );
    }
    return (
        <div>
            <Box p="2rem" borderWidth="1px" borderRadius="lg" overflow="hidden" m="4rem">
                <Box mb="2rem" fontWeight="bold" fontSize="2rem">
                    Settings
                </Box>
                <Flex justifyContent="center">
                    {isEditable ? (
                        <></>
                    ) : (
                        <IconButton
                            size="sm"
                            icon={<EditIcon />}
                            onClick={() => setEditable(true)}
                            aria-label={""}
                        />
                    )}
                </Flex>
                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>Username:</FormLabel>
                        <Input type="string" placeholder={userProfile.userName} isReadOnly />
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>First Name:</FormLabel>
                        <Input type="string" placeholder={userProfile.firstName} isReadOnly />
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>Last Name:</FormLabel>
                        <Input type="string" placeholder={userProfile.lastName} isReadOnly />
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>Bio:</FormLabel>
                        <Input type="string" placeholder={userProfile.bio} isReadOnly />
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>Email:</FormLabel>
                        <Input type="string" placeholder={userProfile.email} isReadOnly />
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>Password:</FormLabel>
                        <Input type="string" placeholder={userProfile.password} isReadOnly />
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>Confirm Password</FormLabel>
                        <Input type="string" placeholder={userProfile.password} isReadOnly />
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>Address</FormLabel>
                        <Input type="string" placeholder={userProfile.address} isReadOnly />
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack spacing="2rem">
                        <FormLabel>Contact</FormLabel>
                        <Input type="string" placeholder={userProfile.contact} isReadOnly />
                    </HStack>
                </FormControl>
                <FormControl>
                    <HStack>
                        <FormLabel>Profile Image:</FormLabel>
                        <FileUpload />
                    </HStack>
                </FormControl>
            </Box>
            {isEditable===true ? (
                <IconButton
                    size="sm"
                    icon={<CloseIcon />}
                    onClick={() => setEditable(false)}
                    aria-label={""}
                />
            ) : (
                <></>
            )}
        </div>
    );
}

export default Settings;
