import React from 'react';
import { Button, ButtonGroup, Stack, useDisclosure, Text } from '@chakra-ui/react'
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
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Stack spacing={4} direction='row' align='center' marginLeft='2rem'>
            <h2>Your post is no longer in the front page. Would you like to use points to push to the top?</h2>
            <Button colorScheme='teal' size='sm' onClick={onOpen}>yes</Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        
          <ModalCloseButton />
          <ModalHeader></ModalHeader>
          <ModalBody pb={6} >
            <Text fontSize='1rem' mb='1rem'>
                xx points will be deducted, your post will be pushed to the top.
            </Text>           
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3}>
              Save
            </Button> */}
            {/* <Button onClick={onClose}>Close</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
        </Stack>
        
    );
}

export default UsePoints;