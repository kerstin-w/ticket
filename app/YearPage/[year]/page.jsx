'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { categories as allCategories } from '@/app/(constants)/categories';
import {
  organizeCategories,
  getYearFromCategory,
} from '@/app/utils/categoryUtils';
import TicketCard from '@/app/(components)/TicketCard';
import Spinner from '@/app/(components)/Spinner';

const YearPage = ({ params }) => {
    const { year } = params;
    const [tickets, setTickets] = useState([]);
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      if (year) {
        const fetchTickets = async () => {
          const res = await fetch('/api/Tickets');
          const { tickets } = await res.json();
          const yearTickets = tickets.filter(ticket => getYearFromCategory(ticket.category) === year);
          setTickets(yearTickets);
        };
  
        fetchTickets();
  
        const yearCategories = organizeCategories(allCategories)[year] || [];
        setCategories(yearCategories);
      }
    }, [year]);
  
    const onDragEnd = async (result) => {
      // Implement your drag and drop logic here
    };
  
    const getCategorySummary = (category) => {
      const categoryTickets = tickets.filter(
        (ticket) => ticket.category === category
      );
      const totalHours = categoryTickets.reduce(
        (sum, ticket) => sum + (ticket.hours || 0),
        0
      );
      const totalCosts = categoryTickets.reduce(
        (sum, ticket) => sum + (ticket.costs || 0),
        0
      );
      return { totalHours, totalCosts };
    };
  
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-4">Tickets for {year}</h1>
          <div className="flex">
            {categories.length && tickets.length ? (
              categories.map((category) => (
                <Droppable key={category.value} droppableId={category.value}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="mb-4 border border-gray-300 p-2 mr-2 rounded-md"
                    >
                      <h2>{category.label}</h2>
                      <div className="text-sm text-gray-600 mb-2">
                        <p>Total Hours: {getCategorySummary(category.value).totalHours}</p>
                        <p>Total Costs: €{getCategorySummary(category.value).totalCosts.toFixed(2)}</p>
                      </div>
                      <div className="w-[20vw]">
                        {tickets
                          .filter((ticket) => ticket.category === category.value)
                          .map((ticket, index) => (
                            <Draggable key={ticket._id} draggableId={ticket._id} index={index}>
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
  
  export default YearPage;