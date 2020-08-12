interface LayerControlProps {
  /**
   * Name displayed next to the checkbox
   */
  name: string;
  /**
   * The gradient to show.
   */
  legendGradient: LegendGradientItem[];
  /**
   * LegendValuePostFix is the postfix appended to all values of the legend
   */
  legendValuePostFix?: string;
  /**
   * If legendHeight is specified, then scrollbars will be added when the colors exceed the height
   */
  legendHeight?: number;
  /**
   * Sets whether the control is enabled or not.
   */
  enabled?: boolean;
  /**
   * Initial checked status
   */
  checked?: boolean;
  /**
   * Indicated if the layer is selected or unselected
   */
  onCheck: (checked: boolean) => void;
  /**
   * The initial opacity
   */
  opacity?: number;
  /**
   * Event handler indicating the opacity when changed
   */
  onOpacityChange?: (opacity: number) => void;
  /**
   * Controls visibility of the opacity control for the layer.
   */
  showOpacityControl?: boolean;
  /**
   * The color of the checkbox. Defaults to primary
   */
  color: 'primary' | 'secondary' | 'default';
}

interface LegendGradientItem {
  /**
   * The value shown next to the color
   */
  value: string;
  /**
   * A color to show next to the value
   */
  color?: string;
  /**
   * An icon shown next to the value
   */
  icon?: string;
}

export { LayerControlProps };
