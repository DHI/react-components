import React from 'react';
import GeneralDialog from '../../common/GeneralDialog/GeneralDialog';
import IScenarioDialogProps from './types';

const ScenarioDialog = (props: IScenarioDialogProps) => {
  const { title, message, cancelLabel, confirmLabel, command, showDialog, closeDialog } = props;

  return (
    <GeneralDialog
      mainSection="scenario"
      title={title}
      message={message}
      cancelLabel={cancelLabel}
      confirmLabel={confirmLabel}
      command={command}
      showDialog={showDialog}
      closeDialog={closeDialog}
    />
  );
};

export { IScenarioDialogProps, ScenarioDialog };
