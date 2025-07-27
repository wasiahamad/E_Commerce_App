import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;


export const postData = async (url, formData) => {
    try {
        const response = await fetch(apiUrl + url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include the token in the headers
                "Content-Type": "application/json", // Specify the content type as JSON
            },
            body: JSON.stringify(formData),
        })  

        // if (!response.ok) {
        //     throw new Error(data?.message || "Something went wrong");
        // }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};