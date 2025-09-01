import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;


// Function to make a POST request
// export const postData = async (url, formData) => {
//     try {
//         const response = await fetch(apiUrl + url, {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Include the token in the headers
//                 "Content-Type": "application/json", // Specify the content type as JSON
//             },
//             body: JSON.stringify(formData),
//         });

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };

export const postData = async (url, formData) => {
    try {
        const response = await fetch(apiUrl + url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        // If token is expired or invalid
        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userEmail");
            window.location.href = "/"; // 👈 redirect to home
            return { error: true, message: "Session expired. Please login again." };
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};

// Function to make a GET request
export const getData = async (url) => {
    try {
        const { data } = await axios.get(apiUrl + url, {
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

// Function to make a PUT request
export const editData = async (url, updateData) => {
    try {
        const params = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Include the token in the headers
                "Content-Type": "multipart/form-data", // Specify the content type as multipart/form-data for file uploads
            },
        }

        let response;
        await axios.put(apiUrl + url, updateData, params)
            .then((res) => {
                console.log("Response from editData:", res);
                response = res;
            })
            .catch((err) => {
                console.error(err);
                response = { error: true, message: "Error updating data" };
            });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const editCategoryData = async (url, updateData, files = []) => {
    try {
        const formData = new FormData();

        // Append text fields
        Object.keys(updateData).forEach(key => {
            formData.append(key, updateData[key]);
        });

        // Append new image files (if any)
        files.forEach(file => {
            formData.append("image", file); // Ensure this matches the backend expectation
        });

        // If you have existing images, append them as well
        if (updateData.existingImages) {
            updateData.existingImages.forEach(image => {
                formData.append("existingImages[]", image); // Use an array notation for existing images
            });
        }

        const params = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                // Remove Content-Type header
                "Content-Type": "multipart/form-data",
            },
        };

        const response = await axios.put(apiUrl + url, formData, params);
        return response.data;

    } catch (error) {
        console.error("EditData error:", error.response?.data || error.message);
        return { error: true, message: "Error updating data" };
    }
};


export const editUserData = async (url, updateData) => {
    try {
        const params = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Include the token in the headers
                "Content-Type": "application/json", // Specify the content type as JSON
            },
        }

        let response;
        await axios.put(apiUrl + url, updateData, params)
            .then((res) => {
                console.log("Response from editData:", res);
                response = res;
            })
            .catch((err) => {
                console.error(err);
                response = { error: true, message: "Error updating data" };
            });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// craete a category function for post request and image upload
export const createCategory = async (url, formData) => {
    try {
        const params = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // Include the token in the headers
                "Content-Type": "multipart/form-data", // Specify the content type as multipart/form-data for file uploads
            },
        }

        let response;
        await axios.post(apiUrl + url, formData, params)
            .then((res) => {
                console.log("Response from createCategory:", res);
                response = res;
            })
            .catch((err) => {
                console.error(err);
                response = { error: true, message: "Error creating category" };
            });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// delete request 
export const deleteData = async (url) => {
    try {
        const params = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json",
            },
        };

        let response;
        await axios.delete(apiUrl + url, params)
            .then((res) => {
                response = res;
            })
            .catch((err) => {
                console.error(err);
                response = { error: true, message: "Error deleting data" };
            });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// get all products
export const getProducts = async (page = 1, perPage = 10) => {
    try {
        const res = await axios.get(`${apiUrl}/api/v1/product?page=${page}&perPage=${perPage}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json", // Specify the content type as JSON
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return { error: true, data: [] };
    }
};

// delete product
export const deleteProduct = async (id) => {
    try {
        const res = await axios.delete(`${apiUrl}/api/v1/product/delete/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        return { error: true, message: "Error deleting product" };
    }
};

// update product
export const updateProduct = async (id, formData) => {
    try {
        const res = await axios.put(`${apiUrl}/api/v1/product/update/${id}`, formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        console.error("Error updating product:", error);
        return { error: true, message: "Error updating product" };
    }
};



