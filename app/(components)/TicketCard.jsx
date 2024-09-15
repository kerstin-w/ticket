import Link from 'next/link';
import DeleteBlock from './DeleteBlock';
import PriorityDisplay from './PriorityDisplay';
import ProgressDisplay from './ProgressDisplay';
import StatusDisplay from './StatusDisplay';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DOMPurify from 'dompurify';

const TicketCard = ({ ticket }) => {
  const formatTimeStamp = (timestamp) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    const date = new Date(timestamp);
    const formetedDate = date.toLocaleDateString('de-AT', options);

    return formetedDate;
  };

  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3 ">
        <PriorityDisplay priority={ticket.priority} />
        <div className="ml-auto">
          <DeleteBlock id={ticket._id} />
        </div>
      </div>
      <Link href={`/TicketPage/${ticket._id}`} style={{ display: 'contents' }}>
        <h4>{ticket.title}</h4>
        <hr className="h-px border-0 bg-page mb-2" />
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(ticket.description),
          }}
        />
        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs my-1">{formatTimeStamp(ticket.createdAt)}</p>
            <ProgressDisplay progress={ticket.progress} />
          </div>
          <div className="ml-auto flex items-end">
            <StatusDisplay status={ticket.status} />
          </div>
          {ticket.screenshots && ticket.screenshots.length > 0 && (
            <div className="attachment-indicator ml-3">
              <FontAwesomeIcon icon={faPaperclip} />
              <span>{ticket.screenshots.length}</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;
