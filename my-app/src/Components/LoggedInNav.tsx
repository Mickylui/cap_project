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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link as RouteLink } from "react-router-dom";
import { logOutFetch } from "../Api/AccountFetch";
import { RootState } from "../Redux/store";
import { FormatDate } from "../Utils/timeStamp";

export function UserLoggedInNav() {
    // useSelector: if isAdmin true, return admin; else return user/
    const isAdmin = useSelector((state:RootState)=>state.account.isAdmin)
    const userData = useSelector((state:RootState)=>state.account.existUserData)
    // console.log("UserLoggedInNav:",userData[0])
    // const dispatch = useDispatch();

    async function logOut(){
        console.log("timestamp:",FormatDate(new Date()))
        // const resp = await dispatch(logOutFetch())
    }
    if(isAdmin){
        // if admin
        return (
            <Menu>
            <MenuButton>
                <Avatar name={`${userData[0]["account_name"]}`} backgroundColor={"black"}/>
            </MenuButton>
            <MenuList marginTop={"-20px"}>
                <RouteLink to="/user">
                    <MenuItem>Manage</MenuItem>
                </RouteLink>
                <MenuItem onClick={()=>logOut()}>Log Out</MenuItem>
            </MenuList>
        </Menu>
        )
    }
    // if user
    // useEffect[shopping_cart+userData]: if has item, return number, else return non-number; user data shown
    return (
        <Menu>
            <MenuButton>
                <Avatar name={`${userData[0]["account_name"]}`} src="https://bit.ly/ryan-florence">
                    <AvatarBadge boxSize="1.25em" bg="green.500" textColor={"white"}>
                        1
                    </AvatarBadge>
                </Avatar>
            </MenuButton>
            <MenuList marginTop={"-20px"}>
                {/* href: get user id(req.session?) and go to his profile */}
                <RouteLink to="/products">
                    <MenuItem>Profile</MenuItem>
                </RouteLink>
                <RouteLink to="/products">
                    <MenuItem>
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
                </RouteLink>
                <RouteLink to="/products">
                    <MenuItem>Setting</MenuItem>
                </RouteLink>
                {/* change the state -> re-render */}
                <MenuItem onClick={()=>logOut()}>Log Out</MenuItem>
            </MenuList>
        </Menu>
    );
}

