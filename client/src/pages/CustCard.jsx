import '../styles/custCard.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const CustCard = ({ props }) => {
  const handleClick = async () => {
    try {
      await axios.delete(`/customers/${props._id}`, { withCredentials: true });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'not started':
        return 'grey';
      case 'ongoing':
        return 'orange';
      case 'completed':
        return 'green';
      default:
        return 'purple';
    }
  };

  return (
    <div className="cust-card">
      <div className="details">
        <div className="cust-name">
          <h1>{props.name}</h1>
          <div
            className="status"
            style={{ backgroundColor: getStatusColor(props.status) }}
          >
            {props.status}
          </div>
        </div>
        <div className="cust-details">
          <div>
            <b>Service: </b>
            {props.service}
          </div>
          <div>
            <b>Email: </b>
            {props.email}
          </div>
          <div>
            <b>Phone Number: </b>
            {props.phone}
          </div>
        </div>
      </div>
      <div className="icon">
        <FontAwesomeIcon icon={faTrash} onClick={handleClick} />
      </div>
    </div>
  );
};

export default CustCard;
