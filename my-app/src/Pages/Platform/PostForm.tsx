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
    Text,
    Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ImageUpload } from "../../Components/ImageUpload";
import { RootState } from "../../Redux/store";
import { InsertTags } from "../Platform/InputTags";

function PostForm() {
    // need to get user default contact!!
    const combineUserData = useSelector((state: RootState) => state.account.combineUserData);
    console.log("this is combineUserData:", combineUserData[0].email);
    const [isEvent, setIsEvent] = useState(false);
    const [isDefaultContact, setIsDefaultContact] = useState(true);
    console.log("is Event:", isEvent);

    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);

    return (
        <div>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Box rounded={"lg"} boxShadow={"lg"} padding={20}>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.target;
                            const formData = new FormData();

                            const tagItems = tags;
                            const ImageItems = images;

                            console.log("form:", form);
                            // console.log("ImageItems:",ImageItems)

                            formData.append("title", form.title.value);
                            formData.append("description", form.description.value);
                            formData.append("tagItems", tagItems);

                            for (let i = 0; i < ImageItems.length; i++) {
                                console.log("this is files:", ImageItems[i]);
                                console.log("this is files type:", typeof ImageItems[i]);
                                formData.append("files", ImageItems[i]);
                            }

                            // console.log("form:", form);
                            // console.log("title:", form.title.value);
                            // console.log("description:", form.description.value);
                            // console.log("tagItems:", tagItems);

                            // for (var key of formData.entries()) {
                            //     console.log(key[0] + ', ' + key[1]);
                            // }

                            if (isEvent === true) {
                                if (isDefaultContact) {
                                    formData.append("eventLocation", form.eventLocation.value);
                                    formData.append("eventDate", form.eventDate.value);
                                    formData.append("startingTime", form.startingTime.value);
                                    formData.append("endingTime", form.endingTime.value);
                                    formData.append(
                                        "eventContact",
                                        form.useDefaultContact.value
                                    );
                                    // const eventLocation = form.eventLocation.value;
                                    // const eventDate = form.eventDate.value;
                                    // const startingTime = form.startingTime.value;
                                    // const endingTime = form.endingTime.value;
                                    // const useDefaultContact = form.useDefaultContact.value;
                                    // console.log("eventLocation:", eventLocation);
                                    // console.log("eventDate:", eventDate);
                                    // console.log("startingTime:", startingTime);
                                    // console.log("endingTime:", endingTime);
                                    // console.log("useDefaultContact:", useDefaultContact);
                                } else {
                                    formData.append("eventLocation", form.eventLocation.value);
                                    formData.append("eventDate", form.eventDate.value);
                                    formData.append("startingTime", form.startingTime.value);
                                    formData.append("endingTime", form.endingTime.value);
                                    formData.append("eventContact", form.eventContact.value);
                                    console.log("eventContact:", form.eventContact.value);
                                }
                                const resp = await fetch("http://localhost:8080/posts/addPost", {
                                    method: "POST",
                                    body: formData,
                                });
                                const addPostResponse = await resp.json();
                                console.log("this is addPostResponse(event):", addPostResponse);
                                return;
                            }

                            const resp = await fetch("http://localhost:8080/posts/addPost", {
                                method: "POST",
                                body: formData,
                            });
                            const addPostResponse = await resp.json();
                            console.log("this is addPostResponse(other):", addPostResponse);
                        }}
                    >
                        <FormControl isRequired>
                            <Input placeholder="Title" name="title" />
                        </FormControl>
                        <FormControl isRequired>
                            <Input placeholder="Write a caption" name="description" />
                        </FormControl>
                        <FormControl as="fieldset">
                            <FormLabel as="legend">Is your post a event?</FormLabel>
                            <RadioGroup defaultValue="event">
                                <HStack spacing="24px">
                                    <Button onClick={() => setIsEvent(true)}>Yes</Button>
                                    <Button value="other" onClick={() => setIsEvent(false)}>
                                        No
                                    </Button>
                                </HStack>
                            </RadioGroup>
                            <ImageUpload images={images} setImages={setImages} />
                        </FormControl>
                        {isEvent ? (
                            <Box className="event-info">
                                <FormControl>
                                    <HStack spacing="12px">
                                        <FormLabel>Location</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="eventLocation"
                                            name="eventLocation"
                                        />
                                    </HStack>
                                </FormControl>
                                <FormControl>
                                    <HStack spacing="12px">
                                        <FormLabel>Date</FormLabel>
                                        <Input type="date" id="eventDate" name="eventDate" />
                                    </HStack>
                                </FormControl>
                                <FormControl>
                                    <HStack spacing="12px">
                                        <FormLabel>Time</FormLabel>
                                        <Input type="time" id="time" name="startingTime" />
                                        <Text>to</Text>
                                        <Input type="time" id="time" name="endingTime" />
                                    </HStack>
                                </FormControl>{" "}
                                <FormControl>
                                    <FormLabel as="legend">Contact</FormLabel>
                                    <RadioGroup defaultValue="default">
                                        <HStack spacing="12px">
                                            {isDefaultContact ? (
                                                <></>
                                            ) : (
                                                <Input
                                                    placeholder="eventContact"
                                                    name="eventContact"
                                                />
                                            )}

                                            <Checkbox
                                                defaultChecked
                                                name="useDefaultContact"
                                                onChange={() =>
                                                    setIsDefaultContact(!isDefaultContact)
                                                }
                                                value={`${combineUserData[0].email}`}
                                            >
                                                use your default contact
                                            </Checkbox>
                                        </HStack>
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        ) : (
                            ""
                        )}

                        <FormLabel>Write your tags with spacing to separate them</FormLabel>
                        <InsertTags tags={tags} setTags={setTags} />

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
                    </form>
                </Box>
            </Stack>
        </div>
    );
}

export default PostForm;
