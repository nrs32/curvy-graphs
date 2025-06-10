import { ChartTitle, CurvyGraphAnimator, CurvyGraphPart, XAxis, YAxis, RightDataLabel } from "curvy-graphs/parts";

export const BasicPartsGraph = () => {
  const themePrimary = '#E0E1E2';
  const width = 500;
  const height = 250;
  const yAxisWidth = 55;
  const data = [
    { x: 0, y: 12 },
    { x: 1, y: 15 },
    { x: 2, y: 18 },
    { x: 3, y: 20 },
    { x: 4, y: 17 },
    { x: 5, y: 14 },
    { x: 6, y: 13 },
  ];

  return (
    <div style={{ position: 'relative', width: width, height: height}}>
      <ChartTitle
        title="Weekly Temperatures"
        color={themePrimary}
        widthToCenterOn={width - yAxisWidth}
        leftOffset={yAxisWidth}
      />
      <YAxis
        style={{ position: 'absolute', top: 50 - 1, left: 0 }}
        labeledYPoints={[
          { y: 0, yLabel: '0°F' },
          { y: 10, yLabel: '10°F' },
          { y: 20, yLabel: '20°F' },
          { y: 30, yLabel: '30°F' },
        ]}
        spaceBelowData={0}
        getLabel={undefined}
        graphWidth={width - yAxisWidth}
        height={height - 50}
        primaryTickColor={themePrimary}
        secondaryTickColor="#E0E1E240"
        labelColor={themePrimary}
        labelFrequency={1}
        showGuideLines={true}
      />
      <CurvyGraphAnimator
        id="temperatures-parts"
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
              id="temperatures-parts"
              animationRefs={refs}
              style={{ position: 'absolute', top: 50, left: yAxisWidth }}
              width={width - yAxisWidth}
              height={height - 50}
              spaceBelowData={0}
              data={data}
              yRange={undefined}
              xRange={undefined}
              gradientColorStops={['#2FF3E0', '#5D6CE9']}
              gradientDirection="v"
              type="line"
              isSharp={false}
            />
            <RightDataLabel
              style={{ position: 'absolute', top: 50 - 18, left: width + 7 }}
              height={height - 50}
              spaceBelowData={0}
              data={data}
              label={"Temperature"}
              labelColor={'#5D6CE9'}
              yRange={undefined}
            />
          </>
        )}
      </CurvyGraphAnimator>
      <XAxis
        style={{ position: 'absolute', top: height - 50 + 50 + 7, left: yAxisWidth }}
        width={width - yAxisWidth}
        data={[
          { x: 0, xLabel: 'Mon' },
          { x: 1, xLabel: 'Tue' },
          { x: 2, xLabel: 'Wed' },
          { x: 3, xLabel: 'Thu' },
          { x: 4, xLabel: 'Fri' },
          { x: 5, xLabel: 'Sat' },
          { x: 6, xLabel: 'Sun' },
        ]}
        labelFrequency={1}
        primaryTickColor={themePrimary}
        secondaryTickColor="#E0E1E240"
        labelColor={themePrimary}
      />
    </div>
  );
}