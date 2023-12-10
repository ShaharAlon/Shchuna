import React, { useReducer, useEffect} from 'react';
import { validate } from '../../util/validators';
import DateTimePicker from 'react-datetime-picker';
import './Input.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      }
    }
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };
  const changeDateHandler = date => {
    inputState.value=date;
    inputState.isValid=true;
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  let element;
  if(props.element === 'input'){
    element=
    <input
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={inputState.value}
    />
  }
  if(props.element === 'textarea'){
    element=
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
  };
  if(props.element === 'dropbox'){
    element=
      <select id ={props.id} onChange={changeHandler} onBlur={touchHandler} value={inputState.value}>
      <option value="">Select...</option>
      {props.options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
      </select>
  };
  if(props.element === 'datetime'){
    return(
      <React.Fragment>
        <div className={`form-control ${!inputState.isValid && inputState.isTouched &&'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
          </div>
        <DateTimePicker className={'my-datetime'} onChange={changeDateHandler} onBlur={touchHandler} value={inputState.value} minDate={new Date()} />
        <div className={`form-control ${!inputState.isValid && inputState.isTouched &&'form-control--invalid'}`}>
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
      </React.Fragment>
    );
  };


  return (
    <div className={`form-control ${!inputState.isValid && inputState.isTouched &&'form-control--invalid'}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
