import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Select,
    HStack,
    Radio,
    RadioGroup,
    Stack,
    Button,
    Box,
} from "@chakra-ui/react";
import TagsInput from "../../Components/TagsInput";

function PostForm() {
    return (
        <div>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Box
                    rounded={"lg"}
                    boxShadow={"lg"}
                    padding={20}
                >
            <FormControl isRequired>
                <Input placeholder="Title" />
            </FormControl>
            <FormControl isRequired>
                <Input placeholder="Write a caption" />
            </FormControl>
            <FormControl as="fieldset">
                <FormLabel as="legend">Which type of information do you want to post?</FormLabel>
                <RadioGroup defaultValue="event">
                    <HStack spacing="24px">
                        <Radio value="event">event</Radio>
                        <Radio value="other">other</Radio>
                    </HStack>
                </RadioGroup>
            </FormControl>
            <FormControl>
                <HStack spacing="12px">
                    <FormLabel>Location (optional)</FormLabel>
                    <Input type="text" placeholder="optional" />
                </HStack>
            </FormControl>
            <FormControl>
                <HStack spacing="12px">
                    <FormLabel>Date (optional)</FormLabel>
                    <input type="date"  id="date" name="date"></input>
                </HStack>
            </FormControl>
            <FormControl>
                <HStack spacing="12px">
                    <FormLabel>Time</FormLabel>
                    <input type="time" id="time" name="time"></input>
                </HStack>
            </FormControl>
            <FormControl>
                <FormLabel as="legend" >Contact</FormLabel>
                <RadioGroup defaultValue="default">
                    <HStack spacing="12px">
                        <Radio>
                            <Input placeholder="optional"/>
                        </Radio>
                        <Radio value="default">use your default contact</Radio>
                    </HStack>
                </RadioGroup>
            </FormControl>
            
                <FormLabel>Write your tags with spacing to separate them</FormLabel>
                <TagsInput />
            
            
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
                    Submit
                </Button>
            </Stack>
            </Box>
            </Stack>
        </div>
    );
}

export default PostForm;
