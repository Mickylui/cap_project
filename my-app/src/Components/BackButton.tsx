import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

interface Props {
    back ?: () => void
}

export function BackButton({ back }: Props) {
    const navigate = useNavigate();

    return (
        // <Button onClick={() => navigate(-1)}>
        //     <ArrowBackIcon />
        // </Button>
        <Button onClick={()=> back ? back() : navigate(-1)}>
            <ArrowBackIcon />
        </Button>
    );
}
