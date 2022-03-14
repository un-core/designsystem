import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import useSettings from '../../hooks/useSettings';
import { ArrowRightGlyph, CalendarAltRegularGlyph } from '@un/icons-react';
//import styles from './dateRangePicker.module.scss';

export function DateRangePickerInput({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  const { prefix } = useSettings();
  return (
    <div className={`${prefix}--date-ranger-picker`}>
      <div className={`${prefix}--date-ranger-picker__input`}>
        <DatePicker
          selected={startDate}
          className={`${prefix}--input`}
          onChange={setStartDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          wrapperClassName={`${prefix}--date-picker__wrapper`}
        />
        <CalendarAltRegularGlyph
          className={`${prefix}--date-ranger-picker__icon`}
        />
      </div>
      <ArrowRightGlyph className={`${prefix}--date-ranger-picker__arrow`} />
      <div className={`${prefix}--date-ranger-picker__input`}>
        <DatePicker
          selected={endDate}
          className={`${prefix}--input`}
          onChange={setEndDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          wrapperClassName={`${prefix}--date-picker__wrapper`}
        />
        <CalendarAltRegularGlyph
          className={`${prefix}--date-ranger-picker__icon`}
        />
      </div>
    </div>
  );
}