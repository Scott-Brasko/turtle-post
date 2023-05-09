import PropTypes from 'prop-types';

const Button = (props) => {
  
  return (
    <button {...props}/> 
  );
};

// Button.propTypes = {
//   onClick: PropTypes.func,
//   className: PropTypes.string,
//   id: PropTypes.string,
//   buttonText: PropTypes.string
// };

export default Button;