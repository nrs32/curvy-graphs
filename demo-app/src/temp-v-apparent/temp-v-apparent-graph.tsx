import { CurvyGraph, type LabeledXPoint } from "curvy-graphs"
import { generateLabeledYPoints } from "curvy-graphs/parts";
import { getMinMaxTemps, tempVApparentData } from "./temp-v-apparent-data";
import { getTemperatureLabel } from "../temp-v-humidity/temp-v-humidity-utils";

export const TempVApparentGraph = () => {
  const minMaxTemps = getMinMaxTemps();
  const yRange: [number, number] = [minMaxTemps[0] - 4, minMaxTemps[1]];

  const xPoints: LabeledXPoint[] = tempVApparentData.map((data, i) => ({ x: i, xLabel: data.time }));
  const yRangeLabels = generateLabeledYPoints(yRange, 11, getTemperatureLabel);

  return <CurvyGraph 
      chartTitle='Actual And Apparent Temperature' 
      width={613}
      height={300}
      textColor='#000000'
      animate={true}
      yAxis={{
        labeledPoints: yRangeLabels,
        labelFrequency: 2,
      }}
      dataSets={[
        {
          dataId: "actual-temperature",
          graphStyle: 'line',
          label: "Actual Temperature",
          labelColor: '#2e96b3',
          gradientColorStops: ['#2e96b3', '#2e96b3'],
          gradientDirection: 'v',
          yRange: yRange,
          animationDelay: 1.5,
          data: tempVApparentData.map((data, i) => ({ x: i, y: data.temperature})),
          styles: {
            pathStyle: {
              strokeWidth: 2,
            }
          }
        },
        {
          dataId: "apparent-temperatures",
          graphStyle: 'area',
          label: "Apparent (Feels Like)",
          labelColor: '#de2938',
          gradientColorStops: ['#de2938', '#fc922d'],
          gradientDirection: 'h',
          yRange: yRange,
          animationDelay: 0,
          data:  tempVApparentData.map((data, i) => ({ x: i, y: data.apparentTemperature}))
        },
      ]}
      xAxis={{
        labeledPoints: xPoints,
        labelFrequency: 3,
      }}
      styles={{
        axes: {
          secondaryTickColor: "#dedbdb",
        }
      }}/>
}