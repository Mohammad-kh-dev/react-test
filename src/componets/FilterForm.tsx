import React, { useState } from 'react';

interface FilterFormProps {
    setFilter: (filter: { title: string; startDate: string; endDate: string }) => void;
}

export const FilterForm: React.FC<FilterFormProps> = ({ setFilter }) => {
    const [title, setTitle] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFilter({ title, startDate, endDate });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search by title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <button type="submit">Filter</button>
        </form>
    );
};

