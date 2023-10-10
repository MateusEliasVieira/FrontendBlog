// Transforma imagem em string base64
const imageToBase64 = (image:File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader?.result; // Remove o cabeçalho "data:image/jpeg;base64,"
            if(base64?.split("").length <= 65343434){
                resolve(base64);
            }else{
                reject()
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(image);
    });
}

export default imageToBase64;