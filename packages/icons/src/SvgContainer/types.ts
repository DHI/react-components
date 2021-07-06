export interface SvgContainerProps extends SvgContainerStyleProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface SvgContainerStyleProps {
  width?: number;
  height?: number;
}
