interface PostData {
    idPost: number;
    title: string;
    image: string;
    datePublish: string;
    content: string;
    user: {
        idUser: number;
        name: string;
        about: string;
        image: string;
    };
}

export default PostData;
