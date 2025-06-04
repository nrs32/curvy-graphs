export interface ChartTitleProps {
  title: string;
  color: string;
  widthToCenterOn: number;
  leftOffset: number;
  styles?: React.CSSProperties;
}

/**
 * ChartTitle is a React component that renders a centered, styled title for a chart.
 * When used in CurvyChart, the title is centered over data of the chart (part without y-axis or right data labels)s.
 *
 * Props:
 * - title: The text to display as the chart title.
 * - widthToCenterOn: The width (in pixels) used to center the title.
 * - leftOffset: The left offset (in pixels) for positioning the title.
 * - styles: Optional additional CSS styles to apply to the title. 
 *           This will also override the default styles (including the default width and left values controlled by props).
 */
const ChartTitle = ({ title, color, widthToCenterOn, leftOffset, styles }: ChartTitleProps) => {
  return (<div
    style={{
      fontWeight: 700,
      fontSize: '22px',
      textAlign: 'center',
      position: 'absolute',
      color: color,
      top: '0',
      width: `${widthToCenterOn}px`,
      left: `${leftOffset}px`,
      ...styles,
    }}
  >
    {title}
  </div>)
}

export default ChartTitle;