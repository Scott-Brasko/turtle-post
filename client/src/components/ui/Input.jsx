import PropTypes from 'prop-types';

const Input = (props) => {
  return (
    <>
      <label>
        {props.displayText} <input className={props.className} onChange={props.onChange} onKeyUp={props.onKeyUp}/>
      </label>
    </>
  );
};

Input.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  displayText: PropTypes.string,
  onKeyUp: PropTypes.func
};

export default Input;
