import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

interface Props {
    back ?: () => void
}

export function BackButton({back}:Props) {
    const navigate = useNavigate();
    const location = useLocation();
    // console.log("this is location:", location.pathname)

    return (

        
        <Button onClick={()=> back ? back() : navigate(-1)}>
            <ArrowBackIcon />
        </Button>
    );
}
