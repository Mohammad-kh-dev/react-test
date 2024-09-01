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
const perPage: number = 10;
const location: string = '77.184.79.28';

export const useBikeThefts = () => {
    const [thefts, setThefts] = useState<BikeTheft[]>([]);
    const [filteredThefts, setFilteredThefts] = useState<BikeTheft[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [filter, setFilter] = useState<{ title: string; startDate: string; endDate: string }>({
        title: '',
        startDate: '',
        endDate: '',
    });
   

    useEffect(() => {
        const fetchThefts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://bikeindex.org:443/api/v3/search?page=${page}&per_page=${perPage}&location=${location}&distance=10&stolenness=proximity`);
                const data = await response.json();
                setThefts(data.bikes);
                setFilteredThefts(data.bikes);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchThefts();
    }, [page]);
    useEffect(() => {
        // Apply local filtering based on title, startDate, and endDate
        const filtered = thefts.filter(theft => {
            const matchesTitle = theft.title.toLowerCase().includes(filter.title.toLowerCase());

            const matchesStartDate = !filter.startDate || new Date(theft.date_stolen * 1000) >= new Date(filter.startDate);

            const matchesEndDate = !filter.endDate || new Date(theft.date_stolen * 1000) <= new Date(filter.endDate);

            return matchesTitle && matchesStartDate && matchesEndDate;
        });

        setFilteredThefts(filtered);
    }, [filter, thefts]);

    return { thefts, loading, error, page,setPage, setFilter,filteredThefts }; // Return the state and setters
};

export const useBikeTheftCount = () => {
    const [totalCount, setTotalCount] = useState<number | null>(null);
    const [loadingCount, setLoadingCount] = useState<boolean>(true);
    const [errorCount, setErrorCount] = useState<string | null>(null);
    
    console.log(totalCount)

    useEffect(() => {
        const fetchTheftCount = async () => {
            setLoadingCount(true);
            setErrorCount(null);
            try {
                const response = await fetch(
                    `https://bikeindex.org:443/api/v3/search/count?location=${location}&stolenness=proximity`
                );
                const data = await response.json();
                const total = data.stolen + data.non + data.proximity;
                setTotalCount(total);
            } catch (err) {
                setErrorCount(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoadingCount(false);
            }
        };

        fetchTheftCount();
    }, []);

    return { totalCount, loadingCount, errorCount };
};