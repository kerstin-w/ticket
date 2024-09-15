'use client';
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TicketCard from './(components)/TicketCard';
import dotenv from 'dotenv';
import Spinner from './(components)/Spinner';

dotenv.config();

const predefinedCategories = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'Q42024', label: 'Q4/2024' },
  { value: '2025', label: '2025' },
];

const getTickets = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/Tickets', {
      cache: 'no-store',
    });
    return res.json();
  } catch (error) {
    console.log('Failed to get tickets', error);
  }
};

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState(
    predefinedCategories.map((c) => c.value)
  );

  useEffect(() => {
    const fetchTickets = async () => {
      const { tickets } = await getTickets();
      setTickets(tickets);

      // Get dynamic categories from tickets and merge with predefined ones, ensuring no duplicates
      const dynamicCategories = [
        ...new Set(tickets.map(({ category }) => category)),
      ];
      const allCategories = [
        ...new Set([
          ...predefinedCategories.map((c) => c.value),
          ...dynamicCategories,
        ]),
      ];
      console.log('All categories:', allCategories); // Log categories
      setCategories(allCategories);
    };
    fetchTickets();
  }, []);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceCategory = source.droppableId;
      const destCategory = destination.droppableId;

      // Find the ticket that was dragged
      const movedTicket = tickets.find((ticket) => ticket._id === draggableId);

      if (!movedTicket) {
        console.error('Ticket not found:', draggableId);
        return;
      }

      // Update local state
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === draggableId
            ? { ...ticket, category: destCategory }
            : ticket
        )
      );

      // Update the ticket in the database
      try {
        const response = await fetch(
          `http://localhost:3000/api/Tickets/${movedTicket._id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...movedTicket,
              category: destCategory,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to update ticket');
        }

        const updatedTicket = await response.json();
        console.log('Ticket updated successfully:', updatedTicket);
      } catch (error) {
        console.error('Error updating ticket:', error);
        // Revert the state if the API call fails
        setTickets((prev) =>
          prev.map((ticket) =>
            ticket._id === draggableId
              ? { ...ticket, category: sourceCategory }
              : ticket
          )
        );
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-5">
        <div className="flex">
          {categories.length && tickets.length ? (
            categories.map((category) => (
              <Droppable key={category} droppableId={category}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="mb-4"
                  >
                    <h2>
                      {predefinedCategories.find((c) => c.value === category)
                        ?.label || category}
                    </h2>
                    <div className="w-[30vw]">
                      {tickets
                        .filter((ticket) => ticket.category === category)
                        .map((ticket, index) => (
                          <Draggable
                            key={ticket._id}
                            draggableId={ticket._id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <TicketCard id={ticket._id} ticket={ticket} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Dashboard;
