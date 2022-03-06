import { getFormatConversionTable, getProjections } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import { useTable, usePagination } from 'react-table';
import { useCSVReader, useCSVDownloader } from 'react-papaparse';
import { Toast } from '@plone/volto/components';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

const ItemSchema = (format_choices, projection_choices) => ({
  title: 'Downloadable File',
  properties: {
    area: {
      title: 'Area',
      description: 'Enter the area of this file.',
      type: 'string',
    },
    year: {
      title: 'Year',
      description: 'Enter the year of this file.',
      type: 'number',
    },
    resolution: {
      title: 'Resolution',
      description: 'Enter the resolution of this file. Ex.: 100m',
      type: 'string',
    },
    type: {
      title: 'Type',
      description: 'Enter the file type of this file. Ex.: Raster or Vector',
      choices: [
        ['Raster', 'Raster'],
        ['Vector', 'Vector'],
      ],
      // type: 'string',
      // controlled vocabulary: 'raster' or 'vector'
    },
    format: {
      title: 'Format',
      description: 'Enter the format of this file.',
      choices: format_choices,
    },
    projection: {
      title: 'Projection',
      description: 'Enter the projection of this file.',
      choices: projection_choices,
    },
    version: {
      title: 'Version',
      description: 'Enter the version of this file.',
      type: 'string',
    },
    size: {
      title: 'Size',
      description: 'Enter the size of this file. Ex.: 3.5 GB',
      type: 'string',
    },
    source: {
      title: 'Source',
      description: 'Enter the source of this file.',
      type: 'string',
      // controlled vocabulary: values to be provided by the user
    },
    path: {
      title: 'Path',
      description: 'Enter the absolute path of this file in the storage',
      type: 'string',
    },
  },
  fieldsets: [
    {
      id: 'default',
      title: 'File',
      fields: [
        'area',
        'year',
        'resolution',
        'type',
        'format',
        'projection',
        'version',
        'size',
        'source',
        'path',
      ],
    },
  ],
  required: [],
});

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

const defaultColumn = {
  Cell: EditableCell,
};

// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    usePagination,
  );

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

const DownloadableFilesDataTableWidget = (props) => {
  // format_conversion_table_in_progress
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getFormatConversionTable());
    dispatch(getProjections());
  }, [dispatch]);
  const format_conversion_table_in_progress = useSelector(
    (state) => state.downloadtool.format_conversion_table_in_progress,
  );
  const projections_in_progress = useSelector(
    (state) => state.downloadtool.projections_in_progress,
  );
  let format_choices = Object.keys(
    format_conversion_table_in_progress,
  ).map((key) => [key, key]);
  let projection_choices = [];
  if (projections_in_progress.length > 0) {
    projection_choices = projections_in_progress.map((key) => [key, key]);
  }

  // Set our editable cell renderer as the default Cell renderer
  const columns = React.useMemo(
    () => [
      {
        Header: 'Downloadable files',
        columns: [
          {
            Header: 'Area',
            accessor: 'area',
          },
          {
            Header: 'Year',
            accessor: 'year',
          },
          {
            Header: 'Resolution',
            accessor: 'resolution',
          },
          {
            Header: 'Type',
            accessor: 'type',
          },
          {
            Header: 'Format',
            accessor: 'format',
          },
          {
            Header: 'Projection',
            accessor: 'projection',
          },
          {
            Header: 'Version',
            accessor: 'version',
          },
          {
            Header: 'Size',
            accessor: 'size',
          },
          {
            Header: 'Path',
            accessor: 'path',
          },
        ],
      },
    ],
    [],
  );

  const [data, setData] = React.useState(() => props.value.items);
  const [originalData] = React.useState(data);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      }),
    );

    // My data modification code
    props.value.items = props.value.items.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...props.value.items[rowIndex],
          [columnId]: value,
        };
      }
      return row;
    });
  };

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData);

  const csvcolumns = columns[0].columns.map((d) => {
    return {
      label: d.accessor,
      key: d.accessor,
    };
  });

  csvcolumns.push({
    label: '@id',
    key: '@id',
  });

  const { CSVReader } = useCSVReader();
  const { CSVDownloader, Type } = useCSVDownloader();
  return (
    <>
      <button onClick={resetData}>Reset Data</button>
      <CSVDownloader
        type={Type.Button}
        filename={'prepackaged-files.csv'}
        config={{
          delimiter: ';',
          quoteChar: '"',
        }}
        data={data}
      >
        Download as CSV file
      </CSVDownloader>

      <CSVReader
        onUploadAccepted={(results) => {
          let newdatacount = 0;

          let newdata = results.data.map((item) => {
            if (!item['@id']) {
              newdatacount += 1;
              return {
                ...item,
                '@id': uuid(),
              };
            }
            return item;
          });

          let modified = newdata.length - newdatacount;

          setData(newdata);
          props.value.items = newdata;
          toast.success(
            <Toast
              success
              autoClose={5000}
              content={
                'CSV file imported correctly. ' +
                newdatacount +
                ' new items added. ' +
                modified +
                ' items edited.'
              }
            />,
          );
        }}
        config={{ header: true }}
      >
        {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
          <>
            <div>
              <button type="button" {...getRootProps()}>
                Browse file
              </button>
              <div>{acceptedFile && acceptedFile.name}</div>
              <button {...getRemoveFileProps()}>Remove</button>
            </div>
            <ProgressBar />
          </>
        )}
      </CSVReader>

      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </>
  );
};

export default DownloadableFilesDataTableWidget;
