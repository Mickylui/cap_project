import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
    back ?: () => void
}

export function BackButton({ back }: Props) {
    const navigate = useNavigate();

    return (
     
        <Button onClick={()=> back ? back() : navigate(-1)} backgroundColor={"rgb(210,210,210)"}>
            <ArrowBackIcon />
        </Button>
    );
}
