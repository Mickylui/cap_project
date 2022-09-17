import { Box, FormControl, FormLabel } from '@chakra-ui/react';
import React from 'react';

function Settings() {
    const userProfile = {
        id: 1,
        userName: "Jason",
        firstName: "Jason",
        lastName: "Lee",
        bio: "I love basketball, skateboard & swimming",
        icon: " ",
        email: "jason@tecky.io",
        password: "1234",
        confirm_password: "",
        address: "New Territories, Tsuen Wan West, One Town",
    }

    return (
        <div>
               <Box p="2rem" borderWidth="1px" borderRadius="lg" overflow="hidden" m="4rem">
                <Box>Settings</Box>
                <Box>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                    </FormControl>
                </Box>
               </Box>
        </div>
    );
}

export default Settings;