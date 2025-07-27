import axios from "axios";


export const postData = async (url, formData) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`, // Include the token in the headers
                "Content-Type": "application/json", // Specify the content type as JSON
            },
            body: JSON.stringify(formData),
        })  
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};