import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function BackButton() {
    const navigate = useNavigate();
    return (
        <Button onClick={()=>navigate(-1)}>
            <ArrowBackIcon />
        </Button>
    );
}
