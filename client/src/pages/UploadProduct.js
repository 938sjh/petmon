import React, {useState, useRef, useCallback} from "react";
import { useSelector } from "react-redux";
import {useDropzone} from 'react-dropzone'
import styled from "styled-components";
import {FaPlus} from "react-icons/fa";
import { useUploadImageMutation, useUploadProductMutation } from "../redux/api/product";
import { Input, Text, Button } from "../elements";
import Spinner from "../shared/loading";
import { useNavigate } from "react-router-dom";

const UploadProduct = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [category, setCategory] = useState("강아지");
    const [images, setImages] = useState([]);

    const [uploadImage, { 
        isLoading: isImageLoading, 
        isError: isImageError, 
        error: imageError }] = useUploadImageMutation();
    const [upload, { 
        isLoading: isUploadLoading, 
        isError: isUploadError, 
        error: uploadError }] = useUploadProductMutation();

    const userId = useSelector(state => state.user.userId);

    const Category = [
        {key:1, value:"강아지"},
        {key:2, value:"고양이"},
        {key:3, value:"기타 소동물"}
    ];

    //drop zone 

    const onDrop = useCallback(async (files) => {
        let formData = new FormData();

        formData.append("file", files[0]);
        
        try{
            const { data } = await uploadImage(formData);
            if(data.success === true){
                setImages([...images, ...files.map((file) => {
                    file.preview = URL.createObjectURL(file);
                    return file;
                  })]);
            }
            else{
                window.alert("이미지를 저장하는데 실패했습니다.");
            }
        }
        catch (err){
            console.error(err);
        }

    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: {'image/*': ['.jpeg', '.jpg', '.png']}, onDrop });

    const imageDeleteHandler = (imageToDelete) => {
        const indexToDelete = images.indexOf(imageToDelete);

        let newImages = [...images];
        newImages.splice(indexToDelete,1);
        setImages(newImages);
    };

    //submit
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if(!title || !description || !price || !category || !images){
            console.log(title, description, price, category, images);
            return window.alert("항목을 모두 작성해야합니다.")
        }

        const dataToSubmit = {
            // 로그인 된 사람의 ID
            title: title,
            description: description,
            price: price,
            stock: stock,
            images: images,
            category: category,
            publisher: userId
        }

        try{
            const {data} = await upload(dataToSubmit);
            //업로드 후 현재 페이지 새로고침
            if(data.success){
                window.alert('상품이 업로드 되었습니다.');
                window.location.reload();
            }
            else{
                window.alert('상품 업로드에 실패했습니다.');
            }
        }
        catch (err){
            console.error(err);    
        }

    };

    //description
    const textareaRef = useRef(null);

    const handleChange = (e) => {
        setDescription(e.target.value);
        autoHeight(); 
    };

    const autoHeight = () => { 
        const textarea = textareaRef.current;
            textarea.style.height = `${textarea.scrollHeight + 2}px`;
    };

    return (
        <Wrapper>
            {(isImageLoading || isUploadLoading) && <Spinner/>}    
            <Text 
                $size="22px"
                $bold 
                $color="#BDA4D5"
                $margin="30px"
            >
                상품 업로드
            </Text>
            <DropContainer>
                <DropBox {...getRootProps()}>
                    <input {...getInputProps()}/>
                    <FaPlus />
                </DropBox>
                <PreviewContainer>
                    {images.map((image) => (
                        <div onClick={() => imageDeleteHandler(image)} key={image.name}>
                            <img src={image.preview} alt={image.name} style={{
                                width:"300px",height:"220px", margin:"10px"
                            }}/>
                        </div>
                    ))}
                </PreviewContainer>
            </DropContainer>
            <form onSubmit={onSubmitHandler}>
                <label>이름</label>
                <Input
                    placeholder="이름"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    value={title}
                    $width="700px"
                    $height="40px"
                    $margin="15px 0px"
                />
                <label>제품설명</label>
                <div>
                    <Textarea 
                        ref={textareaRef}
                        value={description}
                        onChange={handleChange}
                        placeholder="내용을 입력해주세요"
                    />
                </div>
                <label>가격</label>
                <Input
                    placeholder="가격"
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                    value={price}
                    $width="700px"
                    $height="40px"
                    $margin="15px 0px 30px 0px"
                />
                <label>재고</label>
                <Input
                    placeholder="재고"
                    onChange={(e) => {
                        setStock(e.target.value);
                    }}
                    value={stock}
                    $width="700px"
                    $height="40px"
                    $margin="15px 0px 30px 0px"
                />
                <label>카테고리</label>
                <div>
                    <select style={{width:"700px",textAlign:"center",margin:"15px 0px"}} onChange={(e) => {
                        setCategory(e.currentTarget.value);
                    }} value={category}>
                        {Category.map(item => (
                            <option key={item.key} value={item.value}>{item.value}</option>
                        ))}

                    </select>
                </div>
                <Button
                    $margin="15px 0px 0px"
                    $width="700px"
                    $height="40px"
                    $color="#BDA4D5"
                    $bg="#FFFFFF"
                    $border="1px solid #e7e7e7"
                >
                    업로드
                </Button>
            </form>
        </Wrapper>
        
    )
};

const Wrapper = styled.div`
    width: 700px;
    margin: 2rem auto;
    text-align: center;
    justify-content: center;
`;

const Textarea = styled.textarea`
    display: inline-block;
    box-sizing: border-box;
    min-height: 100px;
    width: 700px;
    margin: 15px 0px;
    outline: none;
    padding: 10px;
    height: auto;
    overflow-y: hidden;
`
const DropContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    margin: 50px 0px;
`;

const DropBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 240px;
    border: 1px solid #808080;
    cursor: pointer;
`;

const PreviewContainer = styled.div`
    display: flex;
    width: 350px;
    height: 240px;
    border: 1px solid #808080;
    overflow: scroll;
`;


export default UploadProduct;