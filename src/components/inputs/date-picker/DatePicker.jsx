import React, { useState, useRef } from 'react';
import { SingleDatePicker } from 'react-dates';
import classes from './DatePicker.module.scss';
import { useOnClickOutside } from '../../../hooks';

const DatePicker = ({ onChange, name, label, ...props }) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState();
  const inputRef = useRef(null);
  useOnClickOutside(inputRef, () => setCalendarOpen(false));

  const handleDateChange = date => {
    setDate(date);
    onChange && onChange({ name, value: date });
  };

  return (
    <div className={classes.container}>
      <label htmlFor="datePicker">{label}</label>
      <div ref={inputRef}>
        <SingleDatePicker
          readOnly
          date={date}
          noBorder
          onDateChange={handleDateChange}
          focused={calendarOpen}
          onFocusChange={({ focused }) => setCalendarOpen(focused)}
          id="datePicker"
          {...props}
        />
      </div>
    </div>
  );
};

export default DatePicker;
