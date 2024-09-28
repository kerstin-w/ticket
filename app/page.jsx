'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TicketCard from './(components)/TicketCard';
import dotenv from 'dotenv';
import Spinner from './(components)/Spinner';
import { categories as predefinedCategories } from './(constants)/categories';

dotenv.config();

const getTickets = async () => {
  try {
    const res = await fetch('/api/Tickets', {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch tickets');
    return res.json();
  } catch (error) {
    console.error('Failed to get tickets', error);
    return { tickets: [] };
  }
};

const updateTicketCategory = async (ticketId, updatedTicket) => {
  try {
    const response = await fetch(`/api/Tickets/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTicket),
    });
    if (!response.ok) throw new Error('Failed to update ticket');
    return response.json();
  } catch (error) {
    console.error('Error updating ticket:', error);
    throw error;
  }
};

const downloadExcelFile = async () => {
  try {
    const response = await fetch('/api/generateExcel', {
      method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to generate Excel file');

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'tickets.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading Excel file:', error);
  }
};

const getCost = (ticket) => {
  if (ticket.status !== 'not started' && ticket.actualCosts) {
    return ticket.actualCosts;
  }
  return ticket.estimatedCosts || 0; // Use 0 as fallback if estimatedCosts is not set
};

const CategoryColumn = ({ category, tickets, getCategorySummary }) => (
  <Droppable key={category} droppableId={category}>
    {(provided) => (
      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        className="mb-4 border border-gray-300 p-2 mr-2 rounded-md"
      >
        <h2>
          {predefinedCategories.find((c) => c.value === category)?.label ||
            category}
        </h2>
        <div className="text-sm text-gray-600 mb-2">
          <p>Total Hours: {getCategorySummary(category).totalHours}</p>
          <p>
            Total Costs: €{getCategorySummary(category).totalCosts.toFixed(2)}
          </p>
        </div>
        <div className="w-[20vw]">
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
);

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState(
    predefinedCategories.map((c) => c.value)
  );

  useEffect(() => {
    const fetchTickets = async () => {
      const { tickets } = await getTickets();
      setTickets(tickets);

      const dynamicCategories = [
        ...new Set(tickets.map(({ category }) => category)),
      ];
      const allCategories = [
        ...new Set([
          ...predefinedCategories.map((c) => c.value),
          ...dynamicCategories,
        ]),
      ];
      setCategories(allCategories);
    };
    fetchTickets();
  }, []);

  const onDragEnd = useCallback(
    async (result) => {
      if (!result.destination) return;

      const { source, destination, draggableId } = result;

      if (source.droppableId !== destination.droppableId) {
        const sourceCategory = source.droppableId;
        const destCategory = destination.droppableId;

        const movedTicket = tickets.find(
          (ticket) => ticket._id === draggableId
        );

        if (!movedTicket) {
          console.error('Ticket not found:', draggableId);
          return;
        }

        setTickets((prev) =>
          prev.map((ticket) =>
            ticket._id === draggableId
              ? { ...ticket, category: destCategory }
              : ticket
          )
        );

        try {
          await updateTicketCategory(movedTicket._id, {
            ...movedTicket,
            category: destCategory,
          });
        } catch (error) {
          setTickets((prev) =>
            prev.map((ticket) =>
              ticket._id === draggableId
                ? { ...ticket, category: sourceCategory }
                : ticket
            )
          );
        }
      }
    },
    [tickets]
  );

  const getCategorySummary = useCallback(
    (category) => {
      const categoryTickets = tickets.filter(
        (ticket) => ticket.category === category
      );
      const totalHours = categoryTickets.reduce(
        (sum, ticket) => sum + (ticket.hours || 0),
        0
      );
      const totalCosts = categoryTickets.reduce(
        (sum, ticket) => sum + getCost(ticket),
        0
      );
      return { totalHours, totalCosts };
    },
    [tickets]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-5">
        <button
          onClick={downloadExcelFile}
          className="mb-4 btn w-64 text-default-text"
        >
          Download Excel
        </button>
        <div className="flex">
          {categories.length && tickets.length ? (
            categories.map((category) => (
              <CategoryColumn
                key={category}
                category={category}
                tickets={tickets}
                getCategorySummary={getCategorySummary}
              />
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
