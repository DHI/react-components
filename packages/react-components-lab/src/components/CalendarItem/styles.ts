const buttonCSS = {
  borderRadius: 4,
  cursor: 'pointer',
  minWidth: 42,
  margin: 2,
  padding: '0px 7px',
  textAlign: 'center',
  flexGrow: 1,
  flex: 'none',
  backgroundColor: { xs: 'mediumGrey.light' },
  color: { xs: 'primary.main' },
  '&:hover': {
    backgroundColor: { xs: 'mediumGrey.main' },
  },
};

const activeCSS = {
  backgroundColor: { xs: 'secondary.main' },
  color: { xs: 'background.paper' },
  '&:hover': {
    backgroundColor: { xs: 'secondary.main' },
  },
};

const disabledCSS = {
  cursor: 'default',
  backgroundColor: { xs: 'lightGrey.main' },
  color: { xs: 'mediumGrey.dark' },
  '&:hover': {
    backgroundColor: { xs: 'lightGrey.main' },
    color: { xs: 'mediumGrey.dark' },
  },
};

const semiActiveCSS = {
  backgroundColor: { xs: 'mediumGrey.main' },
};

export { buttonCSS, activeCSS, disabledCSS, semiActiveCSS };
