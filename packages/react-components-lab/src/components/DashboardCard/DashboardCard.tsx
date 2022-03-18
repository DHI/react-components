import React, { FC, Suspense } from 'react';
import { Box, Typography, CircularProgress } from '@material-ui/core';
import { DashboardCardProps } from './types';
import useStyles from './styles';

const DashboardCard: FC<DashboardCardProps> = ({
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
