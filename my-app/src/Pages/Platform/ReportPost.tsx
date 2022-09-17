import { Flex, useColorModeValue, Box, Button, FormControl, FormLabel, Input, Radio, RadioGroup, Stack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BackButton } from '../../Components/BackButton';

function ReportPost() {
    const [ reason, setReason ] = useState("");
    const [message, setMessage] = useState("");
    
    const handleChange = (e: { target: { value: React.SetStateAction<string> } }) =>
        setMessage(e.target.value);

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
            <Box mb='4rem' fontSize='2em'>Report Post</Box>
            <form>
                            <FormControl id="reportUser">
                                <FormLabel as="legend">Please select a problem</FormLabel>
                                <RadioGroup onChange={setReason}>
                                    <VStack spacing="24px">
                                        <Radio value="inappropriate">Inappropriate Post</Radio>
                                        <Radio value="repetitive">Repeated Post</Radio>
                                        <Radio value="spam">spam</Radio>
                                        <Radio >
                                            Others
                                            <Input
                                                variant='outline' placeholder='Please specify'
                                                type="text"
                                                id="message"
                                                name="message"
                                                onClick={(e)=>handleChange}
                                                value={message}
                                            />
                                        </Radio>
                                    </VStack>
                                </RadioGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    type="submit"
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                >
                                    Report
                                </Button>
                            </Stack>                            
                        </form>
            </Box>
            </Flex>
        </div>
    );
}

export default ReportPost;