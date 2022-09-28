import React, { useMemo } from "react";
import {
    Container,
    Image,
    Center,
    Heading,
    Text,
    VStack,
    HStack,
    Tag,
    Avatar,
    Box,
    StatGroup,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

import "./css/userImage.css";

const DEVELOP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
function UserImage() {
    const isAdmin = useSelector((state: RootState) => state.account.isAdmin);
    const combineUserData = useSelector((state: RootState) => state.account.combineUserData);

    const userData = combineUserData[0];
    if (isAdmin) {
        return (
            <div className="user-image-container">
                <Avatar name={"admin"} backgroundColor={"black"} size="2xl" />
            </div>
        );
    }
    return (
        <div className="user-container">
            <Container mt={4} className="user-info-container">
                <div className="user-image-container">
                    <Avatar name={`${userData.account_name}`} src={`${DEVELOP_IMAGE_URL}/users/${userData.icon}`} size="2xl" />
                </div>

                <Center>
                    <Box className="user-point-container">
                        <StatGroup className="user-point">
                            <Stat>
                                <StatLabel fontSize={"20px"}>Point</StatLabel>
                                <StatNumber>{userData.accumulation}</StatNumber>
                                <StatHelpText>
                                    <StatHelpText>{userData.date}</StatHelpText>
                                </StatHelpText>
                            </Stat>
                        </StatGroup>
                    </Box>
                    <VStack className="user-data-container">
                        <Heading>{userData.account_name}</Heading>
   
                        <Text>{userData.slogan}</Text>

                    </VStack>
                </Center>
            </Container>
        </div>
    );
}

export default UserImage;
