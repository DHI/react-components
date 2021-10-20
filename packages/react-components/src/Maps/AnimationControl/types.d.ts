
export type AnimationControlProps = {
  // Status of whether the component is currently playing or not
  playing: boolean,
  // Element is enabled if this is set to true. Disabled if set to false.
  enabled: boolean,
  // Loops the animation when reaching the last timestep.
  loop: boolean;
  // Returns current datetime out of all the time steps.
  onDateTimeChange: (date: string) => void,
  // Orientation of control.
  horizontal: boolean,
  // Hide controls.
  hideControls: boolean,

  // Required proptype by ESLint for React Material Library
  // classes: shape({}),

  // Datetime postfix appended to date to indicate the timezone
  dateTimePostfix?: string,
  // Rate of change of selected value on slider when the animation is playing
  framesPerSecond: number,
  // Datetimes available for stepping to in animation control.
  dateTimes: string[],
  // Time offset for data from UTC in hours
  timezoneOffsetData: number,
  // Time offset from UTC in hours
  timezoneOffsetDisplay: number,
  // Datetime display format. Default: 'YYYY/MM/DD HH:mm:ss'.
  dateTimeDisplayFormat: string,
};

export interface AnimationPlaybackControlsProps {
  isPlaying: boolean;
  onSkipToStart: () => void;
  onSkipToEnd: () => void;
  onStepBackward: () => void;
  onStepForward: () => void;
  onPlay: () => void;
  onPause: () => void;
}


export interface AnimationTimelineProps {
  timestepIndex: number;
  maxTimestepIndex: number;
  timestepLabel: string;
  onTimestepIndexChange: (newTimestepIndex: number) => void;
  isHorizontal: boolean;
}
