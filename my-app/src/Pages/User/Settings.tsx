import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useColorModeValue } from "@chakra-ui/react"
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Flex,
    IconButton,
    Radio,
    RadioGroup,
    Button,
} from "@chakra-ui/react";
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
                <Box p="2rem" borderWidth="1px" borderRadius="lg" overflow="hidden" m="4rem" background={"#DBDBDB"}>
                    <Box mb="2rem" fontWeight="bold" fontSize="2rem">
                        Settings
                    </Box>

                    <FormControl>
                       
                            <FormLabel>Username:</FormLabel>
                            <Input type="string"  outline={'2px solid'}/>
                     
                    </FormControl>
                    <FormControl>
                        
                            <FormLabel mt="1rem">First Name:</FormLabel>
                            <Input type="string"  outline={'2px solid'}/>
                        
                    </FormControl>
                    <FormControl>
                        
                            <FormLabel mt="1rem">Last Name:</FormLabel>
                            <Input type="string"  outline={'2px solid'}/>
                        
                    </FormControl>
                    <FormControl>
                       
                            <FormLabel mt="1rem">Bio:</FormLabel>
                            <Input type="string"  outline={'2px solid'}/>
                        
                    </FormControl>
                    <FormControl>
                        
                            <FormLabel mt="1rem">Email:</FormLabel>
                            <Input type="string" outline={'2px solid'}/>
                       
                    </FormControl>
                    <FormControl>
                        
                            <FormLabel mt="1rem">Password:</FormLabel>
                            <Input type="string" outline={'2px solid'}/>
                       
                    </FormControl>
                    <FormControl>
                        
                            <FormLabel mt="1rem">Confirm Password</FormLabel>
                            <Input type="string" outline={'2px solid'}/>
                        
                    </FormControl>
                    <FormControl>
                       
                            <FormControl>
                               
                                    <FormLabel mt="1rem">Address:</FormLabel>
                                    <Input type="string" outline={'2px solid'}/>
                                
                            </FormControl>
                       
                    </FormControl>
                    <FormControl>
                       
                            <FormLabel mt="1rem">Contact</FormLabel>
                            <Input type="string" outline={'2px solid'}/>
                            
                        
                    </FormControl>
                    <FormControl mt="2rem">
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
        <div style={{display:'flex' ,justifyContent:'center' }}>
            
            <Box p="2rem" border="2px solid black" width='650px' borderRadius="lg" overflow="hidden" m="4rem" background={"#DBDBDB"}>
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
                   
                        <FormLabel>Username:</FormLabel>
                        <Input type="string"  isReadOnly borderColor="black"  background={'white'}/>
                  
                </FormControl>
                <FormControl>
                    
                        <FormLabel mt="1rem">First Name:</FormLabel>
                        <Input type="string" isReadOnly borderColor="black" background={'white'}/>
                    
                </FormControl>
                <FormControl>
                    
                        <FormLabel mt="1rem">Last Name:</FormLabel>
                        <Input type="string"  isReadOnly borderColor="black" background={'white'}/>
                  
                </FormControl>
                <FormControl>
                    
                        <FormLabel mt="1rem">Bio:</FormLabel>
                        <Input type="string"isReadOnly borderColor="black" background={'white'}/>
                 
                </FormControl>
                <FormControl>
                    
                        <FormLabel mt="1rem">Email:</FormLabel>
                        <Input type="string" isReadOnly borderColor="black" background={'white'}/>
                 
                </FormControl>
                <FormControl>
                    
                        <FormLabel mt="1rem">Password:</FormLabel>
                        <Input type="string" isReadOnly borderColor="black" background={'white'}/>
                   
                </FormControl>
                <FormControl>
                   
                        <FormLabel mt="1rem">Confirm Password</FormLabel>
                        <Input type="string" isReadOnly borderColor="black" background={'white'}/>
                  
                </FormControl>
                <FormControl>
                    
                        <FormLabel mt="1rem">Address</FormLabel>
                        <Input type="string" isReadOnly borderColor="black" background={'white'}/>
                   
                </FormControl>
                <FormControl>
                    
                        <FormLabel mt="1rem">Contact</FormLabel>
                        <Input type="string" isReadOnly borderColor="black" background={'white'}/>
                    
                </FormControl>
                <FormControl mt='2rem'>
                    <HStack>
                        <FormLabel>Profile Image:</FormLabel>
                        <FileUpload />
                    </HStack>
                </FormControl>
                <FormControl mt='2rem'>
                 {isEditable === true ? (
                <IconButton
                marginTop={'30px'}
                    size="sm"
                    icon={<CloseIcon />}
                    onClick={() => setEditable(false)}
                    aria-label={""}
                />
            ) : (
                <></>
            )}
            <Button>Save</Button>
            </FormControl>
            </Box >
            
           
            
        </div>
    );
}

export default Settings;
