import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';



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
            const response = await fetch('https://smart-tech-rho.vercel.app/api/CreateProduct', {
                method: 'POST',
                headers: {
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
        <div className="card" style={{ width: '18rem' }}>
            <div>
                {imageUrl && (<img src={imageUrl} className="card-img-top" alt="..." />
                )}
                <p>Upload Image </p>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <Button variant="contained" onClick={handleImageUpload}>
                    Upload
                </Button>

            </div>
            <div className="card-body" style={{ margin: '2px', width: '100%' }}>
                <div className="input-group" style={{ marginBottom: '4px' }}>
                    <span className="input-group-text">Details</span>
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
                    <input
                        type="text"
                        name="description"
                        aria-label="Description"
                        className="form-control"
                        value={formData.description}
                        placeholder="Product Description"
                        onChange={handleChange}
                        style={{ width: '100%', marginBottom: '4px' }}
                    />
                    <DropdownMenu
                        selectedValue={formData.Category}
                        onSelect={(value) => handleChange({ target: { name: 'Category', value } })}
                    />
                </div>
                <div className="input-group" style={{ width: '100%', marginBottom: '4px' }}>
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
                        className="btn btn-outline-success"
                        style={{ marginTop: '3px' }}
                        onClick={handleDetailsUpdate}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

// Separate Dropdown component
const DropdownMenu = ({ selectedValue, onSelect }) => {
    return (
        <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Dropdown button
            </button>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
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
