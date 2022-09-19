import { Avatar, Box, Center, Heading, Stack, Switch, Text, VStack } from "@chakra-ui/react";
import Table from "./Table";

import "./css/userManage.css";

// function Feature({ title, desc, ...rest }) {
//     return (
//         <Box p={5} shadow="md" borderWidth="1px" {...rest}>
//             <Heading fontSize="xl">{title}</Heading>
//             <Text mt={4}>{desc}</Text>
//         </Box>
//     );
// }
export function UserAccess() {
    return (
        <Stack spacing={8} direction="row">
            {/* data analysis or Feature */}
            <Center className="user-control-box">
                <Center className="user-image-box">
                    <Avatar name={"admin"} backgroundColor={"black"} size="2xl" />
                </Center>
                <VStack className="user-basic-info-box">
                    <Heading>Name</Heading>
                    <Text>bio</Text>
                </VStack>
                <VStack className="user-access-control-box">
                    <Heading>Access</Heading>
                    <Text>
                        Post <Switch colorScheme="red" />
                    </Text>
                    <Text>
                        Like <Switch colorScheme="red" />
                    </Text>
                </VStack>
            </Center>
            <Center className="user-report-data-box">
                <VStack className="user-report-number-box">
                    <Heading>
                        Complain Number:
                        <Text>20</Text>
                    </Heading>
                    <Heading>
                        Complain reason:
                        <Text>A</Text>
                        <Text>B</Text>
                        <Text>C</Text>
                    </Heading>
                </VStack>
                <VStack className="user-report-image-box">
                    <img src="./skateBoardLogo.png" alt="" srcSet="" />
                </VStack>
            </Center>
            {/* <Table /> */}
        </Stack>
    );
}
