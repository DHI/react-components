import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  cardHeader: {
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #DBE4E9',
    padding: '2px 12px',
    position: 'sticky',
    display: 'flex',
    top: 0,
    zIndex: 1,
  },
  cardWrapper: {
    flexGrow: 1,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.16)',
    backgroundColor: '#FFFFFF',
    border: '1px solid #DBE4E9',
    borderRadius: 4,
    height: '100%',
    position: 'relative',
  },
  cardWrapperAbsolute: {
    flexGrow: 1,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.16)',
    backgroundColor: '#FFFFFF',
    border: '1px solid #DBE4E9',
    borderRadius: 4,
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 20,
    top: 0,
    left: 0,
  },
  cardContent: {
    width: '100%',
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(11, 69, 102, .5)',
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  ratioButton: {
    height: 24,
    width: 'auto',
    cursor: 'pointer',
  },
  title: {
    fontWeight: 600,
  },
}));
