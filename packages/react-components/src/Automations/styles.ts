import { makeStyles } from '@material-ui/core/styles';

export const AutomationsListStyles = makeStyles({
  paperStyle: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  }
});

export const DetailAutomationStyle = makeStyles({
  triggerListContainer: {
    maxHeight: '300px',
    overflowY: 'auto'
  },
  triggerBox: {
    position: 'relative',
    border: '1px solid lightgray',
    borderRadius: '10px',
    padding: '10px',
    marginBottom: '10px'
  },
  iconButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    zIndex: 1,
    padding: 0,
  },
  typography: {
    lineHeight: '2'
  },
  paperStyle: {
    padding: '10px'
  },
  dialogContentPaper: {
    padding: '15px'
  },
  boxStyle: {
    marginBottom: '15px'
  }
});


export const FormAutomationStyles = makeStyles((theme) => ({
  boxParameter: {
    border: '1px solid lightgrey',
    padding: '15px',
    borderRadius: '10px',
    marginTop: '20px'
  },
  typographyScheduledTrigger: {
    marginBottom: '20px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paperStyle: {
    padding: '10px'
  },
  dialogTitle: {
    padding: '5px'
  },
  boxDialog: {
    padding: '15px 0'
  },
  accordion: {
    marginTop: '25px'
  },
  boxAccordion: {
    border: '1px solid lightgrey',
    padding: '15px',
    borderRadius: '10px'
  },
  typographyAccordion: {
    marginRight: '10px', width: '10%'
  },
  select: {
    '& .MuiOutlinedInput-input': {
      paddingTop: '10px',
      paddingBottom: '10px',
      fontSize: '0.875rem',
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 12px) scale(1)',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.23)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.23)',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
    },
  },
  gridAddButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px'
  },
  addButton: {
    marginLeft: 'auto'
  }
}));

export const ToolbarStyles = makeStyles({
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    alignItems: 'center'
  },
  addBox: {
    display: 'flex',
    alignItems: 'center'
  },
  iconButton: {
    padding: 1
  },
  typography: {
    marginLeft: 3
  }
});
