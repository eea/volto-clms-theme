import React, { useEffect, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchContent } from '@plone/volto/actions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Icon } from '@plone/volto/components';
import FormFieldWrapper from '@eeacms/volto-clms-theme/components/CLMSFormFieldWrapper/CLMSFormFieldWrapper';
import { Button } from 'semantic-ui-react';
import dragSVG from '@plone/volto/icons/drag.svg';
import isEqual from 'lodash/isEqual';

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
  const contentType = formData?.['@type'] || undefined;
  const location = useLocation();
  const dispatch = useDispatch();
  const searchSubrequests = useSelector((state) => state.search.subrequests);
  const [documentsList, setDocumentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const fetchDocuments = useCallback(() => {
    const sort_on = ['documentation_sorting', 'sortable_title'];
    const sort_order = ['ascending', 'ascending'];

    if (UID) {
      setIsLoading(true);
      const searchParams = {
        portal_type: 'TechnicalLibrary',
        path: 'en/technical-library',
        metadata_fields: '_all',
        sort_on: sort_on,
        sort_order: sort_order,
        b_size: 99999,
      };

      if (contentType === 'DataSet') {
        searchParams.associated_datasets = UID;
      } else if (contentType === 'Product') {
        searchParams.associated_products = UID;
      }

      dispatch(
        searchContent('en/technical-library', searchParams, id),
      ).finally(() => setIsLoading(false));
    }
  }, [id, UID, contentType, dispatch]);

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

  const memoizedList = useMemo(() => {
    return (
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
    );
  }, [documentsList, handleDragEnd]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments, location]);

  useEffect(() => {
    if (searchSubrequests?.[id]?.items && !isLoading) {
      const libraries = searchSubrequests[id].items;
      const receivedDocumentsList = libraries.map((item) => ({
        UID: item.UID,
        id: item['@id'],
        title: item.title,
      }));

      const oldItems = value?.items || [];

      // First‐run: none of the stored items have a UID yet
      const firstRun =
        oldItems.length > 0 && oldItems.every((item) => !item.UID);

      // rebuild in the exact old order, matching by UID if we have it,
      // or (only on first run) fall back to id/title
      const mergedExisting = [];

      oldItems.forEach((old) => {
        let match;

        if (old.UID) {
          match = receivedDocumentsList.find(
            (newItem) => newItem.UID === old.UID,
          );
          if (match) {
            mergedExisting.push({ ...old, ...match });
          }
        } else {
          match = receivedDocumentsList.find(
            (newItem) => newItem.id === old.id || newItem.title === old.title,
          );
          if (match) {
            mergedExisting.push({ ...old, ...match, UID: match.UID });
          }
          // if it's the first run and if both id+title changed, we drop the old item
          // and let the fetched version be treated as “new” below
        }
      });

      // add any new items that are not already in the mergedExisting
      const existingUIDs = new Set(mergedExisting.map((item) => item.UID));
      const newOnes = receivedDocumentsList.filter(
        (newItem) => !existingUIDs.has(newItem.UID),
      );
      const merged = [...mergedExisting, ...newOnes];

      setDocumentsList(merged);

      // const hasChanged =
      //   firstRun || JSON.stringify(merged) !== JSON.stringify(oldItems);
      const hasChanged = firstRun || !isEqual(merged, oldItems);
      if (hasChanged) {
        onChange(id, { items: merged });
      }
    }
  }, [searchSubrequests, id, value, onChange, isLoading]);

  return (
    <FormFieldWrapper
      {...props}
      draggable={true}
      className="drag-drop-list-widget"
    >
      {contentType === 'Product' && (
        <Button
          basic
          size="small"
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
          aria-label="Toggle document list visibility"
          className="order-docs-button"
        >
          {isVisible ? 'Hide' : 'Show'}
        </Button>
      )}
      <div className="order-documents-area">
        <div className="documents-list-header">
          <div>Technical Document Title</div>
        </div>
        {isLoading ? (
          <div className="loading-documents">Loading documents...</div>
        ) : (
          (contentType === 'DataSet' || isVisible) && memoizedList
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
        UID: PropTypes.string,
        id: PropTypes.string,
        title: PropTypes.string,
      }),
    ),
  }),
};

export default React.memo(OrderDocumentsWidget);
