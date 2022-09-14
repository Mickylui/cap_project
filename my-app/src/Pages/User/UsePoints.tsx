import React from 'react';
import { Button, ButtonGroup, Stack } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'



function UsePoints() {
    return (
        <Stack spacing={4} direction='row' align='center' marginLeft='2rem'>
            <h2>Your post is no longer in the front page. Would you like to use points to push to the top?</h2>
            <Button colorScheme='teal' size='sm'>yes</Button>
        </Stack>
    );
}

export default UsePoints;