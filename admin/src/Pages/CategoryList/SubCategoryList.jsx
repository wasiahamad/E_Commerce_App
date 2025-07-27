import React, { useContext, useState } from "react";
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
} from "@mui/material";
import { MyContext } from "../../App";
import { BiEdit } from "react-icons/bi";
import { FaDeleteLeft } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";


// import {
//   ExpandMore,
//   Edit,
//   Delete,
// } from "@mui/icons-material";

const categories = [
    {
        name: "Fashion",
        subcategories: [
            {
                name: "Women",
                items: ["Kurtas & Suits", "Sarees", "Tops", "Jeans"],
            },
            {
                name: "Girls",
                items: ["Tops", "Kurta Sets"],
            },
        ],
    },
    {
        name: "Electronics",
        subcategories: [],
    },
    {
        name: "Bags",
        subcategories: [],
    },
    {
        name: "Footwear",
        subcategories: [],
    },
    {
        name: "Groceries",
        subcategories: [],
    },
];

const SubCategoryList = () => {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = (panel) => (_event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const context = useContext(MyContext);

    return (
        <div className={`contentRight py-4 px-5 ${context.isSidebarOpen ? "w-[80%]" : "w-[100%] pl-0"} transition-all duration-300`}>
            <div className="flex items-center justify-between">
                <Typography variant="h6" gutterBottom sx={{ ml: 2 }}>
                    Sub Category List
                </Typography>
                <Button
                    variant="contained"
                    sx={{ mb: 4, mt: 2}}
                    color="primary"
                    onClick={() => context.setIsOpenAddProductForm({ isOpen: true, model: "Add Sub Category" })}
                >
                    Add New Sub Category
                </Button>
            </div>
            <Box sx={{ p: 3 }}  className="!bg-white">
                

                {categories.map((category, index) => (

                        <Accordion
                            key={category.name}
                            className="mb-2"
                        >
                            <AccordionSummary className="flex items-center justify-between !bg-[#f1f1f1]" expandIcon={<IoIosArrowDown size={18} onClick={handleExpand(index)} />}>
                                <Typography>{category.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {category.subcategories.map((sub, idx) => (
                                    <Box key={idx} sx={{ pl: 2, mb: 1 }}>
                                        <Typography variant="subtitle1">{sub.name}</Typography>
                                        <List dense>
                                            {sub.items.map((item, i) => (
                                                <ListItem
                                                    key={i}
                                                    secondaryAction={
                                                        <>
                                                            <IconButton edge="end" aria-label="edit">
                                                                <BiEdit size={18} />
                                                            </IconButton>
                                                            <IconButton edge="end" aria-label="delete">
                                                                <FaDeleteLeft size={18} />
                                                            </IconButton>
                                                        </>
                                                    }
                                                >
                                                    <ListItemText primary={item} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    
                ))}
            </Box>
        </div>

    );
}

export default SubCategoryList