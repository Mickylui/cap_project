import {
    Stack,
    Avatar,
    AvatarBadge,
    LinkBox,
    LinkOverlay,
    Menu,
    MenuButton,
    Button,
    MenuList,
    MenuItem,
    Box,
} from "@chakra-ui/react";

// if user
// if admin
export function UserLoggedInNav() {
    return (
        <Menu>
            <MenuButton>
                <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence">
                    <AvatarBadge boxSize="1.25em" bg="green.500" textColor={"white"}>
                        1
                    </AvatarBadge>
                </Avatar>
            </MenuButton>
            <MenuList marginTop={"-20px"}>
                 {/* href: get user id(req.session?) and go to his profile */}
                <MenuItem as="a" href="/user">Profile</MenuItem>
                <MenuItem as="a" href="/products">
                    Cart
                    <Box
                        boxSize="1.25em"
                        bg="green.500"
                        textColor={"white"}
                        borderRadius={"10px"}
                        textAlign={"center"}
                    >
                        1
                    </Box>
                </MenuItem>

                <MenuItem as="a" href="/products">Setting</MenuItem>
                {/* change the state -> re-render */}
                <MenuItem>Log Out</MenuItem>
            </MenuList>
        </Menu>
    );
}

export function AdminLoggedInNav() {
    return (
        <Menu>
            <MenuButton>
                <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence">
                    <AvatarBadge boxSize="1.25em" bg="green.500" textColor={"white"}>
                        1
                    </AvatarBadge>
                </Avatar>
            </MenuButton>
            <MenuList marginTop={"-20px"}>
                 {/* href: get user id(req.session?) and go to his profile */}
                <MenuItem as="a" href="/user">Manage</MenuItem>
                <MenuItem>Log Out</MenuItem>
            </MenuList>
        </Menu>
    );
}