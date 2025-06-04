export interface ChartTitleProps {
  title: string;
  graphWidth: number;
  dataLeft: number;
  styles?: React.CSSProperties;
}

const ChartTitle = ({ title, graphWidth, dataLeft, styles }: ChartTitleProps) => {
  return (<div
    style={{
      fontWeight: 700,
      fontSize: '22px',
      textAlign: 'center',
      position: 'absolute',
      top: '0',
      width: `${graphWidth}px`,
      left: `${dataLeft}px`,
      ...styles,
    }}
  >
    {title}
  </div>)
}

export default ChartTitle;