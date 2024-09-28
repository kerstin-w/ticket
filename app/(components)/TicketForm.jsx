'use client';

import {
  faFloppyDisk,
  faPaperclip,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import ImageModal from './ImageModal';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { categories } from '../(constants)/categories';
import { types } from '../(constants)/types';
import { priorityOptions } from '../(constants)/priorityOptions';
import { statusOptions } from '../(constants)/status';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === 'new' ? false : true;
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 1,
    progress: 0,
    status: 'not started',
    category: 'backlog',
    screenshots: [],
    type: 'bug',
    hours: 0,
    actualCosts: 0,
    estimatedCosts: 0,
  });

  useEffect(() => {
    if (EDITMODE) {
      setFormData({
        title: ticket.title || '',
        description: ticket.description || '',
        priority: ticket.priority || 1,
        progress: ticket.progress || 0,
        status: ticket.status || 'not started',
        category: ticket.category || 'backlog',
        screenshots: ticket.screenshots || [],
        type: ticket.type || 'bug',
        hours: ticket.hours || 0,
        actualCosts: ticket.actualCosts || 0,
        estimatedCosts: ticket.estimatedCosts || 0,
      });
      setDescription(ticket.description || '');
    }
  }, [EDITMODE, ticket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newState = { ...prevState, [name]: value };
      if (name === 'hours') {
        newState.estimatedCosts = calculateEstimatedCosts(Number(value));
      }
      return newState;
    });
  };

  const calculateEstimatedCosts = (hours) => {
    return Math.round((hours * 1.3) / 140);
  };

  const handleDescriptionChange = (content) => {
    setDescription(content);
    setFormData((prevState) => ({ ...prevState, description: content }));
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
    setIsLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== 'screenshots') {
        formDataToSend.append(
          key,
          key === 'description' ? description : formData[key]
        );
      }
    });

    formDataToSend.append('screenshots', JSON.stringify(formData.screenshots));

    files.forEach((file, index) => {
      formDataToSend.append(`file${index}`, file);
    });

    // Ensure estimatedCosts is included
    formDataToSend.append('estimatedCosts', formData.estimatedCosts);

    formDataToSend.append('screenshots', JSON.stringify(formData.screenshots));

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
        const errorData = await res.json();
        throw new Error(
          errorData.message ||
            `Failed to ${EDITMODE ? 'update' : 'create'} Ticket.`
        );
      }
      router.refresh();
      router.push('/');
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
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
    type: 'bug',
    hours: 0,
    costs: 0,
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
    startingTicketData['hours'] = ticket.hours;
    startingTicketData['costs'] = ticket.costs;
  }

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
        {error && <div className="text-red-500">{error}</div>}
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
        <ReactQuill
          theme="snow"
          value={description}
          onChange={handleDescriptionChange}
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['clean'],
            ],
          }}
        />

        {/* Category and Type row */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="category" className="block mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required={true}
              disabled={!EDITMODE}
              className="w-full p-2 border rounded"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="type" className="block mb-1">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required={true}
              className="w-full p-2 border rounded"
            >
              {types.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label>Priority</label>
        <div>
          {priorityOptions.map((priority) => (
            <React.Fragment key={priority.value}>
              <input
                id={`priority-${priority.value}`}
                name="priority"
                type="radio"
                value={priority.value}
                onChange={handleChange}
                checked={formData.priority == priority.value}
              />
              <label htmlFor={`priority-${priority.value}`}>
                {priority.label}
              </label>
            </React.Fragment>
          ))}
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <label>Hours</label>
            <input
              id="hours"
              name="hours"
              type="number"
              value={formData.hours}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label>Estimated Costs</label>
            <input
              id="estimatedCosts"
              name="estimatedCosts"
              type="number"
              value={formData.estimatedCosts}
              readOnly
            />
          </div>

          {EDITMODE && formData.status === 'started' && (
            <div className="flex-1">
              <label>Actual Costs</label>
              <input
                id="actualCosts"
                name="actualCosts"
                type="number"
                value={formData.actualCosts}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
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
          {statusOptions.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        <button type="submit" className="btn max-w-xs" disabled={isLoading}>
          {isLoading ? (
            <>
              <FontAwesomeIcon
                icon={faSpinner}
                className="icon-btn animate-spin"
              />
              <span>{EDITMODE ? 'Saving...' : 'Creating...'}</span>
            </>
          ) : EDITMODE ? (
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
