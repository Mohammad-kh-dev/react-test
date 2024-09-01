import React from 'react';
import './BikeTheftList.css';
import { FilterForm } from '../componets/FilterForm';
import { Pagination } from '../componets/Pagination';
import { BikeTheftItem } from '../componets/BikeTheftItem';
import { useBikeThefts } from '../hooks/useBikeThefts';

 

export const BikeTheftList: React.FC = () => {
    const { thefts, loading, error, page,setPage, setFilter } = useBikeThefts();

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

