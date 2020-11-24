import {
  Plugin, Template, TemplateConnector, TemplatePlaceholder
} from '@devexpress/dx-react-core';
import React from 'react';


const PopupEditing = React.memo(({ popupComponent: Popup, title, allUsers, metadata, onSave }: any) => (
  <Plugin>
    <Template name="popupEditing">
      <TemplateConnector>
        {(
          {
            rows,
            getRowId,
            addedRows,
            editingRowIds,
            createRowChange,
            rowChanges,
          },
          {
            changeRow, changeAddedRow, commitChangedRows, commitAddedRows,
            stopEditRows, cancelAddedRows, cancelChangedRows,
          },
        ) => {
          const isNew = addedRows.length > 0;
          let editedRow;
          let rowId;
          if (isNew) {
            rowId = 0;
            editedRow = addedRows[rowId];
          } else {
            [rowId] = editingRowIds;
            const targetRow = rows.filter(row => getRowId(row) === rowId)[0];
            editedRow = { ...targetRow, ...rowChanges[rowId] };
          }

          const processValueChange = ({ target: { name, value } }) => {
            const changeArgs = {
              rowId,
              change: createRowChange(editedRow, value, name),
            };
            if (isNew) {
              changeAddedRow(changeArgs);
            } else {
              changeRow(changeArgs);
            }
          };

          const processListChange = (name, values, isMetadata = false) => {
            let changeData = {};

            if (isMetadata) {
              changeData = {
                ...editedRow,
                metadata: {
                  ...editedRow.metadata,
                  [name]: values
                }
              }
            } else {
              changeData = {
                ...editedRow,
                [name]: values
              }
            }

            const changeArgs = {
              rowId,
              change: changeData
            }

            if (isNew) {
              changeAddedRow(changeArgs);
            } else {
              changeRow(changeArgs);
            }
          };

          const processMetadataChange = ({ target: { name, value, checked } }) => {
            let newValue;
            if (value) {
              newValue = value;
            } else {
              newValue = checked;
            }

            const changeArgs = {
              rowId,
              change: {
                metadata: {
                  ...editedRow.metadata,
                  [name]: newValue
                }
              },
            };

            if (isNew) {
              changeAddedRow(changeArgs);
            } else {
              changeRow(changeArgs);
            }
          };

          const rowIds = isNew ? [0] : editingRowIds;
          const applyChanges = () => {
            if (isNew) {
              commitAddedRows({ rowIds });
              onSave(editedRow, isNew)
            } else {
              stopEditRows({ rowIds });
              commitChangedRows({ rowIds });
              onSave(editedRow);
            }
          };
          const cancelChanges = () => {
            if (isNew) {
              cancelAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              cancelChangedRows({ rowIds });
            }
          };

          const open = editingRowIds.length > 0 || isNew;
          return (
            <Popup
              open={open}
              row={editedRow}
              onChange={processValueChange}
              onListChange={processListChange}
              onMetadataChange={processMetadataChange}
              onApplyChanges={applyChanges}
              onCancelChanges={cancelChanges}
              isNew={isNew}
              title={title}
              users={allUsers}
              metadata={metadata}
            />
          );
        }}
      </TemplateConnector>
    </Template>
    <Template name="root">
      <TemplatePlaceholder />
      <TemplatePlaceholder name="popupEditing" />
    </Template>
  </Plugin>
));


export default PopupEditing;