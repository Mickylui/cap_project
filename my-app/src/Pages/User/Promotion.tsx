import { Box } from "@chakra-ui/react";
import React from "react";
import SocialPlatform from "../Platform/SocialPlatform";

function Promotion() {
    return (
        <div>
            <Box p='2rem' fontSize='2rem' mt='2rem' fontWeight='bold'>
                Here are some posts you may be interested           
            </Box>

            <SocialPlatform />
        </div>
    );
}

export default Promotion;
