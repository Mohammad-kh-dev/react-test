import React from 'react';

interface BikeTheft {
    id: number;
    title: string;
    description: string | null;
    date_stolen: number;
    date_reported?: number;
    stolen_location: string;
    large_img?: string;
    year?: number;
}

interface BikeTheftItemProps {
    theft: BikeTheft;
}

const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // Convert UNIX timestamp to milliseconds
    return date.toLocaleDateString();
};

export const BikeTheftItem: React.FC<BikeTheftItemProps> = ({ theft }) => {
    return (
        <li className="bike-theft-item">
            <h2>{theft.title} ({theft.year})</h2>
            {theft.description ? (
                <p className="description">{theft.description}</p>
            ) : (
                <p className="description no-description">No description available</p>
            )}
            <p>Date of Theft: {formatDate(theft.date_stolen)}</p>
            {theft.date_reported && <p>Reported On: {formatDate(theft.date_reported)}</p>}
            <p>Location: {theft.stolen_location}</p>
            {theft.large_img && <img src={theft.large_img} alt="Bike" />}
        </li>
    );
};
