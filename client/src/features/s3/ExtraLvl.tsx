import { useEffect, useState } from "react";
import { DEPLOY_DOMAIN } from "../../hosts/options";
import { useNavigate } from "react-router-dom";

interface ImgObj {
    id: number;
    word: string;
    word_heb: string;
    word_rus: string;
    url: string;
    level: number;
}

const ExtraLvl = () => {
    const [image, setImage] = useState<ImgObj | null>(null);
    const [url, setUrl] = useState<string | undefined>();
    const navigate = useNavigate()

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${DEPLOY_DOMAIN}/s3/getimg/smile`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            const urlResponse = await fetch(`${DEPLOY_DOMAIN}/s3/gettesturl`)
            if (!response.ok) {
                throw new Error('Failed to fetch SIGNED URL data');
            }
            const urlData = await urlResponse.json();

            setImage(data);
            setUrl(urlData.url)
        } catch (error) {
            console.error('Fetch failed:', error);
        }
    };

    return (
        <>
            <h2>Hello From AWS S3 storage</h2>
            {console.log(image)}
            {image ? (
                <div>
                    <p>ID: {image.id}</p>
                    <p>Word: {image.word}</p>
                    <p>Word Heb: {image.word_heb}</p>
                    <p>Word Rus: {image.word_rus}</p>
                    <img src={url} alt={image.word} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <button onClick={() => navigate('/')}>Back</button>
        </>
    );
};

export default ExtraLvl;
