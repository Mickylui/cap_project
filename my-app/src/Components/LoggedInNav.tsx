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
import { createAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { logOutFetch } from "../Api/accountFetch";
import { RootState } from "../Redux/store";
import { FormatDate } from "../Utils/timeStamp";
import Swal from "sweetalert2";

export function UserLoggedInNav() {
    // useSelector: if isAdmin true, return admin; else return user/
    const isAdmin = useSelector((state: RootState) => state.account.isAdmin);
    const userData = useSelector((state: RootState) => state.account.combineUserData);
    const shoppingData = useSelector((state: RootState) => state.account.shoppingData);
    // console.log("combineUserData:", userData[0]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logOut() {
        Swal.fire({
            title: "Log out",
            showClass: {
                popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
                popup: "animate__animated animate__fadeOutUp",
            },
        }).then(()=>navigate("/"))
        // need to fetch: insert log out time
        // const logOutTime =  FormatDate(new Date());
        // const logOutResponse = await dispatch(logOutFetch(logOutTime));
        // console.log("logOutResponse")
        const logOut = createAction("@Account/logOut");
        const action = logOut();
        // console.log("this is action:", action);
        return action;
    }
    if (isAdmin) {
        // if admin
        return (
            <Menu>
                <MenuButton>
                    <Avatar name={`${userData[0]["account_name"]}`} backgroundColor={"black"} />
                </MenuButton>
                <MenuList marginTop={"-20px"} minWidth={{ base: "7em", md: "10em" }}>
                    <RouteLink to="admin/manage">
                        <MenuItem>Manage</MenuItem>
                    </RouteLink>
                    <MenuItem onClick={() => dispatch(logOut())}>Log Out</MenuItem>
                </MenuList>
            </Menu>
        );
    }
    // if user
    // useEffect[shopping_cart+userData]: if has item, return number, else return non-number; user data shown
    return (
        <Menu>
            <MenuButton>
                <Avatar name={`${userData[0]["account_name"]}`} src="https://bit.ly/ryan-florence">
                    {shoppingData.length > 0 ? (
                        <AvatarBadge boxSize="1.25em" bg="green.500" textColor={"white"}>
                            {shoppingData.length}
                        </AvatarBadge>
                    ) : (
                        <></>
                    )}
                </Avatar>
            </MenuButton>
            <MenuList marginTop={"-20px"} minWidth={{ base: "7em", md: "10em" }}>
                {/* href: get user id(req.session?) and go to his profile */}
                <RouteLink to="/user/profile">
                    <MenuItem>Profile</MenuItem>
                </RouteLink>
                <RouteLink to="/cart/data">
                    <MenuItem>
                        Cart
                        {shoppingData.length > 0 ? (
                            <Box
                                boxSize="1.25em"
                                bg="green.500"
                                textColor={"white"}
                                borderRadius={"10px"}
                                textAlign={"center"}
                            >
                                {shoppingData.length}
                            </Box>
                        ) : (
                            <></>
                        )}
                    </MenuItem>
                </RouteLink>
                <RouteLink to="/setting/user">
                    <MenuItem>Setting</MenuItem>
                </RouteLink>
                {/* change the state -> re-render */}
                <MenuItem onClick={() => dispatch(logOut())}>Log Out</MenuItem>
            </MenuList>
        </Menu>
    );
}
