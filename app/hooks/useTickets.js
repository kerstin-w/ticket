import { useState, useEffect } from 'react';

export const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch('/api/Tickets', { cache: 'no-store' });
        const data = await res.json();
        setTickets(data.tickets);
      } catch (error) {
        console.log('Failed to get tickets', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTickets();
  }, []);

  return { tickets, setTickets, isLoading };
};
