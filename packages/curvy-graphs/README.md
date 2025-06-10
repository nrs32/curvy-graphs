# curvy-graphs

A modern, highly customizable React component library for rendering beautiful, animated, and responsive line and area graphs with smooth curves, gradients, and labeling. 

<a href="https://github.com/nrs32/curvy-graphs/blob/main/demo-app/src/temp-v-humidity/temp-v-humidity-curvy-graph-responsive.tsx" target="_blank">
  <img src="https://raw.githubusercontent.com/nrs32/curvy-graphs/refs/heads/main/packages/curvy-graphs/src/assets/humidityAndTemperature.gif" alt="Humidity And Temperature" />
</a>

**Caret buttons used to change the date in the Humidity And Temperature chart are not part of this graph library.*

---

## Features
- **Multiple Graph Types:** line, dashed-line, area, or hybrid graphs with smooth Bézier curves or linear lines between points.
- **Custom Styling:** Easily customize and override styles for title, axes, labels, and svg paths.
- **Composable API:** Use low-level parts for total control, or high-level components for speed and simplicity.
- **Modern UX:** Animated drawing, gradients with transparency, responsive layout, and TypeScript support.

⚠️ Please note, this package is lightly maintained. PRs and issues are welcome but support may be limited.

---

## Installation

```bash
npm install curvy-graphs
```

---

## Quick Start

### Basic Usage

Below is a basic example of `<CurvyGraph />` using only the required props.

