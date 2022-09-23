import React from "react";
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
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { SmallAddIcon } from "@chakra-ui/icons";

// const data = {
//     _id: "ats1999",
//     pic: "https://bit.ly/sage-adebayo",
//     name: "Jason",
//     profileTagLine: "Fullstack",
//     location: "Tsuen Wan",
//     bio: "I Love basketball, skateboard and swimming",
//     skills: ["nodejs", "reactjs", "java", "c++"],
//     socialProfiles: {
//         Linkedin: "https://www.linkedin.com/in/rahul-kumar-36b05a189",
//         Github: "https://github.com/ats1999",
//         Website: "https://dsabyte.com",
//     },
// };

function UserImage() {
    const isAdmin = useSelector((state: RootState) => state.account.isAdmin);
    const combineUserData = useSelector((state: RootState) => state.account.combineUserData);
    // console.log("combineUserData", combineUserData);
    const userData = combineUserData[0];
    const DEVELOP_IMAGE_HOST = process.env.REACT_APP_IMAGE_URL;
    if (isAdmin) {
        return (
            <div>
                <Avatar name={"admin"} backgroundColor={"black"} size="2xl" />
                {/* <Container mt={4}>
                    <Image
                        src={
                            data.pic ||
                            "https://res.cloudinary.com/dsabyte/image/upload/v1630411853/users/user-svgrepo-com_vdq4rw.svg"
                        }
                        alt={data.name}
                        boxSize="200px"
                        borderRadius="full"
                        fallbackSrc="hhttps://res.cloudinary.com/dsabyte/image/upload/v1630411853/users/user-svgrepo-com_vdq4rw.svg"
                        mx="auto"
                    />
                    <Center>
                        <VStack>
                            <Heading>{data.name}</Heading>
                        </VStack>
                    </Center>
                </Container> */}
            </div>
        );
    }
    return (
        <div>
            <Container mt={4}>
                <Avatar
                    name={`${userData.account_name}`}
                    src={`${DEVELOP_IMAGE_HOST}/${userData.icon}`}
                    size="2xl"
                />
                {/* <Image
                    src={
                        data.pic ||
                        "https://res.cloudinary.com/dsabyte/image/upload/v1630411853/users/user-svgrepo-com_vdq4rw.svg"
                    }
                    alt={data.name}
                    boxSize="200px"
                    borderRadius="full"
                    fallbackSrc="hhttps://res.cloudinary.com/dsabyte/image/upload/v1630411853/users/user-svgrepo-com_vdq4rw.svg"
                    mx="auto"
                /> */}
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
                        {/* <Text color="gray">
                            {userData.profileTagLine} {", "} {data.location}
                        </Text> */}
                        {/* <SocialProfiles data={data.socialProfiles} /> */}
                        <Text>{userData.slogan}</Text>
                        {/* <HStack>
            {data.skills.map(skill => (
              <Tag colorScheme="blue" key={skill}>
                {skill}
              </Tag>
            ))}
          </HStack> */}
                    </VStack>
                </Center>
            </Container>
        </div>
    );
}

export default UserImage;
