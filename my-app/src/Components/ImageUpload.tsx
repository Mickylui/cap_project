import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { MdPadding } from "react-icons/md";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export function ImageUpload(props) {
    const maxNumber = 69;
    const images = props.images;
    const setImages = props.setImages;
    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {

        setImages(imageList as never[]);
    };

    return (
        <Box className="fileUpload-box" border={"2px solid rgb(120,120,120)"} borderRadius={'3px'} padding={'.5em 0'} width={"345px"} marginTop={"10px"}>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                inputProps={{
                    name:"fileUpload",
                    type:"file"
                }}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
  
                    <div className="upload__image-wrapper">
                        {imageList.length > 0 ? (
                            <Slide>
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image.dataURL} alt="" width="100" />
                                        <div className="image-item__btn-wrapper">
                                            <Button onClick={() => onImageUpdate(index)}>
                                                Update
                                            </Button>
                                            <Button onClick={() => onImageRemove(index)}>
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </Slide>
                        ) : (
                            <Box>
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image.dataURL} alt="" width="100" />
                                        <div className="image-item__btn-wrapper">
                                            <Button onClick={() => onImageUpdate(index)}>
                                                Update
                                            </Button>
                                            <Button onClick={() => onImageRemove(index)}>
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </Box>
                        )}
                        <Button
                            style={isDragging ? { color: "red"} : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
                        </Button>
                        &nbsp;
                        <Button onClick={onImageRemoveAll}>Remove all images</Button>
                    </div>
                )}
            </ImageUploading>
        </Box>
    );
}
