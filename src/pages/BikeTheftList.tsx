import React from 'react';
import './BikeTheftList.css';
import { FilterForm } from '../componets/FilterForm';
import { Pagination } from '../componets/Pagination';
import { BikeTheftItem } from '../componets/BikeTheftItem';
import { useBikeTheftCount, useBikeThefts } from '../hooks/useBikeThefts';

 

export const BikeTheftList: React.FC = () => {
    const { filteredThefts, loading, error, page,setPage,setFilter} = useBikeThefts();
    const { totalCount, loadingCount} = useBikeTheftCount();
    if (loading) return (
        <div className='loading-container'>
            <div className='loading'>Loading...</div>
        </div>
    );
    if (error) return <div>Error: {error}</div>;
    if (filteredThefts.length === 0) return <div>No results found.</div>;

    return (
        <div className="container">
            <h1>Reported Bike Thefts in Munich{!loadingCount && totalCount && ` - Total Count: ${totalCount}`}</h1>
            <FilterForm setFilter={setFilter} />
            {filteredThefts.length > 0 ? (
                <ul>
                    {filteredThefts.map(theft => (
                        <BikeTheftItem key={theft.id} theft={theft} />
                    ))}
                </ul>
            ) : (
                <div>No data available.</div>
            )}
            <Pagination currentPage={page} setPage={setPage} />
        </div>
    );
};

