import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './newCard.css'


const NewCard = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        Category: 'Advance',
    });
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleDetailsUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://smart-tech-tawny.vercel.app/api/CreateProduct', {
                method: 'POST',
                headers: {
                    'X-Content-Type-Options': 'nosniff',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: formData.title,
                    Discription: formData.description,
                    Category: formData.Category,
                    image: imageUrl,
                    price: formData.price,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            props.changeInterface();
            navigate('/admin');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const cloudName = 'serenaproject'; // Replace with your Cloudinary cloud name
            const uploadPreset = 'Ecommerce_app'; // Replace with your Cloudinary upload preset

            try {
                const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=${uploadPreset}`;

                const res = await fetch(uploadUrl, {
                    method: 'POST',
                    body: formData,
                });

                if (res.ok) {
                    const imageData = await res.json();
                    alert("image Upladed successfully")
                    setImageUrl(imageData.url); // Assuming Cloudinary returns the URL in the response
                } else {
                    console.error('Error uploading image to Cloudinary:', res.statusText);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    return (
        <div className="newCard" >
            <div className='imgUploadAdmin'>
                {imageUrl && (<img src={imageUrl} className='imgUploadAdminImg' alt="..." />
                )}
                <input
                    className="custom-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <label className="custom-file-label">
                    {selectedFile ? selectedFile.name : 'Choose File'}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="custom-file-input"
                    />
                </label>
                <Button style={{marginTop:'10px'}} variant="contained" onClick={handleImageUpload}>
                    Upload
                </Button>
            </div>

            <div className="newCard-card-body" >
                <div className="input-group1" >
                    <span style={{
                        backgroundColor: 'transparent', color: 'black', border: 'none', fontWeight: '600', fontSize: '18px',
                        paddingLeft: '0px'
                    }}
                        className="input-group-text">Details
                    </span>
                    <input
                        type="text"
                        name="title"
                        aria-label="Title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        style={{ width: '100%', marginBottom: '4px' }}
                        placeholder="Product Title"
                    />
                    <textarea
                        name="description"
                        aria-label="Description"
                        class="form-control"
                        placeholder="Product Description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>

                    <DropdownMenu
                        style={{marginTop:'10px'}}
                        selectedValue={formData.Category}
                        onSelect={(value) => handleChange({ target: { name: 'Category', value } })}
                    />
                </div>

                <div className="input-group1" style={{ width: '100%', marginBottom: '4px' }}>
                    <input
                        type="text"
                        name="price"
                        aria-label="Price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Product Price"
                        style={{ width: '100%', marginBottom: '4px' }}
                    />
                </div>

                <div className="d-grid gap-2 col-6 mx-auto">
                    <button
                        className="btn btn-primary"
                        style={{ marginTop: '5px' }}
                        onClick={handleDetailsUpdate}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

const DropdownMenu = ({ selectedValue, onSelect }) => {
    return (
        <div >
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {selectedValue ? selectedValue : 'Dropdown button'}
            </button>
            <ul style={{ overflow: 'hidden', }} className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                <li>
                    <p
                        className={`dropdown-item ${selectedValue === 'Advance' ? 'active' : ''}`}
                        onClick={() => onSelect('Advance')}
                    >
                        Advance Electronics
                    </p>
                </li>
                <li>
                    <p
                        className={`dropdown-item ${selectedValue === 'Repairing' ? 'active' : ''}`}
                        onClick={() => onSelect('Repairing')}
                    >
                        Repairing & Tools
                    </p>
                </li>
                <li>
                    <p
                        className={`dropdown-item ${selectedValue === 'Project' ? 'active' : ''}`}
                        onClick={() => onSelect('Project')}
                    >
                        Project Data
                    </p>
                </li>
                <li>
                    <p
                        className={`dropdown-item ${selectedValue === 'Household' ? 'active' : ''}`}
                        onClick={() => onSelect('Household')}
                    >
                        House hold
                    </p>
                </li>
            </ul>
        </div>
    );
};
export default NewCard;
