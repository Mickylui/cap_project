import { Box } from "@chakra-ui/react";
import React from "react";
import SocialPlatform from "../Platform/SocialPlatform";
import PromoSlider from "./PromoSlider";

function Promotion() {
    return (
        <div>
            <Box m='2rem' >
            <Box p='2rem' fontSize='2rem' fontWeight='bold'>
                Here are some posts you may be interested           
            </Box>

            <PromoSlider />
            </Box>
        </div>
    );
}

export default Promotion;
