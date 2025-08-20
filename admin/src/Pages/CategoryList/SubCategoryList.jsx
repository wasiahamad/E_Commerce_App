import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    IconButton,
    Button,
    Box,
    List,
    ListItem,
    ListItemText,
    TextField,
    Select,
    MenuItem
} from "@mui/material";
import { MyContext } from "../../App";
import { BiEdit } from "react-icons/bi";
import { FaDeleteLeft } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

const API_URL = "http://localhost:8000/api/v1/category"; // ⚡ apna backend ka URL daalo

const SubCategoryList = () => {
    const [expanded, setExpanded] = useState(false);
    const [categories, setCategories] = useState([]);

    // Subcategory edit state
    const [editSubIndex, setEditSubIndex] = useState(null);
    const [editCategory, setEditCategory] = useState("");
    const [editSubName, setEditSubName] = useState("");

    // Third subcategory edit state
    const [editItemIndex, setEditItemIndex] = useState({ subIdx: null, itemIdx: null });
    const [editItemParent, setEditItemParent] = useState("");
    const [editItemName, setEditItemName] = useState("");

    const context = useContext(MyContext);

    // ✅ Get categories from DB
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(API_URL);
            setCategories(res.data.data); // aapka backend {data: []} bhej raha hai
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    const handleExpand = (panel) => (_event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // ✅ Subcategory Edit
    const handleSubEditClick = (sub, idx, category) => {
        setEditSubIndex(idx);
        setEditCategory(category);
        setEditSubName(sub.name);
    };

    const handleSubSave = async (subId) => {
        console.log("Sending update:", {
            name: editSubName,
            parentCatId: editCategory?.id, // ✅ ID pass hogi, // yahan ID bhejni hai
            parentCatName: editCategory
        });
        const token = localStorage.getItem("accessToken");

        try {
            const res = await axios.put(`${API_URL}/update/${subId}`, {
                name: editSubName,
                parentCatId: editCategory?.id, // ✅ ID pass hogi, // yahan ID bhejni hai
                parentCatName: editCategory
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Updated successfully:", res.data);
            fetchCategories(); // reload list
            setEditSubIndex(null);
        } catch (err) {
            console.error("Error updating subcategory:", err);
        }
    };

    // ✅ Third SubCategory Edit
    const handleItemEditClick = (item, subIdx, itemIdx, parentName) => {
        setEditItemIndex({ subIdx, itemIdx });
        setEditItemParent(parentName);
        setEditItemName(item.name); // item is object from DB
    };


    const handleItemSave = async (id) => {
        console.log("Sending update:", {
            name: editItemName,
            parentCatId: editItemParent.id, // yahan ID bhejni hai
            parentCatName: editItemParent
        });

        const token = localStorage.getItem("accessToken");

        try {
            const res = await axios.put(
                `http://localhost:8000/api/v1/category/update/${id}`,
                {
                    name: editItemName,
                    parentCatId: editItemParent.id,  // ✅ parent category ka _id bhejna
                    parentCatName: editItemParent
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Updated successfully:", res.data);
            fetchCategories(); // reload list
            setEditItemIndex({ subIdx: null, itemIdx: null });
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    // ✅ Delete Category/Sub/Third
    const handleDelete = async (id) => {
        const token = localStorage.getItem("accessToken"); // token uthao
        try {
            await axios.delete(`${API_URL}/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ auth header bhejo
                    "Content-Type": "application/json",
                },
            });
            fetchCategories();
        } catch (err) {
            console.error("Error deleting:", err);
        }
    };


    const handleCancel = () => {
        setEditSubIndex(null);
        setEditItemIndex({ subIdx: null, itemIdx: null });
    };

    return (
        <div
            className={`contentRight py-4 px-5 ${context.isSidebarOpen ? "w-[80%]" : "w-[100%] pl-0"
                } transition-all duration-300`}
        >
            <div className="flex items-center justify-between">
                <Typography variant="h6" gutterBottom sx={{ ml: 2 }}>
                    Sub Category List
                </Typography>
                <Button
                    variant="contained"
                    sx={{ mb: 4, mt: 2 }}
                    color="primary"
                    onClick={() => context.setIsOpenAddProductForm({ isOpen: true, model: "Add Sub Category" })}
                >
                    Add New Sub Category
                </Button>
            </div>
            <Box sx={{ p: 3 }} className="!bg-white">
                {categories.map((category, index) => (
                    <Accordion key={category._id} className="mb-2">
                        {/* ✅ Category */}
                        <AccordionSummary
                            className="flex items-center justify-between !bg-[#f1f1f1]"
                            expandIcon={<IoIosArrowDown size={18} onClick={handleExpand(index)} />}
                        >
                            <Typography>{category.name}</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            {category.children?.map((sub, subIdx) => (
                                <Box key={sub._id} >
                                    {/* ✅ Subcategory */}
                                    <List dense>
                                        {editSubIndex === subIdx ? (
                                            <ListItem>
                                                <Select
                                                    value={editCategory}
                                                    onChange={(e) => setEditCategory(e.target.value)}
                                                    size="small"
                                                // sx={{ mr: 2, minWidth: 120 }}
                                                >
                                                    {categories.map((cat) => (
                                                        <MenuItem key={cat._id} value={cat.name}>
                                                            {cat.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>

                                                <TextField
                                                    value={editSubName}
                                                    onChange={(e) => setEditSubName(e.target.value)}
                                                    size="small"
                                                    sx={{ mr: 2 }}
                                                />

                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    sx={{ mr: 1 }}
                                                    onClick={() => handleSubSave(sub._id)}
                                                >
                                                    SAVE
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    onClick={handleCancel}
                                                >
                                                    CANCEL
                                                </Button>
                                            </ListItem>
                                        ) : (
                                            <ListItem
                                                secondaryAction={
                                                    <>
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="edit"
                                                            onClick={() =>
                                                                handleSubEditClick(sub, subIdx, category.name)
                                                            }
                                                        >
                                                            <BiEdit size={18} />
                                                        </IconButton>
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="delete"
                                                            onClick={() => handleDelete(sub._id)}
                                                        >
                                                            <FaDeleteLeft size={18} />
                                                        </IconButton>
                                                    </>
                                                }
                                            >
                                                <ListItemText
                                                    primary={sub.name}
                                                    primaryTypographyProps={{ fontWeight: "bold" }}
                                                />
                                            </ListItem>
                                        )}
                                    </List>

                                    {/* ✅ Third Subcategory Items */}
                                    <List dense>
                                        {sub.children?.map((item, itemIdx) =>
                                            editItemIndex.subIdx === subIdx &&
                                                editItemIndex.itemIdx === itemIdx ? (
                                                <ListItem key={item._id} >
                                                    <Select
                                                        value={editItemParent}
                                                        onChange={(e) => setEditItemParent(e.target.value)}
                                                        size="small"
                                                    // sx={{ mr: 2, minWidth: 120 }}
                                                    >
                                                        {category.children.map((s) => (
                                                            <MenuItem key={s._id} value={s.name}>
                                                                {s.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>

                                                    <TextField
                                                        value={editItemName}
                                                        onChange={(e) => setEditItemName(e.target.value)}
                                                        size="small"
                                                        sx={{ mr: 2 }}
                                                    />

                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        sx={{ mr: 1 }}
                                                        onClick={() => handleItemSave(item._id)}
                                                    >
                                                        SAVE
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        onClick={handleCancel}
                                                    >
                                                        CANCEL
                                                    </Button>
                                                </ListItem>
                                            ) : (
                                                <ListItem
                                                    key={item._id}
                                                    sx={{
                                                        pl: 6,
                                                        borderRadius: "8px",
                                                        transition: "all 0.2s ease",
                                                        "&:hover": {
                                                            backgroundColor: "#f5f5f5",
                                                            transform: "translateX(4px)",
                                                        },
                                                    }}
                                                    secondaryAction={
                                                        <>
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="edit"
                                                                onClick={() =>
                                                                    handleItemEditClick(
                                                                        item,
                                                                        subIdx,
                                                                        itemIdx,
                                                                        sub.name
                                                                    )
                                                                }
                                                            >
                                                                <BiEdit size={18} />
                                                            </IconButton>
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="delete"
                                                                onClick={() => handleDelete(item._id)}
                                                            >
                                                                <FaDeleteLeft size={18} />
                                                            </IconButton>
                                                        </>
                                                    }
                                                >
                                                    <ListItemText primary={item.name} />
                                                </ListItem>
                                            )
                                        )}
                                    </List>
                                </Box>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </div>
    );
};

export default SubCategoryList;
