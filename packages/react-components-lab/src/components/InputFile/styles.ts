const styles = {
  dropzone: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `2px dashed`,
    position: 'relative',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
  dropzoneActive: {
    backgroundColor: 'grey.100',
    borderColor: 'success.light',
    border: `4px dashed`,
  },
  dropzoneInactive: {
    backgroundColor: 'grey.50',
    borderColor: 'grey.700',
  },
  disabled: {
    cursor: 'no-drop',
    noDrop: 'no-drop',
    backgroundColor: 'grey.100',
    opacity: 0.7,
  },
};

export default styles;
