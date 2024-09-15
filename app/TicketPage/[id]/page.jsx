import TicketForm from '@/app/(components)/TicketForm';
import dotenv from 'dotenv';

dotenv.config();

const getTicketById = async (id) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/Tickets/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to get Ticket: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching ticket:', error);
    throw error;
  }
};

const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === 'new' ? false : true;
  let updateTicketData = {};
  if (EDITMODE) {
    try {
      const data = await getTicketById(params.id);
      updateTicketData = data.foundTicket;
    } catch (error) {
      console.error('Error in TicketPage:', error);
      return <div>Error loading ticket: {error.message}</div>;
    }
  } else {
    updateTicketData = {
      _id: 'new',
    };
  }

  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
