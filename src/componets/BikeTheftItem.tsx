import React from 'react';

interface BikeTheft {
    id: number;
    title: string;
    description: string;
    date_of_theft: string;
    date_reported: string;
    location: string;
    picture?: string;
}

interface BikeTheftItemProps {
    theft: BikeTheft;
}

export const BikeTheftItem: React.FC<BikeTheftItemProps> = ({ theft }) => {
    return (
        <li>
            <h2>{theft.title}</h2>
            <p>{theft.description}</p>
            <p>Date of Theft: {theft.date_of_theft}</p>
            <p>Reported On: {theft.date_reported}</p>
            <p>Location: {theft.location}</p>
            {theft.picture && <img src={theft.picture} alt="Bike" />}
        </li>
    );
};

