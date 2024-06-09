import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../api";

interface ImgObj {
    id: number;
    word: string;
    word_heb: string;
    word_rus: string;
    level: number;
}

const ExtraLvl = () => {
    const [image, setImage] = useState<ImgObj | null>(null);
    const [photoData, setPhotoData] = useState<string | undefined>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await client.get(`/s3/getimg/smile`);
            const imageData = await response.data;
            setImage(imageData);

            const urlResponse = await client.get(`/s3/getphoto`);
            const urlData = await urlResponse.data;
            console.log(urlData);
            
            setPhotoData(urlData);
        } catch (error) {
            console.error('Fetch failed:', error);
        }
    };

    return (
        <>
            <h2>Hello From AWS S3 storage</h2>
            {image ? (
                <div>
                    <p>ID: {image.id}</p>
                    <p>Word: {image.word}</p>
                    <p>Word Heb: {image.word_heb}</p>
                    <p>Word Rus: {image.word_rus}</p>
                    {photoData ? (
                        <img src={photoData} alt={image.word} />
                    ) : (
                        <p>Loading image...</p>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <button onClick={() => navigate('/')}>Back</button>
        </>
    );
};

export default ExtraLvl;
