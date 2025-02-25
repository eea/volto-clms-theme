import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Grid, Popup } from 'semantic-ui-react';
import calendarSVG from '@plone/volto/icons/calendar.svg';
import { Icon } from '@plone/volto/components';

import { cclDateFormat } from '@eeacms/volto-clms-theme/components/CclUtils';
import CclButton from '@eeacms/volto-clms-theme/components/CclButton/CclButton';

export const TimeseriesPicker = (props) => {
  const {
    start,
    end,
    item,
    download_limit_temporal_extent,
    setTimeseriesValue,
    data_arrays,
  } = props;
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
  const [datesApplied, setDatesApplied] = useState(false);

  const isValidDateRange = ({ start, end, limit }) => {
    /* Calculate if the difference in days is smaller than the allowed limit */
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((start - end) / oneDay));
    return diffDays <= limit;
  };
  const dates_array = data_arrays?.map((e) => new Date(e));
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
                {item.TemporalFilter && datesApplied
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
              selectsRange={download_limit_temporal_extent < 360 ? true : false}
              className="datepicker"
              minDate={new Date(start)}
              maxDate={new Date(end)}
              startDate={item?.TemporalFilter?.StartDate}
              endDate={item?.TemporalFilter?.EndDate}
              // selectsStart
              onChange={(e) => {
                if (download_limit_temporal_extent < 360) {
                  if (download_limit_temporal_extent > 180 && e[1]) {
                    e[1].setMonth(e[1].getMonth() + 1);
                    e[1].setDate(e[1].getDate() - 1);
                  }
                  item.TemporalFilter = {
                    StartDate: e[0],
                    EndDate: e[1],
                  };
                  setStartValue(e[0]);
                  setEndValue(e[1]);
                } else {
                  let e2 = new Date(e);
                  e2.setDate(e2.getDate() + 364);
                  item.TemporalFilter = {
                    StartDate: e,
                    EndDate: e2,
                  };
                  setStartValue(e);
                  setEndValue(e2);
                }
                setDatesApplied(false);
              }}
              dateFormat="dd.MM.yyyy"
              showMonthYearPicker={
                download_limit_temporal_extent > 180 &&
                download_limit_temporal_extent < 360
                  ? true
                  : false
              }
              showYearPicker={
                download_limit_temporal_extent >= 360 ? true : false
              }
              calendarStartDay={1}
              popperPlacement="top"
              dropdownMode="select"
              showMonthDropdown
              showYearDropdown
              includeDates={
                download_limit_temporal_extent < 180 ? dates_array : null
              }
              disabledKeyboardNavigation
            >
              {(item?.TemporalFilter?.StartDate ||
                item?.TemporalFilter?.EndDate) && (
                <span>
                  {cclDateFormat(item?.TemporalFilter?.StartDate)} -{' '}
                  {item?.TemporalFilter?.EndDate &&
                    cclDateFormat(item?.TemporalFilter?.EndDate)}
                </span>
              )}
              <br />
              {download_limit_temporal_extent < 180 && (
                <span>Click the start and end dates, and then apply.</span>
              )}
              {download_limit_temporal_extent > 180 &&
                download_limit_temporal_extent < 360 && (
                  <span>Click the start and end months, and then apply.</span>
                )}
              {download_limit_temporal_extent > 360 && (
                <span>Click the year, and then apply.</span>
              )}
              {(!startValue ||
                !endValue ||
                !isValidDateRange({
                  start: startValue,
                  end: endValue,
                  limit: download_limit_temporal_extent,
                })) &&
                download_limit_temporal_extent < 180 && (
                  <span>
                    {' '}
                    Allowed time range of {
                      download_limit_temporal_extent
                    } days.{' '}
                  </span>
                )}
              {(!startValue ||
                !endValue ||
                !isValidDateRange({
                  start: startValue,
                  end: endValue,
                  limit: download_limit_temporal_extent,
                })) &&
                download_limit_temporal_extent > 180 &&
                download_limit_temporal_extent < 360 && (
                  <span> Allowed time range of 6 months. </span>
                )}
              {(!startValue ||
                !endValue ||
                !isValidDateRange({
                  start: startValue,
                  end: endValue,
                  limit: download_limit_temporal_extent,
                })) &&
                download_limit_temporal_extent > 360 && (
                  <span> Allowed time range of 1 year. </span>
                )}
              <CclButton
                isButton={true}
                mode={'filled'}
                disabled={
                  startValue?.getTime() > endValue?.getTime() ||
                  !startValue ||
                  !endValue ||
                  !isValidDateRange({
                    start: startValue,
                    end: endValue,
                    limit: download_limit_temporal_extent,
                  })
                }
                onClick={() => {
                  setTimeseriesValue(item.unique_id, {
                    StartDate: startValue,
                    EndDate: endValue,
                  });
                  setDatesApplied(true);
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
