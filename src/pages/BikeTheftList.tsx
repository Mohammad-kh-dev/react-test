import React, { useState, useEffect } from 'react';
import './BikeTheftList.css';
import { FilterForm } from '../componets/FilterForm';
import { Pagination } from '../componets/Pagination';
import { BikeTheftItem } from '../componets/BikeTheftItem';

interface BikeTheft {
    id: number;
    title: string;
    description: string;
    date_of_theft: string;
    date_reported: string;
    location: string;
    picture?: string;
}

export const BikeTheftList: React.FC = () => {
    const [thefts, setThefts] = useState<BikeTheft[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [filter, setFilter] = useState<{ title: string; startDate: string; endDate: string }>({
        title: '',
        startDate: '',
        endDate: '',
    });

 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (thefts.length === 0) return <div>No results found.</div>;

    return (
        <div className="container">
            <h1>Reported Bike Thefts in Munich</h1>
            <FilterForm setFilter={setFilter} />
            <ul>
                {thefts.map(theft => (
                    <BikeTheftItem key={theft.id} theft={theft} />
                ))}
            </ul>
            <Pagination currentPage={page} setPage={setPage} />
        </div>
    );
};

