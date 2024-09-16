import Link from 'next/link';
import {
  faHome,
  faTicket,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { categories } from '../(constants)/categories';
import { getAvailableYears } from '../utils/categoryUtils';

const Nav = () => {
  const availableYears = getAvailableYears(categories);

  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/TicketPage/new">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
        {availableYears.map((year) => (
          <Link key={year} href={`/YearPage/${year}`}>
            <FontAwesomeIcon icon={faCalendar} className="icon" />
            <span className="ml-1">{year}</span>
          </Link>
        ))}
      </div>
      <div>
        <p className="text-default-text">kerstin@gmail.com</p>
      </div>
    </nav>
  );
};

export default Nav;
