import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;


// Function to make a POST request
export const postData = async (url, formData) => {
    try {
        const response = await fetch(apiUrl + url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Include the token in the headers
                "Content-Type": "application/json", // Specify the content type as JSON
            },
            body: JSON.stringify(formData),
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Function to make a GET request
export const getData = async (url) => {
    try {
        const {data} = await axios.get(apiUrl + url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Include the token in the headers
                "Content-Type": "application/json",
            },
        });
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}