import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Grid, Modal, Segment, Select, Popup } from 'semantic-ui-react';
import calendarSVG from '@plone/volto/icons/calendar.svg';
import { Icon } from '@plone/volto/components';

import { cclDateFormat } from '@eeacms/volto-clms-theme/components/CclUtils';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';

export const TimeseriesPicker = (props) => {
  const { start, end, item, setTimeseriesValue } = props;
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  console.log('startValue', startValue);
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
        onOpen={() => setIsOpen(!isOpen)}
      >
        <Grid.Column className="datetime-picker">
          <Grid.Row>
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
          </Grid.Row>
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
          </Grid.Row>
          <Grid.Row>
            <CclButton
              isButton={true}
              mode={'filled'}
              onClick={() => {
                setTimeseriesValue(item.unique_id, {
                  StartDate: startValue,
                  EndDate: endValue,
                });
                setIsOpen(false);
              }}
            >
              apply
            </CclButton>
            <CclButton
              isButton={true}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              cancel
            </CclButton>
          </Grid.Row>
        </Grid.Column>
      </Popup>
    </>
  );
};
