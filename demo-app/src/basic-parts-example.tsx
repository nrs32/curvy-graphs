import { ChartTitle, CurvyGraphAnimator, CurvyGraphPart, XAxis, YAxis, RightDataLabel, TooltipsLayer } from 'curvy-graphs/parts';

export const BasicPartsGraph = () => {
  const themePrimary = '#E0E1E2';
  const width = 500;
  const height = 250;
  const dataTop = 50; // Top offset of data below title
  const yAxisWidth = 55;
  const graphId: string = 'temperature-parts';

  const data = [
    { x: 0, y: 0 },
    { x: 1, y: 10 },
    { x: 2, y: 21 },
    { x: 3, y: 28 },
    { x: 4, y: 18 },
    { x: 5, y: 7 },
    { x: 6, y: 4 },
  ];

  const xLabels = [
    { x: 0, xLabel: 'Mon' },
    { x: 1, xLabel: 'Tue' },
    { x: 2, xLabel: 'Wed' },
    { x: 3, xLabel: 'Thu' },
    { x: 4, xLabel: 'Fri' },
    { x: 5, xLabel: 'Sat' },
    { x: 6, xLabel: 'Sun' },
  ];

  return (
    <div style={{ position: 'relative', width: width, height: height}}>
      <ChartTitle
        title='Weekly Temperatures'
        color={themePrimary}
        widthToCenterOn={width - yAxisWidth}
        leftOffset={yAxisWidth}
      />
      <YAxis
        style={{ position: 'absolute', top: dataTop - 1, left: 0 }}
        labeledYPoints={[
          { y: 0, yLabel: '0°F' },
          { y: 10, yLabel: '10°F' },
          { y: 20, yLabel: '20°F' },
          { y: 30, yLabel: '30°F' },
        ]}
        spaceBelowData={0}
        getLabel={undefined}
        graphWidth={width - yAxisWidth}
        height={height - dataTop}
        primaryTickColor={themePrimary}
        secondaryTickColor='#E0E1E240'
        labelColor={themePrimary}
        labelFrequency={1}
        showGuideLines={true}
      />
      <CurvyGraphAnimator
        id={graphId}
        animate={true}
        width={width}
        delay={0}
        data={data}
      >
        {(refs: {
              clipPathRect: React.Ref<SVGRectElement>;
              svgRoot: React.Ref<SVGSVGElement>;
          }) => (
          <>
            <CurvyGraphPart
              id={graphId}
              animationRefs={refs}
              style={{ position: 'absolute', top: dataTop, left: yAxisWidth }}
              width={width - yAxisWidth}
              height={height - dataTop}
              spaceBelowData={0}
              data={data}
              yRange={[0, 30]}
              xRange={undefined}
              gradientColorStops={['#2FF3E0', '#5D6CE9']}
              gradientDirection='v'
              type='line'
              isSharp={false}
            />
            <RightDataLabel
              style={{ position: 'absolute', top: dataTop - 18, left: width + 7 }}
              height={height - 50}
              spaceBelowData={0}
              data={data}
              label={'Temperature'}
              labelColor={'#5D6CE9'}
              yRange={[0, 30]}
            />
          </>
        )}
      </CurvyGraphAnimator>

      <TooltipsLayer
        width={width - yAxisWidth}
        height={height - dataTop}
        dataTop={dataTop}
        dataLeft={yAxisWidth}
        spaceBelowData={0}
        dataSets={[{
          id: graphId,
          label: 'Temperature',
          data: data,
          yRange: [0, 30],
          tooltipConfig: {
            getXLabel: (xCoor) => xLabels.find(({ x }) => x === xCoor)!.xLabel,
            getYLabel: (yCoor) => `${yCoor}°F`,
            xAlias: 'Day',
            yAlias: 'Temp',
          }
        }]}
        textColor={themePrimary}
      />
      
      <XAxis
        style={{ position: 'absolute', top: height + 7, left: yAxisWidth }}
        width={width - yAxisWidth}
        data={xLabels}
        labelFrequency={1}
        primaryTickColor={themePrimary}
        secondaryTickColor='#E0E1E240'
        labelColor={themePrimary}
      />
    </div>
  );
}