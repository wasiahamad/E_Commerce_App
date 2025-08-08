import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoMdClose } from "react-icons/io";
import Slide from '@mui/material/Slide';
import { MyContext } from '../../App';
import AddProduct from '../../Pages/Products/AddProduct.jsx';
import AddHomeSlider from '../../Pages/HomeSliderBanner/AddHomeSlider.jsx';
import AddCategoryList from '../../Pages/CategoryList/AddCategoryList.jsx';
import AddSubCategoryList from '../../Pages/CategoryList/AddSubCategoryList.jsx';
import AddBannerV1 from '../../Pages/BannerV1/AddBannerV1.jsx';
import AddBannerV2 from '../../Pages/BannerV2/AddBannerV2.jsx';
import AddAddress from '../../Pages/Address/AddAddress.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const AddProductForm = () => {

    const context = useContext(MyContext);
    // const [open, setOpen] = useState(false);

    const handleClose = () => {
        context.setIsOpenAddProductForm({ isOpen: false });
    };


    return (
        <Dialog
            fullScreen
            open={context.isOpenAddProductForm.isOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <IoMdClose size={25} className='!text-[#000] '/>
                    </IconButton>
                    <Typography  sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        <span className='!text-gray-800 !font-[600]'> {context.isOpenAddProductForm.model}</span>
                    </Typography>
                </Toolbar>
            </AppBar>
            {
                context.isOpenAddProductForm?.model === "Add Product" && <AddProduct />

            }
            {
                context.isOpenAddProductForm?.model === "Add Home Slider" && <AddHomeSlider />

            }

            {
                context.isOpenAddProductForm?.model === "Add Category" && <AddCategoryList />
            }

            {
                context.isOpenAddProductForm?.model === "Add Sub Category" && <AddSubCategoryList  />
            }

            {
                context.isOpenAddProductForm?.model === "Add Banner List-1" && <AddBannerV1  />
            }

            {
                context.isOpenAddProductForm?.model === "Add Banner List-2" && <AddBannerV2  />
            }

            {
                context.isOpenAddProductForm?.model === "Add Address" && <AddAddress  />
            }
            
        </Dialog>
    )
}

export default AddProductForm