import { ReactNode } from "react";

import {
    Box,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
    Image,
} from "@chakra-ui/react";

import "./css/footer.css";
import { Link as RouteLink } from "react-router-dom";

const Logo = (props: any) => {
    return <Image src="../Logo.png" alt="SkateBoardLogo" boxSize="200px" />;
};

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
            {children}
        </Text>
    );
};

const SmallTextContent = ({ children }: { children: ReactNode }) => {
    return <Text fontSize={"sm"}>{children}</Text>;
};

const TextContent = ({ children }: { children: ReactNode }) => {
    return <Text textAlign={"left"}>{children}</Text>;
};

export default function Footer() {
    return (
        <Box
            // bg={useColorModeValue("gray.50", "gray.900")}
            bg={"white"}
            color={useColorModeValue("gray.700", "gray.200")}
        >
            <Container
                as={Stack}
                maxW={"8xl"}
                py={10}
            >
                <SimpleGrid
                    templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
                    spacing={10}
                    display={"flex"}
                    justifyContent={"space-around"}
                >
                    <Stack spacing={2}>
                        <Box display={"flex"} justifyContent={"center"}>
                            <Logo color={useColorModeValue("gray.700", "white")} />
                        </Box>
                        <ListHeader>Follow us</ListHeader>
                        <SmallTextContent>
                            <i className={`fa-brands fa-instagram textContent`}></i>
                            <i className={`fa-brands fa-facebook textContent`}></i>
                            <i className={`fa-brands fa-square-twitter textContent`}></i>
                        </SmallTextContent>

                        <SmallTextContent>
                            © 2022 Chakra Templates. All rights reserved
                        </SmallTextContent>
                    </Stack>
                    <Stack align={"flex-start"} width={"20rem"}>
                        <ListHeader>About us</ListHeader>
                        <TextContent>
                            Skate Park offers skateboarding enthusiasts a platform for purchasing
                            skateboards and to connect with like-minded hobbyists. We aim to promote
                            skateboarding culture in Hong Kong by allowing individuals and
                            organizations to share their activities and product information on our
                            platform. We offer quality skateboards for purchase and host information
                            on all things skateboard-related: competitions, workshops, employment,
                            skateboard designs and more.
                        </TextContent>
                    </Stack>
                    <Stack align={"flex-start"}>
                        <ListHeader>Sections</ListHeader>
                        <RouteLink to="/products"> Products</RouteLink>
                        <RouteLink to="/posts"> Activity Platform</RouteLink>
                    </Stack>
                    <Stack align={"flex-start"}>
                        <ListHeader>Contact Us</ListHeader>
                        <Link href={"#"}>Tina Wu</Link>
                        <Link href={"#"}>Jade Kwun</Link>
                        <Link href={"#"}>Micky Lui</Link>
                        <Link href={"#"}>Harry Tai</Link>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Box>
    );
}
