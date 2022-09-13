import { Image } from "@chakra-ui/react";

import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    Link,
    useBreakpointValue,
    useDisclosure,
    LinkBox,
    LinkOverlay,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Link as RouteLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { useEffect } from "react";
import { LoggedInNav } from "./LoggedInNav";
import "../Components/css/Navbar.css";

// default: didn't logIn -> pure component
// login with user -> user navbar
// login with admin -> admin navbar
export default function Navbar() {
    const { isOpen, onToggle } = useDisclosure();
    let isLoggedIn = useSelector((state: RootState) => state.account.isLoggedIn);
    let token = useSelector((state: RootState) => state.account.token);
    // check if token length > 0 --> is logged in
    // if isLoggedIn status change --> fetch data: icon and shopping cart length
    useEffect(() => {
        console.log("change!", isLoggedIn);
    }, [isLoggedIn]);

    return (
        <Box>
            <Flex
                bg={useColorModeValue("white", "gray.800")}
                color={useColorModeValue("gray.600", "white")}
                minH={"60px"}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.900")}
                align={"center"}
            >
                <Flex
                    flex={{ base: 1, md: "auto" }}
                    ml={{ base: -2 }}
                    display={{ base: "flex", md: "none" }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={"ghost"}
                        aria-label={"Toggle Navigation"}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
                    <LinkBox boxSize="80px">
                        <LinkOverlay href="/">
                            <Image src="./SkateBoardLogo.png" alt="SkateBoardLogo" />
                        </LinkOverlay>
                    </LinkBox>
                    {/* <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}>
              Logo
            </Text> */}

                    <Flex display={{ base: "none", md: "flex" }} ml={10}>
                        <DesktopNav />
                        <LoggedInNav />
                    </Flex>
                </Flex>
                {/* {isLoggedIn ? (
                    <LoggedInNav/>
                ) : (
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={"flex-end"}
                        direction={"row"}
                        spacing={6}
                    >
                        <RouteLink to="/logIn">
                            <Button fontSize={"sm"} fontWeight={400} variant={"link"}>
                                Log In
                            </Button>
                        </RouteLink>
                        <RouteLink to="/signUp">
                            <Button
                                display={{ base: "none", md: "inline-flex" }}
                                fontSize={"sm"}
                                fontWeight={600}
                                color={"white"}
                                bg={"pink.400"}
                                // href={"signup"}
                                _hover={{
                                    bg: "pink.300",
                                }}
                            >
                                Sign Up
                            </Button>
                        </RouteLink>
                    </Stack>
                )} */}
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("gray.800", "white");
    const popoverContentBgColor = useColorModeValue("white", "gray.800");

    return (
        // nav bar width
        <Stack
            direction={"row"}
            spacing={4}
            width={"80vw"}
            justifyContent={"center"}
            alignContent={"center"}
        >
            {/* Routes */}
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={"hover"} placement={"bottom-start"}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? "#"}
                                fontSize={"sm"}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: "none",
                                    color: linkHoverColor,
                                }}
                            >
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={"xl"}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={"xl"}
                                minW={"sm"}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Link
            href={href}
            role={"group"}
            display={"block"}
            p={2}
            rounded={"md"}
            _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
        >
            <Stack direction={"row"} align={"center"}>
                <Box>
                    <Text
                        transition={"all .3s ease"}
                        _groupHover={{ color: "pink.400" }}
                        fontWeight={500}
                    >
                        {label}
                    </Text>
                    <Text fontSize={"sm"}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={"all .3s ease"}
                    transform={"translateX(-10px)"}
                    opacity={0}
                    _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
                    justify={"flex-end"}
                    align={"center"}
                    flex={1}
                >
                    <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    return (
        <Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{ md: "none" }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? "#"}
                justify={"space-between"}
                align={"center"}
                _hover={{
                    textDecoration: "none",
                }}
            >
                <Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={"all .25s ease-in-out"}
                        transform={isOpen ? "rotate(180deg)" : ""}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={"solid"}
                    borderColor={useColorModeValue("gray.200", "gray.700")}
                    align={"start"}
                >
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    // {
    //     label: "Inspiration",
    //     children: [
    //         {
    //             label: "Explore Design Work",
    //             subLabel: "Trending Design to inspire you",
    //             href: "#",
    //         },
    //         {
    //             label: "New & Noteworthy",
    //             subLabel: "Up-and-coming Designers",
    //             href: "#",
    //         },
    //     ],
    // },
    // {
    //     label: "Find Work",
    //     children: [
    //         {
    //             label: "Job Board",
    //             subLabel: "Find your dream design job",
    //             href: "#",
    //         },
    //         {
    //             label: "Freelance Projects",
    //             subLabel: "An exclusive list for contract work",
    //             href: "#",
    //         },
    //     ],
    // },
    {
        label: "Products",
        href: "/products",
    },
    {
        label: "Activity Platform",
        href: "/posts",
    },
];
