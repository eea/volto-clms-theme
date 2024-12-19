import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchContent } from '@plone/volto/actions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FormFieldWrapper, Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import dragSVG from '@plone/volto/icons/drag.svg';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const DocumentItem = React.memo(({ item, provided }) => (
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    className="document-item"
    role="listitem"
    aria-label={`Draggable item: ${item.title}`}
  >
    <div style={{ display: 'inline-block' }}>
      <Button icon basic aria-label="Drag handle">
        <Icon
          name={dragSVG}
          size="20px"
          color="#878f93"
          className="content drag handle"
        />
      </Button>
    </div>
    <div>{item.title}</div>
  </div>
));

const OrderDocumentsWidget = (props) => {
  const { id, formData, onChange, value } = props;
  const UID = formData?.UID;
  const location = useLocation();
  const dispatch = useDispatch();
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  const [documentsList, setDocumentsList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchDocuments = useCallback(() => {
    if (UID) {
      const sort_on = ['documentation_sorting', 'sortable_title'];
      const sort_order = ['ascending', 'ascending'];

      setIsLoading(true);
      dispatch(
        searchContent(
          'en/technical-library',
          {
            portal_type: 'TechnicalLibrary',
            path: 'en/technical-library',
            associated_datasets: UID,
            sort_on: sort_on,
            sort_order: sort_order,
            b_size: 99999,
          },
          id,
        ),
      ).finally(() => setIsLoading(false));
    }
  }, [id, UID, dispatch]);

  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;

      const reorderedList = reorder(
        documentsList,
        result.source.index,
        result.destination.index,
      );

      onChange(id, { items: reorderedList });
      setDocumentsList(reorderedList);
    },
    [documentsList, onChange, id],
  );

  const memoizedList = useMemo(
    () => (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="documents">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="documents-list"
              role="list"
              aria-label="Draggable documents list"
            >
              {documentsList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <DocumentItem item={item} provided={provided} />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    ),
    [documentsList, handleDragEnd],
  );

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments, location]);

  useEffect(() => {
    if (searchSubrequests?.[id]?.items) {
      const libraries = searchSubrequests[id].items;
      const receivedDocumentsList = libraries.map((item) => ({
        id: item['@id'],
        title: item.title,
      }));

      if (value?.items?.length < receivedDocumentsList.length) {
        const newItems = receivedDocumentsList.filter(
          (item) => !value.items.some((item2) => item2.id === item.id),
        );
        setDocumentsList([...value.items, ...newItems]);
      } else {
        setDocumentsList(value.items);
      }
    }
  }, [searchSubrequests, id, value]);

  return (
    <FormFieldWrapper
      {...props}
      draggable={true}
      className="drag-drop-list-widget"
    >
      <div className="order-documents-area">
        <div className="documents-list-header">
          <div>Technical Document Title</div>
        </div>
        {isLoading ? (
          <div className="loading-documents">Loading documents...</div>
        ) : (
          memoizedList
        )}
      </div>
    </FormFieldWrapper>
  );
};

OrderDocumentsWidget.propTypes = {
  id: PropTypes.string.isRequired,
  formData: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
      }),
    ),
  }),
};

export default React.memo(OrderDocumentsWidget);
