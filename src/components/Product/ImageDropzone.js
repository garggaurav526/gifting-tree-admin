import React, { useEffect, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon, Table, Pagination, Grid, Card, Form, Button, Input, Header, Modal, Dropdown } from "semantic-ui-react";
import { withRouter } from 'react-router';
import SimpleImageSlider from "react-simple-image-slider";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { uploadFile } from "react-s3";

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    position: 'relative',
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%',
    // niki
    objectFit: "cover"
};

const deleteIcon = {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: '#3dbe9b',
    borderRadius: 50,
    width: 20,
    height: 20,
    cursor: 'pointer'
}


function ImageDropzone(props) {
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState("");
    const [cropData, setCropData] = useState("#");
    const [cropper, setCropper] = useState("");
    const [cropModal, setCropModal] = useState(false);
    const [cropWidth, setCropWidth] = useState(100);
    const [cropHeight, setCropHeight] = useState(100);

    // const { getRootProps, getInputProps } = useDropzone({
    //     accept: 'image/*',
    //     onDrop: acceptedFiles => {
    //         setFiles(acceptedFiles.map(file => Object.assign(file, {
    //             preview: URL.createObjectURL(file)
    //         })));
    //     }
    // });

    useEffect(() => {
        if (props.productImage && props.productImage.length > 0) {
            var tempArr = []
            props.productImage.map((item) => {
                tempArr.push({
                    name: item,
                    preview: item
                })
            })
            setFiles([...tempArr])
        }
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(acceptedFiles[0]);
            setCropModal(true)
            // var tempArr = [...files]
            // var tempArr2 = []
            // var tempArr3 = []

            // tempArr2.push(acceptedFiles.map(file => Object.assign(file, {
            //     preview: URL.createObjectURL(file)
            // })));
            // acceptedFiles.map((item) => {
            //     tempArr3.push({
            //         name: item.preview,
            //         preview: item.preview
            //     })
            // })
            // tempArr2 = tempArr.concat(tempArr3)
            // setFiles([...tempArr2])
            // console.log("99999999999999",tempArr2)
        }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const thumbs = files.map((file, i) => (
        <div style={thumb} key={file.name}>
            <i class="x icon" style={deleteIcon} onClick={() => remove(i)}></i>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    const remove = (index) => {
        const newFiles = [...files];     // make a var for the new array
        newFiles.splice(index, 1);
        setFiles([...newFiles])
        props.setImageData([...newFiles])
    }

    const makeImageArray = (files) => {
        var newArr = [];
        files.map((file, i) => (
            newArr.push({
                url: file.preview,
                // thumbnail: file.preview
            })
        ));
        return newArr;
    }

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            var croppedData = cropper.getCroppedCanvas().toDataURL();
            setCropData(croppedData);
            // var filename = parseInt(Math.random()*10000000)+"-gifting-tree-product.png";
            // var cropedFile = dataURLtoFile(croppedData,filename);
            // var acceptedFiles = [cropedFile];
            var tempArr = [...files]
            var tempArr2 = []
            var tempArr3 = []
            // acceptedFiles.map(file => Object.assign(file, {
            //     preview: URL.createObjectURL(file)
            // }))
            // var dataUrlFile = URL.createObjectURL(cropedFile)
            tempArr3.push({
                name: croppedData,
                preview: croppedData
            })
            tempArr2 = tempArr.concat(tempArr3)
            setFiles([...tempArr2])
            const config = {
                bucketName: "gifting-tree",
                dirName: "img" /* optional */,
                region: "ap-south-1",
                accessKeyId: "AKIAXIHDO3JANDGTMCHB",
                secretAccessKey: "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",
            };
            // const file = event.target.files[0];
            var tempUrlArr = props.productImage;
            var filename = parseInt(Math.random() * 10000000) + "-gifting-tree-product.png";
            var fileS3 = dataURLtoFile(croppedData, filename);
            uploadFile(fileS3, config)
                .then((data) => {
                    tempUrlArr.push(data.location.replace(/ /g, "%20"));
                })
                .catch((err) => console.error(err));
            props.setImageData([...tempUrlArr])
            setCropModal(false)
        }
    };

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }


    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p style={{ cursor: "pointer" }}>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
            <div>
                {/* {files && files.length > 0 &&
                    < SimpleImageSlider
                        width={500}
                        height={504}
                        slideDuration={1}
                        showNavs={true}
                        showBullets={true}
                        images={makeImageArray(files)}
                    // images={images}
                    />
                } */}
                <Carousel>
                    {
                        files && files.length > 0 &&
                        files.map((item) => {
                            return <>
                                <div>
                                    <img src={item.preview} width='350.4'
                                        height="213.2" />
                                </div>
                            </>
                        })
                    }

                </Carousel>
                <>
                    <Modal
                        open={cropModal}
                        onClose={() => setCropModal(false)}
                        size="large"
                        className="modal-open-create"
                    >
                        <Modal.Content className="content-center">
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={10}>
                                        <Cropper
                                            style={{ height: 400, width: "100%" }}
                                            zoomTo={0}
                                            initialAspectRatio={4 / 3}
                                            preview=".img-preview"
                                            src={image}
                                            viewMode={1}
                                            guides={false}
                                            minCropBoxHeight={100}
                                            minCropBoxWidth={100}
                                            background={false}
                                            responsive={true}
                                            autoCropArea={1}
                                            checkOrientation={false}
                                            onInitialized={(instance) => {
                                                setCropper(instance);
                                            }}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <div className="box" style={{ width: "100%" }}>
                                            <h1>Preview</h1>
                                            <div
                                                className="img-preview"
                                                style={{ width: "100%", float: "left", height: "300px", overflow: 'hidden', border: '1px solid red' }}
                                            />
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Button onClick={() => getCropData()}>Crop</Button>
                            <Button
                                type="submit"
                                className="cancle-btn-modal"

                                onClick={() => setCropModal(false)}
                            >
                                Cancel
                            </Button>
                        </Modal.Content>
                    </Modal>
                </>
            </div>
        </section>
    );
}
export default withRouter(ImageDropzone)

