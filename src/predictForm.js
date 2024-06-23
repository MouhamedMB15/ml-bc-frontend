
//Imports
import React, { useState } from 'react';
import axios from 'axios';
import { IoReload } from "react-icons/io5";
import './predictFormCSS.css'; //styles

//Prediction form
const PredictForm = () => {
    //state form data
    const [formData, setFormData] = useState({
        mean_radius: '',
        mean_texture: '',
        mean_perimeter: '',
        mean_area: '',
        mean_smoothness: '',
        mean_compactness: '',
        mean_concavity: '',
        mean_concave_points: '',
        mean_symmetry: '',
        mean_fractal_dimension: '',
        radius_error: '',
        texture_error: '',
        perimeter_error: '',
        area_error: '',
        smoothness_error: '',
        compactness_error: '',
        concavity_error: '',
        concave_points_error: '',
        symmetry_error: '',
        fractal_dimension_error: '',
        worst_radius: '',
        worst_texture: '',
        worst_perimeter: '',
        worst_area: '',
        worst_smoothness: '',
        worst_compactness: '',
        worst_concavity: '',
        worst_concave_points: '',
        worst_symmetry: '',
        worst_fractal_dimension: '',
    });

    //states 
    const [prediction, setPrediction] = useState(null);
    const [buttonText, setButtonText] = useState('Submit');
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    //submit 
    const handleSubmit = (e) => {
        e.preventDefault();
        const input = Object.values(formData).map(value => parseFloat(value));
        axios.post('https://ml-breast-cancer.herokuapp.com/predict', { input })

            .then(response => {
                setPrediction(response.data.prediction);
                setButtonText('Prediction Completed!');
            })
            .catch(error => {
                console.error('Error:', error);
                setButtonText('Error Occurred');
            });
    };

    //reload
    const handleReload = () => {
        setFormData({
            mean_radius: '',
            mean_texture: '',
            mean_perimeter: '',
            mean_area: '',
            mean_smoothness: '',
            mean_compactness: '',
            mean_concavity: '',
            mean_concave_points: '',
            mean_symmetry: '',
            mean_fractal_dimension: '',
            radius_error: '',
            texture_error: '',
            perimeter_error: '',
            area_error: '',
            smoothness_error: '',
            compactness_error: '',
            concavity_error: '',
            concave_points_error: '',
            symmetry_error: '',
            fractal_dimension_error: '',
            worst_radius: '',
            worst_texture: '',
            worst_perimeter: '',
            worst_area: '',
            worst_smoothness: '',
            worst_compactness: '',
            worst_concavity: '',
            worst_concave_points: '',
            worst_symmetry: '',
            worst_fractal_dimension: '',
        });
        setPrediction(null);
        setButtonText('Submit');
    };

    return (
        <div className="predict-form-container">
            <h1>Breast Cancer Prediction</h1>
            <form onSubmit={handleSubmit} className="predict-form">
                {Object.keys(formData).map(key => (
                    <div key={key} className="form-group">
                        <label>{key.replace(/_/g, ' ')}</label>
                        <input
                            type="text"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button type="submit" className="submit-button">{buttonText}</button>

            </form>
            <button onClick={handleReload} className="reload-button">
                <IoReload /> Reload
            </button>
            {prediction !== null && (
                <div className="prediction-result">
                    <h2>Breast Cancer Tumor Prediction: {prediction === 0 ? 'Malignant' : 'Benign'}</h2>
                </div>
            )}
        </div>
    );
};

export default PredictForm;