See [API Reference](#api-reference) for full details.

```tsx
import { CurvyGraph } from 'curvy-graphs';

<CurvyGraph
  chartTitle='Weekly Temperatures'
  textColor='#E0E1E2' // For title and axes
  width={613} 
  height={310}
  yAxis={{
    labeledPoints: [
      { y: 0, yLabel: '0°F' },
      { y: 10, yLabel: '10°F' },
      { y: 20, yLabel: '20°F' },
      { y: 30, yLabel: '30°F' },
    ],
  }}
  xAxis={{
    labeledPoints: [
      { x: 0, xLabel: 'Mon' },
      { x: 1, xLabel: 'Tue' },
      { x: 2, xLabel: 'Wed' },
      { x: 3, xLabel: 'Thu' },
      { x: 4, xLabel: 'Fri' },
      { x: 5, xLabel: 'Sat' },
      { x: 6, xLabel: 'Sun' },
    ],
  }}
  dataSets={[
    {
      id: 'temperatures', // Unique id accross all charts and datasets
      graphStyle: 'line',
      label: 'Temperature',
      labelColor: '#5D6CE9',
      gradientColorStops: ['#2FF3E0', '#5D6CE9'],
      gradientDirection: 'v',
      data: [
        { x: 0, y: 12 },
        { x: 1, y: 15 },
        { x: 2, y: 18 },
        { x: 3, y: 20 },
        { x: 4, y: 17 },
        { x: 5, y: 14 },
        { x: 6, y: 13 },
      ]
    }
  ]}
/>
```

The above code will produce this chart:
![Basic Temperatures Graph](https://raw.githubusercontent.com/nrs32/curvy-graphs/refs/heads/main/packages/curvy-graphs/src/assets/basicWeeklyTemperatureExample.png)

To animate the chart, add the `animate` prop to `CurvyGraph`, and optionally add `animationDelay` to your dataset(s).

### Responsive Usage

In the basic usage example, we set the chart’s width and height using pixels. Alternatively, you can use percentages via the `ResponsiveCurvyGraph` component.

The only difference in usage between these two components is how the width and height props are handled. **Instead of numbers (for pixels), you can pass string percentages or other units.** These are converted to pixels and passed to a `CurvyGraph`.

Below, we recreate the basic usage example, but with a width of 100% within a flex layout:

```tsx
import { ResponsiveCurvyGraph } from 'curvy-graphs';

<ResponsiveCurvyGraph
  width='100%'
  height={310}
  // ... rest of props ...
/>
```

<details>
<summary>See full example with surrounding layout</summary>

```tsx
import { ResponsiveCurvyGraph } from 'curvy-graphs';

<div style={{ width: '70%', border: '1px dashed red' }}>
  <ResponsiveCurvyGraph
    width='100%'
    height={310}
    // ... rest of props ...
  />
</div>

<div style={{
  flex: 1,
  padding: '20px',
  border: '1px dashed blue',
  color: 'white',
  alignContent: 'center',
  textAlign: 'center',
}}>
  <p>Other layout content could be here</p>
</div>
```
</details>

The result is this
![Responsive Temperatures Graph](https://raw.githubusercontent.com/nrs32/curvy-graphs/refs/heads/main/packages/curvy-graphs/src/assets/responsiveExample.gif)

We can also add animation like this:
```tsx
import { ResponsiveCurvyGraph } from 'curvy-graphs';

<ResponsiveCurvyGraph
  width={'100%'}
  height={310}
  animate={true}  // <-- set animate true here
  // ... rest of props ...
  dataSets={[
    {
      // ... other props ...
      animationDelay: 0, // Default is 0, but this is where you can set delays
    }
  ]}
/>
```

The result is this
![Animated Responsive Temperatures Graph](https://raw.githubusercontent.com/nrs32/curvy-graphs/refs/heads/main/packages/curvy-graphs/src/assets/responsiveAnimatedExample.gif)

---

## Examples
Below are more example charts created with this library. 

Click on any image to view the source code for that chart (including the first chart at the top of this README). 

For simplicity, the example graphs use hard-coded data.

<table border="0" style="border-collapse: collapse; border: none;">
  <tr style="border: none;">
    <td style="border: none; padding: 0;">
      <a href="https://github.com/nrs32/curvy-graphs/blob/main/demo-app/src/weekly-temps/weekly-temps-graph.tsx" target="_blank">
        <img src="https://raw.githubusercontent.com/nrs32/curvy-graphs/refs/heads/main/packages/curvy-graphs/src/assets/tempTrend.gif" width="100%" alt="Temperature Trend" />
      </a>
    </td>
    <td style="border: none; padding: 0; background: none;">
      <a href="https://github.com/nrs32/curvy-graphs/blob/main/demo-app/src/temp-v-apparent/temp-v-apparent-graph.tsx" target="_blank">
        <img src="https://raw.githubusercontent.com/nrs32/curvy-graphs/refs/heads/main/packages/curvy-graphs/src/assets/actualAndApparentTemperature.png" width="100%" alt="Actual and Apparent Temperature" />
      </a>
    </td>
  </tr>
  <tr style="background: none; border: none;">
    <td style="border: none; padding: 0; background: none;">
      <a href="https://github.com/nrs32/curvy-graphs/blob/main/demo-app/src/precipitation/precipitation-graph.tsx" target="_blank">
        <img src="https://raw.githubusercontent.com/nrs32/curvy-graphs/refs/heads/main/packages/curvy-graphs/src/assets/precipitation.png" width="100%" alt="Precipitation" />
      </a>
    </td>
    <td style="border: none; padding: 0;">
      <a href="https://github.com/nrs32/curvy-graphs/blob/main/demo-app/src/water-level-ludington/water-level-graph.tsx" target="_blank">
        <img src="https://raw.githubusercontent.com/nrs32/curvy-graphs/refs/heads/main/packages/curvy-graphs/src/assets/waterLevels.png" width="100%" alt="Water Levels" />
      </a>
    </td>
  </tr>
</table>

---

# API Reference

## `<CurvyGraph />` Props

- **chartTitle**: `string` — Title text for the chart.
- **textColor**: `string` — Hex color for title and axis labels.
- **width, height**: `number` — Dimensions of the chart in pixels. Use `ResponsiveCurvyGraph` for more options.
- **spaceBelowData**: `number` (optional) — Adds extra visual padding (in pixels) beneath the lowest data point. 

  > Note: If you use this, you **must** also provide `getExtendedYLabel` in `yAxis`. This will affect Y-axis tick mark logic and label frequency. 
  
  <details>
  <summary>More context and use cases</summary>

  This is useful for dynamic y-axis ranges when you want to avoid data touching the x-axis and are working with multiple datasets of different units. e.g. if you are visualizing temperature and humidity on the same chart and want both datasets to have a consistent visual gap below their lowest points, `spaceBelowData` ensures that. 
  
  > The [first graph](#curvy-graphs) in this README uses `spaceBelowData`. You can click on the graph to view its source code.

  When you use `spaceBelowData`, the y-axis will determine an extended y-axis minimum value based on the gap you want (px) and your lowest y-value in the dataset. Since this creates new y-axis values, `getExtendedYLabel` is required to generate labels for those extended points.

  You can also use this if you want a fixed number of pixels between your lowest data point and the x-axis.

  **Tip**: If your datasets share the same y-axis unit, you can simply pad the yRange that you use for your datasets and y-axis. e.g. if you are visualizing temperatures and your lowest value is 15, you can set the min in your yRange to 10. This achieves the same effect and avoids the need for `spaceBelowData`.
  </details>

  Default is `0` (no padding).

- **animate**: `boolean` (optional) — Animate the chart on data or layout changes. Default is `false`.
- **isSharp**: `boolean` (optional) — If true, renders sharp/linear lines between points. Default is false (curvy).

- **yAxis**: `{ ... }` — Y-axis configuration:
  - **labeledPoints**: `LabeledYPoint[]` — Array of `{ y, yLabel }` for axis labels and ticks. See [`generateLabeledYPoints`](#generatelabeledypoints-helper-method) for a helper method that can generate your LabeledYPoints!
  - **getExtendedYLabel**: `(y: number) => string` (optional) callback to label extended Y-axis space (used when `spaceBelowData` > 0). Defaults to empty labels.
  - **labelFrequency**: `number` (optional) — Show a label on every nth tick mark. Default is 1.
  - **showGuidelines**: `boolean` (optional) - If true, horizontal guidelines will display behind the chart for each primary (labeled) tick. Default is true.

- **dataSets**: `DataSet[]` — Array of datasets to plot. Each dataset:
  - **id**: `string` — Unique key accross all charts (no spaces).
  - **graphStyle**: `'line' | 'dashed-line' | 'area'`
  - **label**: `string` — Label that appears to the right of the dataset.
  - **labelColor**: `string` — Color for the right data label.
  - **gradientColorStops**: `[string, string]` — Start and end color for the gradient. Use the same hex for both if no gradient is needed.
  - **gradientTransparencyStops**: `[number, number]` (optional) — Start and end opacity for the gradient (0–1).
  - **gradientDirection**: `'v' | 'h'` — Vertical or horizontal gradient.
  - **yRange**: `[number, number]` (optional) — Custom Y-axis range for this dataset. Default is your data's min and max.
  - **animationDelay**: `number` (optional) — Delay (in seconds) before animating this dataset. Can create staggered effects. Default is 0.
  - **data**: `Point[]` — Array of data points `{ x: number | null, y: number | null }`.
  Supports null values for incomplete data. Null points are skipped; lines are not drawn between points separated by null.
  - **styles**: `object` (optional) — Optional custom styles:
    - **labelTop**: `number` — Top offset for the right-side label relative to its original position (in px).
    - **labelLeft**: `number` — Left offset for the right-side label relative to its original position (in px).
    - **pathStyle**: `React.CSSProperties` — Styles applied directly to the SVG path element.

- **styles**: `{ ... }` — Custom styling options:
  - **chartTitle**: `{ ... }` — Title styling options:
    - **minHeight**: `number` (optional) — Minimum height for the title; determines where dataset renders.
    - **style**: `React.CSSProperties` (optional) — Styles for the chart title element.
  - **axes**: `{ ... }` — Axis tick and label styles:
    - **primaryTickColor**: `string` (optional) — Color for primary ticks. Defaults to `textColor`.
    - **secondaryTickColor**: `string` (optional) — Color for secondary ticks. Defaults to \~25% opacity of `textColor`.
    - **textStyle**: `React.CSSProperties` (optional) — style the SVG text element for the axis directly
  - **rightDataLabels**: `{ ... }` — Right-aligned data label styles:
    - **style**: `React.CSSProperties` (optional) — style label container
    - **textStyle**: `React.CSSProperties` (optional) — style svg text element directly

## `<ResponsiveCurvyGraph />` Props

- **width, height**: `string | number` — Dimensions of the chart in pixels, %, or other units.
- See [CurvyGraph section](#curvygraph-) for all other props.

## `generateLabeledYPoints` Helper Method
Utils function that produces an array of evenly distributed `LabeledYPoint` - `{ yLabel: string, y: number }[]` objects across a given Y-axis range.
  
If your chart uses `spaceBelowData` (e.g., for visual padding), you will need to add additional ticks to account for that space.

Parameters

- **`yRange`**: `[min, max]` range for the Y-axis (inclusive).
- **`totalDataPoints`**: The number of points to divide the range into
- **`getLabel`**: Function to generate a label for each Y value.

Returns

- An array of `LabeledYPoint` objects.

**For Example:**

Given `yRange = [2, 10]`, `totalDataPoints = 5`, and `` (y: number) => `${y}°F` `` the result will be:

```ts
[
  { y: 2, yLabel: '2°F' },
  { y: 4, yLabel: '4°F' },
  { y: 6, yLabel: '6°F' },
  { y: 8, yLabel: '8°F' },
  { y: 10, yLabel: '10°F' }
]
```

## Parts - Advanced Use
For even greater customization, use the graph parts that make `CurvyGraph` directly: `ChartTitle`, `CurvyGraphPart`, `CurvyGraphAnimator`, `XAxis`, `YAxis`, and `RightDataLabel`.

<details>
<summary>Expand for prop details & example</summary>

- `ChartTitle` — Renders a styled, centered chart title.
  - **title**: `string` — The text to display as the chart title.
  - **widthToCenterOn**: `number` — The width (in pixels) used to center the title.
  - **leftOffset**: `number` — The left offset (in pixels) for positioning the title.
  - **style**: `React.CSSProperties` (optional) — Additional CSS styles to apply to the title. This will also override the default styles (including the default width and left values controlled by props).

- `CurvyGraphPart` — renders the data of a curvy graph, supporting line, area, and dashed-line types with gradients and refs for external animation.
  - **id**: `string` — Unique identifier for the graph part instance.
  - **animationRefs**: `{ clipPathRect: React.Ref<SVGRectElement>; svgRoot: React.Ref<SVGSVGElement>; }` (optional) — Refs for SVG elements, allowing parent components to control animation (e.g., for reveal effects).
  - **data**: `{ x: number | null, y: number | null }[]` — Array of `Point` objects representing the data to plot.
  - **width**: `number` — Width of the SVG/chart area in pixels.
  - **height**: `number` — Height of the SVG/chart area in pixels.
  - **yRange**: `[number, number]` (optional) — Y-axis range to be used instead of normalizing over data min/max.
  - **xRange**: `[number, number]` (optional) — X-axis range to be used instead of normalizing over data min/max.
  - **type**: `GraphType` — `'area' | 'dashed-line' | 'line'`.
  - **spaceBelowData**: `number` — Extra space below the lowest data point for visual padding.
  - **gradientColorStops**: `[string, string]` — Start and end color for the SVG gradient fill/stroke.
  - **gradientTransparencyStops**: `[number, number]` (optional) — Start and end opacity for the SVG gradient fill/stroke. Should be a decimal from 0 - 1.
  - **gradientDirection**: `GradientDirection` — `'v' | 'h'` (default: `'v'`).
  - **showAreaShadow**: `boolean` (optional) — If true, displays a shadow above/behind the area graph.
  - **isSharp**: `boolean` (optional) — If true, renders straight lines between data points (sharp/linear). If false, renders smooth, curvy lines using Bézier curves. Default is false (curvy).
  - **style**: `React.CSSProperties` (optional) — CSS styles for the container div.
  - **pathStyle**: `React.CSSProperties` (optional) — CSS styles for the path element.

- `CurvyGraphAnimator` — Handles animated reveal of graph paths.
  - **id**: `string` — Unique identifier for the animator instance.
  - **animate**: `boolean` (optional) — If false, disables the animation (default: true).
  - **data**: `{ x: number | null, y: number | null }[]` — Array of `Point` objects; changes to this array trigger re-animation.
  - **width**: `number` — The target width (in pixels) to animate the reveal to.
  - **delay**: `number` — Delay (in seconds) before starting the animation.
  - **children**: `(refs: { clipPathRect: React.Ref<SVGRectElement>; svgRoot: React.Ref<SVGSVGElement>; }) => React.ReactNode` — Render prop function that receives refs for the clip path rectangle and SVG root, allowing child graph components to use these refs for animation.

    The component uses a wrapper pattern, so the child graph is not defined here.  
    Instead, it passes animation refs to its children for flexible integration.

    Example

    ```jsx
      <CurvyTimeGraphAnimator>
        {(refs) => (
          <CurvyTimeGraph
            animationRefs={refs}
          />
        )}
      </CurvyTimeGraphAnimator>
    ```

- `XAxis` — Render x-axis with ticks and labels.
  - **data**: `{ xLabel: string, xSubLabel?: string, x: number}[]` — Array of labeled X points, each with a value and label (and optional sublabel).
  - **width**: `number` — The width of the chart area in pixels.
  - **xRange**: `[number, number]` (optional) — X-axis range to use instead of normalized values from your data min and max.
  - **labelFrequency**: `number` (optional) — How often tick labels should show (every nth tick is labeled; 5 means every 5th tick will be labeled). Default is 1.
  - **primaryTickColor**: `string` — Color for primary (labeled) tick marks.
  - **secondaryTickColor**: `string` — Color for secondary (unlabeled) tick marks.
  - **labelColor**: `string` — Color for the X-axis labels and sublabels.
  - **style**: `React.CSSProperties` (optional) — CSS styles for the X-axis container.
  - **textStyle**: `React.CSSProperties` (optional) — CSS styles for the labels of the axis.

- `YAxis` — Render y-axis with ticks, labels, and guidelines.
  - **height**: `number` — The height of the y-axis in pixels (should match chart height).
  - **graphWidth**: `number` — The width of the chart area, used for drawing guidelines.
  - **labelFrequency**: `number` (optional) — How often tick labels should show (every nth tick is labeled; 5 means every 5th tick will be labeled). Default is 1.
  - **labeledYPoints**: `{ yLabel: string, y: number }[]` — Array of labeled Y points, each with a value and label. The [`generateLabeledYPoints`](#generatelabeledypoints-helper-method) utils function is exported as part of the library. You can use this to help create your labeledYPoints!
  - **spaceBelowData**: `number` (optional) — Extra space below the lowest data point for visual padding.
  - **getLabel**: `(y: number) => string` (optional) — Function that provides a y coordinate and expects a label for that coordinate. Used to fill the y-axis labels for the spaceBelowData if a value > 0 was provided. If no callback is defined, the extra labels will be empty strings.
  - **yRange**: `[number, number]` (optional) — Y-axis range to use instead of normalized values from your data min and max.
  - **onConfigMeasured**: `(config: YAxisLabelConfig) => void` (optional) — Callback to access the rendered y-axis config values (in pixels).
  - **primaryTickColor**: `string` — Color for primary (labeled) tick marks.
  - **secondaryTickColor**: `string` — Color for secondary (unlabeled) tick marks and guidelines.
  - **labelColor**: `string` — Color for the Y-axis labels.
  - **showGuideLines**: `boolean` (optional) — If true, horizontal guidelines will display behind the chart for each primary (labeled) tick. Default is true.
  - **style**: `React.CSSProperties` (optional) — CSS styles for the Y-axis container.
  - **textStyle**: `React.CSSProperties` (optional) — CSS styles for the labels of the axis.

- `RightDataLabel` — Renders a label next to the last data point. The component normalizes data points, positions the label at the last data point, and dynamically measures its width for layout purposes.
  - **data**: `{ x: number | null, y: number | null }[]` — Array of `Point` objects representing the data to plot. Used to calculate the normalized y values the same way the chart data does. This way we get an accurate final y value to position the text relative to.
  - **height**: `number` — Height of the SVG/chart area in pixels.
  - **yRange**: `[number, number]` (optional) — Y-axis range to specify instead of the data min/max.
  - **labelColor**: `string` — Color for the label text.
  - **label**: `string` — The text to display as the label.
  - **spaceBelowData**: `number` (optional) — Extra space below the lowest data point for visual padding. Used for position calculations to match where the data is actually rendered in the chart.
  - **onWidthMeasured**: `(width: number) => void` (optional) — Callback to access the rendered label width (in pixels).
  - **style**: `React.CSSProperties` (optional) — CSS styles for the container div.
  - **textStyle**: `React.CSSProperties` (optional) — CSS styles for the SVG text element directly. Can also override default values.

Here is an example of using parts. To reduce complexities in this example, the graph is not responsive or dynamic in its dimensions.
```tsx
import { ChartTitle, CurvyGraphAnimator, CurvyGraphPart, XAxis, YAxis, RightDataLabel } from 'curvy-graphs/parts';

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
        title='Weekly Temperatures'
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
        secondaryTickColor='#E0E1E240'
        labelColor={themePrimary}
        labelFrequency={1}
        showGuideLines={true}
      />
      <CurvyGraphAnimator
        id='temperatures-parts'
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
              id='temperatures-parts'
              animationRefs={refs}
              style={{ position: 'absolute', top: 50, left: yAxisWidth }}
              width={width - yAxisWidth}
              height={height - 50}
              spaceBelowData={0}
              data={data}
              yRange={undefined}
              xRange={undefined}
              gradientColorStops={['#2FF3E0', '#5D6CE9']}
              gradientDirection='v'
              type='line'
              isSharp={false}
            />
            <RightDataLabel
              style={{ position: 'absolute', top: 50 - 18, left: width + 7 }}
              height={height - 50}
              spaceBelowData={0}
              data={data}
              label={'Temperature'}
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
        secondaryTickColor='#E0E1E240'
        labelColor={themePrimary}
      />
    </div>
  );
}
```

This produces the same graph as our first basic example:
![Basic Temperatures Graph](https://raw.githubusercontent.com/nrs32/curvy-graphs/refs/heads/main/packages/curvy-graphs/src/assets/basicWeeklyTemperatureExample.png)

</details>

---

## License

Apache License

(Anyone can use, modify, and distribute the code freely. They just need to keep the license, credit the original authors, and note any changes they make. See full details in license.)

---

## Acknowledgements

- Built with ❤️ by [nrs32](https://github.com/nrs32)
- You can also find me on [LinkedIn](https://www.linkedin.com/in/nikita-sietsema-5a553a17a/) *(Please note: I do not respond to support requests via LinkedIn.)*
