import { Button, Stack, useDisclosure } from '@chakra-ui/react';
import { Link as RouteLink } from "react-router-dom";


function GetPoints() {
    return (
        <Stack spacing={4} direction='row' align='center' marginLeft='2rem'>
            <h2>You can get points by completing the registration form.</h2>
            <RouteLink to='form'>
                <Button colorScheme='teal' size='sm'>Fill out form</Button>
            </RouteLink>            
        </Stack>
    );
}

export default GetPoints;