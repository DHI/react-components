interface ColourScaleProps {
  type?: 'intensity';
  mode?: 'blocks' | 'gradient';
  intervals?: number[];
  height?: number;
  markers?: boolean;
  borderColour?: string;
}

export { ColourScaleProps };
