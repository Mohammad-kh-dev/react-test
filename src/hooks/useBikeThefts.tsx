import { useState, useEffect } from 'react';
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
export const useBikeThefts = () => {
    const [thefts, setThefts] = useState<BikeTheft[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [filter, setFilter] = useState<{ title: string; startDate: string; endDate: string }>({
        title: '',
        startDate: '',
        endDate: '',
    });
    const perPage: number = 10;
    const location: string = '77.184.79.28';

    useEffect(() => {
        const fetchThefts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://bikeindex.org:443/api/v3/search?page=${page}&per_page=${perPage}&location=${location}&distance=10&stolenness=proximity`);
                const data = await response.json();
                setThefts(data.bikes);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchThefts();
    }, [page, filter]);

    return { thefts, loading, error, page,setPage, setFilter }; // Return the state and setters
};