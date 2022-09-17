import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

export function BackButton() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log("this is location:", location)
    return (
        <Button onClick={()=>navigate(-1)}>
            <ArrowBackIcon />
        </Button>
    );
}
