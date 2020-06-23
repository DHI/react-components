import React, { FC } from 'react';
import { GeneralDialog } from '../GeneralDialog/GeneralDialog';
import IScenarioDialogProps from './types';

const ScenarioDialog: FC<IScenarioDialogProps> = (
  props: IScenarioDialogProps
) => {
  const { title, message, command, showDialog, closeDialog } = props;
  return (
    <GeneralDialog
      mainSection="scenario"
      title={title}
      message={message}
      command={command}
      showDialog={showDialog}
      closeDialog={closeDialog}
    />
  );
};

export { IScenarioDialogProps, ScenarioDialog };
