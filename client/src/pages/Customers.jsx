import { useContext } from 'react';
import { AuthContext } from '../authContext';
import useFetch from '../useFetch';
import Navbar from '../components/Navbar';
import '../styles/customers.css';
import CustCard from './CustCard';

const Customers = ({ type }) => {
  const { user } = useContext(AuthContext);

  const { data } = useFetch(`/customers/${user._id}`);

  const { customers } = data;

  return (
    <div>
      <Navbar />
      <div className="cust-container">
        {customers?.length > 0 ? (
          customers?.map((item, index) => (
            <CustCard key={index} props={{ ...item, type }} />
          ))
        ) : (
          <p>No customers Yet</p>
        )}
      </div>
    </div>
  );
};

export default Customers;
