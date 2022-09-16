import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    IconButton,
    Button,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
    Image,
    Center,
} from "@chakra-ui/react";
import { MdPhone, MdEmail, MdLocationOn, MdFacebook, MdOutlineEmail } from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import { CheckIcon } from "@chakra-ui/icons";
export function ShippingManage() {
    // fetch order data
    const data = {
        _id: "ats1999",
        pic: "https://bit.ly/sage-adebayo",
        name: "Jason",
        profileTagLine: "Fullstack",
        location: "Tsuen Wan",
        bio: "I Love basketball, skateboard and swimming",
        skills: ["nodejs", "reactjs", "java", "c++"],
        socialProfiles: {
            Linkedin: "https://www.linkedin.com/in/rahul-kumar-36b05a189",
            Github: "https://github.com/ats1999",
            Website: "https://dsabyte.com",
        },
    };

    return (
        <Container bg="#9DC4FB" maxW="full" mt={0} centerContent overflow="hidden">
            <Flex>
                <Box
                    bg="#02054B"
                    color="white"
                    borderRadius="lg"
                    // m={{ sm: 4, md: 16, lg: 10 }}
                    p={{ sm: 5, md: 5, lg: 16 }}
                >
                    <Box p={4}>
                        <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                            <WrapItem>
                                <Box>
                                    <Container mt={4}>
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
                                    </Container>
                                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                                        <VStack pl={0} spacing={3} alignItems="flex-start">
                                            <Button
                                                size="md"
                                                height="48px"
                                                width="200px"
                                                variant="ghost"
                                                color="#DCE2FF"
                                                _hover={{ border: "2px solid #1C6FEB" }}
                                                leftIcon={<MdEmail color="#1970F1" size="20px" />}
                                            >
                                                hello@abc.com
                                            </Button>
                                            <Button
                                                size="md"
                                                height="48px"
                                                width="200px"
                                                variant="ghost"
                                                color="#DCE2FF"
                                                _hover={{ border: "2px solid #1C6FEB" }}
                                                leftIcon={<MdPhone color="#1970F1" size="20px" />}
                                            >
                                                +91-988888888
                                            </Button>
                                            <Button
                                                size="md"
                                                height="48px"
                                                width="200px"
                                                variant="ghost"
                                                color="#DCE2FF"
                                                _hover={{ border: "2px solid #1C6FEB" }}
                                                leftIcon={
                                                    <MdLocationOn color="#1970F1" size="20px" />
                                                }
                                            >
                                                Karnavati, India
                                            </Button>
                                        </VStack>
                                    </Box>
                                </Box>
                            </WrapItem>
                            <WrapItem>
                                <Box bg="white" borderRadius="lg">
                                    <Box m={8} color="#0B0E3F">
                                        <VStack spacing={5}>
                                            <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
                                                <Heading>Items List</Heading>
                                                <CheckIcon />
                                            </Box>
                                                {/* need table!! */}
                                                <table>
                                                    <tr>
                                                        <th>Company</th>
                                                        <th>Contact</th>
                                                        <th>Country</th>
                                                    </tr>
                                                    <tr>
                                                        <td>Alfreds Futterkiste</td>
                                                        <td>Maria Anders</td>
                                                        <td>Germany</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Centro comercial Moctezuma</td>
                                                        <td>Francisco Chang</td>
                                                        <td>Mexico</td>
                                                    </tr>
                                                </table>

                                            {/* <FormControl id="name">
                                                <FormLabel>Your Name</FormLabel>
                                                <InputGroup borderColor="#E0E1E7">
                                                    <InputLeftElement
                                                        pointerEvents="none"
                                                        children={<BsPerson color="gray.800" />}
                                                    />
                                                    <Input type="text" size="md" />
                                                </InputGroup>
                                            </FormControl>
                                            <FormControl id="name">
                                                <FormLabel>Mail</FormLabel>
                                                <InputGroup borderColor="#E0E1E7">
                                                    <InputLeftElement
                                                        pointerEvents="none"
                                                        children={
                                                            <MdOutlineEmail color="gray.800" />
                                                        }
                                                    />
                                                    <Input type="text" size="md" />
                                                </InputGroup>
                                            </FormControl>
                                            <FormControl id="name">
                                                <FormLabel>Message</FormLabel>
                                                <Textarea
                                                    borderColor="gray.300"
                                                    _hover={{
                                                        borderRadius: "gray.300",
                                                    }}
                                                    placeholder="message"
                                                />
                                            </FormControl>
                                            <FormControl id="name" float="right">
                                                <Button
                                                    variant="solid"
                                                    bg="#0D74FF"
                                                    color="white"
                                                    _hover={{}}
                                                >
                                                    Send Message
                                                </Button>
                                            </FormControl> */}
                                        </VStack>
                                    </Box>
                                </Box>
                            </WrapItem>
                        </Wrap>
                    </Box>
                </Box>
            </Flex>
        </Container>
    );
}
