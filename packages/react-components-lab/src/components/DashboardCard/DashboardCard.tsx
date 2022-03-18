import React, { FC, useState, Suspense } from 'react';
import { Box, Typography, Tooltip, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import { Props } from './types';

export const useStyles = makeStyles(() => ({
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

const DashboardCard: FC<Props> = ({
  title,
  description,
  disabled,
  children,
  style,
  isLoading,
  actions,
}) => {
  const classes = useStyles();

  return (
    <Suspense fallback={<CircularProgress />}>
      <Box
        className={classes.cardWrapper}
        style={{
          ...style,
          transition: 'all .5s ease',
          overflow: !disabled ? 'auto' : 'hidden',
        }}
        data-cy="dashboard-card"
      >
        {disabled && <Box className={classes.overlay} />}
        <Box
          className={classes.cardHeader}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Box mr={2}>
            <Typography
              variant="subtitle1"
              color="primary"
              className={classes.title}
            >
              {title}
            </Typography>
            <Typography variant="body2" style={{ color: '#86A2B3' }}>
              {description}
            </Typography>
          </Box>
          <Box ml={2} display="flex" alignItems="center">
            {actions}
          </Box>
        </Box>
        {isLoading ? (
          <Box height="80%">
            <CircularProgress />
          </Box>
        ) : (
          <Box p={1}>{children}</Box>
        )}
      </Box>
    </Suspense>
  );
};

export default DashboardCard;
