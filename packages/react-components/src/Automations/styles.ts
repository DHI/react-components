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
  triggrerListWrapper: {
    overflow: 'hidden'
  },
  paperListWrapper: {
    borderRadius: '10px',
    border: '1px solid rgba(217, 217, 217, 1)',
    boxShadow: '0 2px 4px rgba(217, 217, 217, 1)',
    marginTop: '10px',
  },
  triggerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: '10px',
    borderTopLeftRadius: '10px',
    borderBottom: '1px solid rgba(217, 217, 217, 1)',
    padding: '10px',
    background: 'rgba(248, 248, 248, 1)',
  },
  contentTextWrapper: {
    background: 'rgba(248, 248, 248, 1)',
    overflowX: 'auto',
    overflowY: 'hidden',
    borderTop: '2px solid rgba(217, 217, 217, 1)',
    borderBottom: '2px solid rgba(217, 217, 217, 1)'
  },
  contentBoxWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    border: '1px solid rgba(217, 217, 217, 1)',
    borderBottom: 'none',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  conditionalBox: {
    padding: '10px',
    border: '1px solid rgba(217, 217, 217, 1)',
    borderTop: 'none',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    minHeight: '20px',
    marginBottom: '10px'
  },
  greenBackground: {
    background: 'green',
  },
  redBackground: {
    background: 'red',
  },
  boxPopover: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px'
  },
  typography: {
    fontSize: '12px',
    lineHeight: '2'
  },
  whiteTypography: {
    color: 'white',
    fontSize: '12px'
  },
  disabledTypography: {
    color: 'grey',
    fontSize: '12px'
  },
  paperStyle: {
    padding: '10px'
  },
  dialogContentPaper: {
    padding: '15px'
  },
  dialogTitle: {
    padding: '5px 10px'
  },
  boxStyle: {
    marginBottom: '15px'
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center'
  },
  flexBoxColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  greenText: {
    color: 'green',
    marginRight: '5px',
  },
  whiteText: {
    color: 'white'
  },
  redText: {
    color: 'red',
    marginRight: '5px',
  },
  iconRadio: {
    marginRight: '5px'
  },
  iconClose: {
    position: 'absolute',
    right: '5px',
    top: '5px'
  },
})

export const CustomField = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
  },
  dateTime: {
    margin: theme.spacing(1)
  }
}));

export const FormAutomationStyles = makeStyles((theme) => ({
  buttonParam: {
    marginBottom: '5px',
  },
  form: {
    width: '100%',
    border: 'none',
    '& > div > fieldset': {
      border: '1px solid lightgrey',
      borderRadius: '10px',
    },
    '& > div > button': {
      display: 'none'
    }
  },
  boxParameter: {
    marginTop: '20px'
  },
  helperText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    margin: 0,
    background: 'white'
  },
  boxParameterDisabled: {
    border: '1px solid lightgrey',
    padding: '5px',
    borderRadius: '10px',
    marginTop: '20px',
    background: 'lightgrey',
    opacity: '80%'
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
  boxTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  boxIconWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  boxTab :{
    marginBottom: '10px'
  },
  dialogContent: {
    overflow: 'hidden', 
    height: '100%'
  },
  boxAccordion: {
    border: '1px solid lightgrey',
    padding: '15px',
    borderRadius: '10px'
  },
  typographyAccordion: {
    marginRight: '10px',
    width: '10%'
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
  },
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

export const CellStyles = makeStyles({
  tooltip: {
    backgroundColor: 'rgba(249, 249, 249, 1)',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: 'none',
    maxWidth: 'none',
    border: '1px solid gray',
    padding: '10px'
  },
  wrapperTooltip: {
    display: 'flex',
    alignItems: 'center'
  },
  conditionalElipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  titleTooltip: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    background: 'white',
    width: '100%',
    fontSize: '14px'
  },
  titleColoringTooltip: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  }
});