
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