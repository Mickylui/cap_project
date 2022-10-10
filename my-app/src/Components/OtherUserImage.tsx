import React from "react";
import {
    Container,
    Center,
    Heading,
    Text,
    VStack,
    Avatar,
    Box,
    StatGroup,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { SmallAddIcon } from "@chakra-ui/icons";


function UserImage() {
    const isAdmin = useSelector((state: RootState) => state.account.isAdmin);
    const combineUserData = useSelector((state: RootState) => state.account.combineUserData);
    console.log("combineUserData", combineUserData);
    const userData = combineUserData[0];
    const DEVELOP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
    if (isAdmin) {
        return (
            <div>
                <Avatar name={"admin"} backgroundColor={"black"} size="2xl" />
           
            </div>
        );
    }
    return (
        <div>
            <Container mt={4}>
                <Avatar
                    name={`${userData.account_name}`}
                    src={`${DEVELOP_IMAGE_URL}/users/${userData.icon}`}
                    size="2xl"
                />
       
                <Center>
                    <Box>
                        <StatGroup>
                            <Stat>
                                <StatLabel>Point</StatLabel>
                                <StatNumber>{userData.accumulation}</StatNumber>
                                <StatHelpText>
                                    <SmallAddIcon />
                                    <StatHelpText>{userData.date}</StatHelpText>
                                </StatHelpText>
                            </Stat>
                        </StatGroup>
                    </Box>
                    <VStack>
                        <Heading>{userData.account_name}</Heading>
                 
                        <Text>{userData.slogan}</Text>
          
                    </VStack>
                </Center>
            </Container>
        </div>
    );
}

export default UserImage;
