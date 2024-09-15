'use client';

import {
  faFloppyDisk,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';
import ImageModal from './ImageModal';

export const categories = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'Q42024', label: 'Q4/2024' },
  { value: '2025', label: '2025' },
];

const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === 'new' ? false : true;
  const router = useRouter();
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleImageClick = (screenshot) => {
    if (EDITMODE) {
      setSelectedImage(screenshot);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== 'screenshots') {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append existing screenshots as JSON string
    formDataToSend.append('screenshots', JSON.stringify(formData.screenshots));

    // Append new files
    files.forEach((file, index) => {
      formDataToSend.append(`file${index}`, file);
    });

    const url = EDITMODE ? `/api/Tickets/${ticket._id}` : '/api/Tickets';
    const method = EDITMODE ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        body: formDataToSend,
      });

      if (!res.ok) {
        throw new Error(`Failed to ${EDITMODE ? 'update' : 'create'} Ticket.`);
      }

      router.refresh();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const startingTicketData = {
    title: '',
    description: '',
    priority: 1,
    progress: 0,
    status: 'not started',
    category: 'backlog',
    screenshots: [],
  };

  if (EDITMODE) {
    startingTicketData['title'] = ticket.title;
    startingTicketData['description'] = ticket.description;
    startingTicketData['priority'] = ticket.priority;
    startingTicketData['progress'] = ticket.progress;
    startingTicketData['status'] = ticket.status;
    startingTicketData['category'] = ticket.category;
    startingTicketData['type'] = ticket.type;
    startingTicketData.screenshots = ticket.screenshots || [];
  }

  const types = [
    { value: 'bug', label: 'Bug' },
    { value: 'improvement', label: 'Improvement' },
    { value: 'feature', label: 'Feature' },
  ];

  const [formData, setFormData] = useState(startingTicketData);
  const [files, setFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? 'Edit Your Ticket' : 'Create Your Ticket'}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required={true}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required={true}
          rows="5"
        />

        <label>Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required={true}
          disabled={!EDITMODE}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <label>Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required={true}
        >
          {types.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <label>Priority</label>
        <div>
          {[1, 2, 3, 4].map((priority) => (
            <React.Fragment key={priority}>
              <input
                id={`priority-${priority}`}
                name="priority"
                type="radio"
                value={priority}
                onChange={handleChange}
                checked={formData.priority == priority}
              />
              <label htmlFor={`priority-${priority}`}>
                {priority === 1 && 'Must have'}
                {priority === 2 && 'Should have'}
                {priority === 3 && 'Could have'}
                {priority === 4 && 'Will not have'}
              </label>
            </React.Fragment>
          ))}
        </div>
        <label>Progress</label>
        <input
          id="progress"
          name="progress"
          type="range"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <div>
          <label htmlFor="file-upload" className="btn">
            <FontAwesomeIcon icon={faPaperclip} className="icon-btn" />
            Attach Screenshots
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
          <span>{files.length} new file(s) selected</span>
        </div>

        {formData.screenshots && formData.screenshots.length > 0 && (
          <div>
            <h4>Existing Screenshots:</h4>
            <div className="flex flex-wrap">
              {formData.screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="m-2 cursor-pointer"
                  onClick={() => handleImageClick(screenshot)}
                >
                  <img
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-cover hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={!EDITMODE}
        >
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        <button type="submit" className="btn max-w-xs">
          {EDITMODE ? (
            <>
              <FontAwesomeIcon icon={faFloppyDisk} className="icon-btn" />
              <span>Save Changes</span>
            </>
          ) : (
            'Create Ticket'
          )}
        </button>
      </form>
      {selectedImage && (
        <ImageModal
          src={selectedImage}
          alt="Selected Screenshot"
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default TicketForm;
