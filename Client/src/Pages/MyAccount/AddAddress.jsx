import React, { useContext, useState } from "react";
import { TextField, Button, FormControlLabel, Radio, RadioGroup, MenuItem, Select } from "@mui/material";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { postData } from "../../utils/api";
import { MyContext } from "../../App";


const AddAddressForm = () => {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const context = useContext(MyContext);
    const [formFileds, setFormFileds] = useState({
        address_line: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        mobile: "",
        // addressType: "Home",
        status: false
    });


    const handleChange = (e) => {
        setFormFileds({ ...formFileds, [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (value) => {
        setFormFileds({ ...formFileds, phone: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // ✅ Ensure user is logged in
        if (!context?.userData?._id) {
            context.alertBox("error", "User not logged in");
            setLoading(false);
            return;
        }

        const { address_line, city, state, country, pincode, mobile } = formFileds;

        // ✅ Validation
        if (!address_line || !city || !state || !country || !pincode || !mobile) {
            context.alertBox("error", "Please fill all the fields");
            setLoading(false);
            return;
        }

        // ✅ Add userId before sending
        const updatedForm = {
            ...formFileds,
            userId: context.userData._id
        };

        postData("/api/v1/address/add", updatedForm)
            .then((res) => {
                console.log("response", res);

                if (res && res.error !== true) {
                    context.alertBox("success", res?.message);
                    context.setUserData(res?.data);
                    setLoading(false);
                    window.location.href = "/address";
                } else {
                    context.alertBox("error", res?.message || "Something went wrong");
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error(err);
                context.alertBox("error", "Something went wrong");
                setLoading(false);
            });
    };
    return (
        <form
            onSubmit={handleSubmit}
        // className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg"
        >
            <TextField
                label="Address Line 1"
                name="address_line"
                value={formFileds.address_line}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="City"
                name="city"
                value={formFileds.city}
                onChange={handleChange}
                fullWidth
                className="!my-4"
            />
            <TextField
                label="State"
                name="state"
                value={formFileds.state}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Pincode"
                name="pincode"
                value={formFileds.pincode}
                onChange={handleChange}
                fullWidth
                className="!my-4"
            />
            <TextField
                label="Country"
                name="country"
                value={formFileds.country}
                onChange={handleChange}
                fullWidth
            />

            <div className="my-4">
                <PhoneInput
                    defaultCountry="in"
                    value={formFileds.mobile}
                    disabled={loading === true ? true : false}
                    onChange={(value) =>
                        setFormFileds((prev) => ({ ...prev, mobile: value }))
                    }
                    name="mobile"
                />
            </div>

            <div className="col">
                <label className="block mb-1 font-medium text-sm">Status</label>
                <Select
                    value={formFileds.status}
                    onChange={(e) =>
                        setFormFileds((prev) => ({
                            ...prev,
                            status: e.target.value,
                        }))
                    }
                    size="small"
                    displayEmpty
                    className="w-full"
                    inputProps={{ "aria-label": "Without label" }}
                >
                    <MenuItem value={true}>True</MenuItem>
                    <MenuItem value={false}>False</MenuItem>
                </Select>
            </div>

            {/* <TextField
                label="Landmark"
                name="landmark"
                value={formFileds.landmark}
                onChange={handleChange}
                fullWidth
                className="my-4"
            /> */}

            {/* <div className="my-4">
                <RadioGroup
                    row
                    name="addressType"
                    value={formFileds.addressType}
                    onChange={handleChange}
                >
                    <FormControlLabel value="Home" control={<Radio />} label="Home" />
                    <FormControlLabel value="Office" control={<Radio />} label="Office" />
                </RadioGroup>
            </div> */}

            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                    backgroundColor: "#f44336",
                    "&:hover": { backgroundColor: "#d32f2f" },
                    paddingY: "10px",
                    fontSize: "16px",
                }}
            >
                SAVE
            </Button>
        </form>
    );
};

export default AddAddressForm;
