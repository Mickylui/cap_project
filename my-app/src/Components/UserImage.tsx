import React from "react";
import { Container, Image, Center, Heading, Text, VStack, HStack, Tag } from "@chakra-ui/react";

const data = {
    _id: "ats1999",
    pic: "https://bit.ly/sage-adebayo",
    name: "Jason",
    profileTagLine: "Fullstack",
    location: "Tsuen Wan",
    bio: "I Love basketball, skateboard and swimming",
    skills: ["nodejs", "reactjs", "java", "c++"],
    socialProfiles: {
        Linkedin: "https://www.linkedin.com/in/rahul-kumar-36b05a189",
        Github: "https://github.com/ats1999",
        Website: "https://dsabyte.com",
    },
};

function UserImage() {
    return (
        <div>
            <Container mt={4}>
                <Image
                    src={
                        data.pic ||
                        "https://res.cloudinary.com/dsabyte/image/upload/v1630411853/users/user-svgrepo-com_vdq4rw.svg"
                    }
                    alt={data.name}
                    boxSize="200px"
                    borderRadius="full"
                    fallbackSrc="hhttps://res.cloudinary.com/dsabyte/image/upload/v1630411853/users/user-svgrepo-com_vdq4rw.svg"
                    mx="auto"
                />
                <Center>
                    <VStack>
                        <Heading>{data.name}</Heading>
                        <Text color="gray">
                            {data.profileTagLine} {", "} {data.location}
                        </Text>
                        {/* <SocialProfiles data={data.socialProfiles} /> */}
                        <Text>{data.bio}</Text>
                        {/* <HStack>
            {data.skills.map(skill => (
              <Tag colorScheme="blue" key={skill}>
                {skill}
              </Tag>
            ))}
          </HStack> */}
                    </VStack>
                </Center>
            </Container>
        </div>
    );
}

export default UserImage;
