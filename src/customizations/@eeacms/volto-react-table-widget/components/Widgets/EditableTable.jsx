import { Pagination, Table, Ref } from 'semantic-ui-react';
import { usePagination, useTable } from 'react-table';
import { Icon } from '@plone/volto/components';
import React from 'react';
import { compose } from 'redux';
import deleteSVG from '@plone/volto/icons/delete.svg';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import paginationLeftSVG from '@plone/volto/icons/left-key.svg';
import paginationRightSVG from '@plone/volto/icons/right-key.svg';
import plusSVG from '@plone/volto/icons/circle-plus.svg';
import dragSVG from '@plone/volto/icons/drag.svg';
import { EditableCell } from '@eeacms/volto-react-table-widget/components/Widgets/EditableCell';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const defaultColumn = {
  Cell: EditableCell,
};

function EditableTable(props) {
  const {
    columns,
    data,
    updateCell,
    removeRow,
    addRowAfter,
    reorderRow,
    selectedRow,
    setSelectedRow,
    schema,
    reactSelect,
  } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      updateCell,
      selectedRow,
      setSelectedRow,
      schema,
      reactSelect,
    },
    usePagination,
  );
  if (data.length === 0) {
    addRowAfter({ key: 'Enter' }, 0, pageIndex, pageSize);
  }
  React.useEffect(() => {
    gotoPage(pageIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleDragEnd = (result) => {
    console.log('in handleDragEnd');
    if (!result.destination || !reorderRow) {
      return;
    }

    const { source, destination } = result;

    if (source.index !== destination.index) {
      reorderRow(source.index, destination.index, pageIndex, pageSize);
    }
  };
  // Render the UI for your table
  return (
    <>
      <Table celled {...getTableProps()}>
        <Table.Header>
          {headerGroups.map((headerGroup, key) => (
            <Table.Row key={key} {...headerGroup.getHeaderGroupProps()}>
              <Table.HeaderCell width={1}></Table.HeaderCell>
              {headerGroup.headers.map((column) => (
                <Table.HeaderCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </Table.HeaderCell>
              ))}
              <Table.HeaderCell>{'Actions'}</Table.HeaderCell>
            </Table.Row>
          ))}
        </Table.Header>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="table-body">
            {(provided) => (
              <Ref innerRef={provided.innerRef}>
                <Table.Body
                  {...getTableBodyProps()}
                  {...provided.droppableProps}
                >
                  {page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <Draggable
                        key={
                          row.original['@id'] ||
                          `row-${pageIndex * pageSize + i}`
                        }
                        draggableId={
                          row.original['@id'] ||
                          `row-${pageIndex * pageSize + i}`
                        }
                        index={i}
                      >
                        {(provided, snapshot) => (
                          <Ref innerRef={provided.innerRef}>
                            <Table.Row
                              className={`
                              ${
                                selectedRow === pageIndex * pageSize + i
                                  ? 'selected-row'
                                  : ''
                              }
                              ${snapshot.isDragging ? 'dragging' : ''}
                            `}
                              {...row.getRowProps()}
                              {...provided.draggableProps}
                            >
                              <Table.Cell {...provided.dragHandleProps}>
                                <Icon name={dragSVG} size="18px" />
                              </Table.Cell>
                              {row.cells.map((cell) => {
                                return (
                                  <Table.Cell {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                  </Table.Cell>
                                );
                              })}
                              <Table.Cell>
                                <div className={'row-actions'}>
                                  <span
                                    onClick={(e) => {
                                      addRowAfter(e, i, pageIndex, pageSize);
                                    }}
                                    onKeyDown={(e) => {
                                      addRowAfter(e, i, pageIndex, pageSize);
                                    }}
                                    tabIndex={0}
                                    role="button"
                                    className="row-action"
                                  >
                                    <Icon name={plusSVG} size="23px" />
                                  </span>
                                  <span
                                    onClick={(e) =>
                                      removeRow(e, i, pageIndex, pageSize)
                                    }
                                    onKeyDown={(e) =>
                                      removeRow(e, i, pageIndex, pageSize)
                                    }
                                    tabIndex={0}
                                    role="button"
                                    className="row-action"
                                  >
                                    <Icon
                                      name={deleteSVG}
                                      size="23px"
                                      color="red"
                                    />
                                  </span>
                                </div>
                              </Table.Cell>
                            </Table.Row>
                          </Ref>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </Table.Body>
              </Ref>
            )}
          </Droppable>
        </DragDropContext>
      </Table>
      <div className="pagination-wrapper react-table-pagination">
        <Pagination
          activePage={pageIndex + 1}
          totalPages={pageCount}
          onPageChange={(e, { activePage }) => {
            gotoPage(activePage - 1);
          }}
          firstItem={null}
          lastItem={null}
          prevItem={{
            content: <Icon name={paginationLeftSVG} size="18px" />,
            icon: true,
            'aria-disabled': pageIndex + 1 === 1,
            className: pageIndex + 1 === 1 ? 'disabled' : null,
          }}
          nextItem={{
            content: <Icon name={paginationRightSVG} size="18px" />,
            icon: true,
            'aria-disabled': pageIndex + 1 === pageCount,
            className: pageIndex + 1 === pageCount ? 'disabled' : null,
          }}
        ></Pagination>
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select
          style={{ maxWidth: '7rem' }}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default compose(injectLazyLibs(['reactSelect']))(EditableTable);
