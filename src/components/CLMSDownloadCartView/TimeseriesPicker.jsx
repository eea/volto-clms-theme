import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Grid, Popup } from 'semantic-ui-react';
import calendarSVG from '@plone/volto/icons/calendar.svg';
import { Icon } from '@plone/volto/components';

import { cclDateFormat } from '@eeacms/volto-clms-theme/components/CclUtils';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';

export const TimeseriesPicker = (props) => {
  const { start, end, item, setTimeseriesValue } = props;
  const [startValue, setStartValue] = useState(
    item?.TemporalFilter?.StartDate
      ? new Date(cclDateFormat(item.TemporalFilter.StartDate))
      : null,
  );
  const [endValue, setEndValue] = useState(
    item?.TemporalFilter?.EndDate
      ? new Date(cclDateFormat(item.TemporalFilter.EndDate))
      : null,
  );
  const [isOpen, setIsOpen] = useState(false);
  const daysrestriction = item.name.includes('10-daily')
    ? 'month'
    : item.name.includes('daily')
    ? 'week'
    : 'year';

  const monthDiff = (d1, d2) => {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  };

  const isLeptYear = (year) => {
    return year % 400 === 0 ? true : year % 100 === 0 ? false : year % 4 === 0;
  };

  const validDaysDifference = (value) => {
    const periocity = item.name.includes('10-daily')
      ? 1
      : item.name.includes('daily')
      ? 7
      : 1;
    let validValue = false;
    const diffTime = Math.abs(
      new Date(value['EndDate']) - new Date(value['StartDate']),
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = monthDiff(
      new Date(value['StartDate']),
      new Date(value['EndDate']),
    );
    const diffYears =
      new Date(value['EndDate']).getFullYear() -
      new Date(value['StartDate']).getFullYear();
    if (daysrestriction === 'week' && diffDays < periocity) {
      validValue = true;
    } else if (daysrestriction === 'month' && diffMonths <= periocity) {
      const startDate = new Date(value['StartDate']);
      const startDateMonth = startDate.getMonth();
      if (
        (startDateMonth === 3 ||
          startDateMonth === 5 ||
          startDateMonth === 8 ||
          startDateMonth === 10) &&
        diffDays <= 30
      )
        validValue = true;
      else if (
        startDateMonth === 1 &&
        isLeptYear(startDate.getFullYear()) &&
        diffDays <= 29
      )
        validValue = true;
      else if (startDateMonth === 1 && diffDays <= 28) validValue = true;
      else if (
        startDateMonth !== 1 &&
        startDateMonth !== 3 &&
        startDateMonth !== 5 &&
        startDateMonth !== 8 &&
        startDateMonth !== 10 &&
        diffDays <= 31
      )
        validValue = true;
    } else if (daysrestriction === 'year' && diffYears <= periocity) {
      const startDate = new Date(value['StartDate']);
      if (
        isLeptYear(startDate.getFullYear()) &&
        startDate.getMonth() < 2 &&
        diffDays <= 366
      )
        validValue = true;
      else if (diffDays <= 365) validValue = true;
    }
    return validValue;
  };

  return (
    <>
      <Popup
        on="click"
        pinned
        trigger={
          <span
            className="info-icon"
            style={{ margin: 0 }}
            tooltip="Select temporal interval to download"
            direction="up"
          >
            <button
              style={{
                backgroundColor: 'transparent',
                color: 'inherit',
                border: 'none',
                padding: 0,
                font: 'inherit',
                cursor: 'pointer',
                outline: 'inherit',
              }}
            >
              <Icon name={calendarSVG} size={25} />
              <br />
              <span>
                {item.TemporalFilter
                  ? `${cclDateFormat(
                      item.TemporalFilter.StartDate,
                    )}-${cclDateFormat(item.TemporalFilter.EndDate)}`
                  : 'Select dates'}
              </span>
            </button>
          </span>
        }
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(!isOpen)}
      >
        <Grid.Column className="datetime-picker">
          <Grid.Row>
            <DatePicker
              id="start_date"
              inline
              selectsRange
              className="datepicker"
              minDate={new Date(start)}
              maxDate={new Date(end)}
              startDate={startValue}
              endDate={endValue}
              // selectsStart
              onChange={(e) => {
                setStartValue(e[0]);
                setEndValue(e[1]);
              }}
              dateFormat="dd.MM.yyyy"
              calendarStartDay={1}
              popperPlacement="top"
              dropdownMode="select"
              showMonthDropdown
              showYearDropdown
            >
              {(startValue || endValue) && (
                <span>
                  {cclDateFormat(startValue)} -{' '}
                  {endValue && cclDateFormat(endValue)}
                </span>
              )}
              <br />
              Click the start and end dates, and then apply.
              {(!startValue ||
                !endValue ||
                !validDaysDifference({
                  StartDate: startValue,
                  EndDate: endValue,
                })) && (
                <span> Allowed time range of 1 {daysrestriction}. </span>
              )}
              <CclButton
                isButton={true}
                mode={'filled'}
                disabled={
                  startValue?.getTime() > endValue?.getTime() ||
                  !startValue ||
                  !endValue ||
                  !validDaysDifference({
                    StartDate: startValue,
                    EndDate: endValue,
                  })
                }
                onClick={() => {
                  setTimeseriesValue(item.unique_id, {
                    StartDate: startValue,
                    EndDate: endValue,
                  });
                  setIsOpen(false);
                }}
              >
                Apply
              </CclButton>
            </DatePicker>
          </Grid.Row>
          {/* <Grid.Row>
            <label htmlFor="start_date">From</label>
            <DatePicker
              id="start_date"
              className="datepicker"
              minDate={new Date(cclDateFormat(start))}
              maxDate={
                endValue ? new Date(endValue) : new Date(cclDateFormat(end))
              }
              startDate={startValue}
              endDate={endValue}
              selected={startValue}
              selectsStart
              onChange={(e) => setStartValue(e)}
              // includeDates={this.TimesliderWidget.stops.dates}
              dateFormat="dd.MM.yyyy"
              calendarStartDay={1}
              showMonthDropdown
              showYearDropdown
              popperPlacement="top"
              dropdownMode="select"
            />
          </Grid.Row> */}
          {/*
          <Grid.Row>
            <label htmlFor="end_date">To</label>
            <DatePicker
              id="end_date"
              className="datepicker"
              minDate={
                startValue
                  ? new Date(startValue)
                  : new Date(cclDateFormat(start))
              }
              maxDate={new Date(cclDateFormat(end))}
              startDate={startValue}
              endDate={endValue}
              selected={endValue}
              selectsEnd
              onChange={(e) => setEndValue(e)}
              // includeDates={this.TimesliderWidget.stops.dates}
              dateFormat="dd.MM.yyyy"
              calendarStartDay={1}
              showMonthDropdown
              showYearDropdown
              popperPlacement="top"
              dropdownMode="select"
            />
          </Grid.Row> */}
          <Grid.Row>
            <CclButton
              isButton={true}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </CclButton>
          </Grid.Row>
        </Grid.Column>
      </Popup>
    </>
  );
};
