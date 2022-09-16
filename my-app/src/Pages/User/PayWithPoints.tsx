import { Box, Button, ButtonGroup, Flex, Stack, Tfoot, Th, Tr, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { BackButton } from '../../Components/BackButton';
import CartList from './CartList';

function PayWithPoints(props) {
    return (
        <div>
            <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <BackButton />
            <Box maxW='80vw' borderWidth='1px' borderRadius='lg' overflow='hidden' m="4rem auto" p="6rem">
            <Box mb='4rem' fontSize='2em'>Your point is xxx, you can use it for discount. Do you want to use it?</Box>
            <CartList usePoint={props.usePoint}/>
            {/* <Tfoot>
                                    <Tr>
                                        <Th></Th>
                                        <Th></Th>
                                        <Th></Th>
                                        <Th></Th>
                                        <Th>{`$ -`}</Th>
                                    </Tr>
                                </Tfoot> */}
            <ButtonGroup spacing={4} mt='4rem'>
                <Button colorScheme='teal'>Yes</Button>
                <Button colorScheme='teal'>No</Button> 
            </ButtonGroup>
            
            </Box>
            </Flex>
        </div>
    );
}

export default PayWithPoints;