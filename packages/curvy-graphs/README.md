# curvy-graphs

A modern, highly customizable React component library for rendering beautiful, animated, and responsive line and area graphs with smooth curves, gradients, and labeling.

---

## Features

- **Curvy and Sharp Graphs:** Render smooth Bézier curves or sharp/linear lines between data points.
- **Multiple Graph Types:** Supports line, dashed-line, area, and hybrid graphs.
- **Gradient Fills and Strokes:** Easily apply vertical or horizontal gradients, with optional transparency stops.
- **Animated Reveals:** Animate graph drawing with customizable delays for each dataset.
- **Responsive Layout:** Use `ResponsiveCurvyGraph` to automatically fit any container and handle resizing smoothly.
- **Customizable Axes:** Configure tick frequency, guidelines, label formatting, and axis colors.
- **Right-Aligned Data Labels:** Show dynamic labels next to the last data point of a data set.
- **Flexible Styling:** Override styles for chart title, axes, labels, and graph paths.
- **Composable API:** Use low-level parts for custom graph layouts, or the high-level `CurvyGraph` and `ResponsiveCurvyGraph` for convenience.

---

## Examples
Below are example charts created with this library to showcase its possibilities.

![Humidity And Temperature](https://raw.githubusercontent.com/nrs32/curvy-graphs/refs/heads/main/packages/curvy-graphs/src/assets/humidityAndTemperature.gif)
**Caret buttons used to change the date in the Humidity And Temperature chart are not part of this graph library.*
  
![Temperature Trend](https://raw.githubusercontent.com/nrs32/curvy-graphs/refs/heads/main/packages/curvy-graphs/src/assets/tempTrend.gif)
  
![Water Levels](https://raw.githubusercontent.com/nrs32/curvy-graphs/refs/heads/main/packages/curvy-graphs/src/assets/waterLevels.png)
  
![Actual and Apparent Temperature](https://raw.githubusercontent.com/nrs32/curvy-graphs/refs/heads/main/packages/curvy-graphs/src/assets/actualAndApparentTemperature.png)
  
![Precipitation](https://raw.githubusercontent.com/nrs32/curvy-graphs/refs/heads/main/packages/curvy-graphs/src/assets/precipitation.png)
  
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
  chartTitle="Weekly Temperatures"
  textColor="#E0E1E2"
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
      dataId: "temperatures",
      graphStyle: 'line',
      label: "Temperature",
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

The only difference in usage between these two components is how the width and height props are handled. Instead of numbers (for pixels), you can pass string percentages or numbers.

Below, we recreate the basic usage example, but with a width of 100% within a flex layout:

```tsx
import { ResponsiveCurvyGraph } from 'curvy-graphs';

<div style={{ width: "70%", border: "1px dashed red" }}>
  <ResponsiveCurvyGraph
    width={'100%'}
    height={310}
    // ... rest of props ...
  />
</div>

<div style={{
  flex: 1,
  padding: "20px",
  border: "1px dashed blue",
  color: 'white',
  alignContent: 'center',
  textAlign: 'center',
}}>
  <p>Other layout content could be here</p>
</div>
```

The result is this
![Responsive Temperatures Graph](https://raw.githubusercontent.com/nrs32/curvy-graphs/refs/heads/main/packages/curvy-graphs/src/assets/responsiveExample.gif)

We can also add animation like this:
```tsx
import { ResponsiveCurvyGraph } from 'curvy-graphs';

<ResponsiveCurvyGraph
  width={'100%'}
  height={310}
  animate={true}
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

## API Reference

### `<CurvyGraph />`

A comprehensive, all-in-one graph component.

#### Props
- **chartTitle**: `string` — Title text for the chart.
- **textColor**: `string` — Hex color for title and axis labels.
- **width, height**: `number` — Dimensions of the chart in pixels. Use `ResponsiveCurvyGraph` for more options.
- **spaceBelowData**: `number` (optional) — Extra visual space below the lowest data point.
  Useful for area charts and dynamic Y-axis ranges where you don’t want the lowest value to sit on the X-axis.
  
  If you use this, you **must** also provide `getExtendedYLabel` in `yAxis`. This may affect Y-axis tick mark logic and label frequency. 
  
  Default is `0`.
- **animate**: `boolean` (optional) — Animate the chart on data or layout changes. Default is `false`.
- **isSharp**: `boolean` (optional) — If true, renders sharp/linear lines between points. Default is false (curvy).

- **yAxis**: `{ ... }` — Y-axis configuration:
  - **labeledPoints**: `LabeledYPoint[]` — Array of `{ y, yLabel }` for axis labels and ticks.
  - **getExtendedYLabel**: `(y: number) => string` (optional) — Used to label the extra Y-axis space added when `spaceBelowData` is used. Defaults to empty labels.
  - **labelFrequency**: `number` (optional) — Show a label on every nth tick mark. Default is 1.
  - **showGuideLines**: `boolean` (optional) — Show horizontal guidelines behind chart. Default is true.

- **xAxis**: `{ ... }` — X-axis configuration:
  - **labeledPoints**: `LabeledXPoint[]` — Array of `{ x, xLabel, xSubLabel? }` for axis ticks.
  - **labelFrequency**: `number` (optional) — Show a label on every nth tick mark. Default is 1.

- **dataSets**: `DataSet[]` — Array of datasets to plot. Each dataset:
  - **dataId**: `string` — Unique key accross all charts (no spaces).
  - **graphStyle**: `'line' | 'dashed-line' | 'area'`
  - **label**: `string` — Label that appears to the right of the dataset.
  - **labelColor**: `string` — Color for the right data label.
  - **gradientColorStops**: `[string, string]` — Start and end color for the gradient. Use the same hex for both if no gradient is needed.
  - **gradientTransparencyStops**: `[number, number]` (optional) — Start and end opacity for the gradient (0–1).
  - **gradientDirection**: `'v' | 'h'` — Vertical or horizontal gradient.
  - **yRange**: `[number, number]` (optional) — Custom Y-axis range for this dataset. Default is your data's min and max.
  - **animationDelay**: `number` (optional) — Delay (in seconds) before animating this dataset. Can create staggered effects. Default is 0.
  - **data**: `Point[]` — Array of data points `{ x: number | null, y: number | null }`. Null is accepted for data breaks.
  - **styles**: `object` (optional) — Optional custom styles:
    - **labelTop**: `number` — Top offset for the right-side label (in px).
    - **labelLeft**: `number` — Left offset for the right-side label (in px).
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

### `<ResponsiveCurvyGraph />`
A comprehensive, all-in-one graph component supporting responsive layouts.

### Parts
For even greater customization, use the graph parts that make `CurvyGraph` directly.


## Customization & Styling

- All components accept `style` or `styles` props for fine-grained CSS control.
- Axis, label, and path styles can be overridden for branding or theming.
- Gradients and transparency can be customized per dataset.

---

## TypeScript Support

- All components and props are fully typed.
- Utility types for points, datasets, and axis labels are exported for convenience.

---

## License

Apache License

(Anyone can use, modify, and distribute the code freely. They just need to keep the license, credit the original authors, and note any changes they make. See full details in license.)

---

## Contributing
Please note, this package is lightly maintained.

Pull requests and issues are welcome. Please open an issue to discuss your idea or bug before submitting a PR.

---

## Acknowledgements

- Built with ❤️ by [nrs32](https://github.com/nrs32)
- You can also find me on [LinkedIn](https://www.linkedin.com/in/nikita-sietsema-5a553a17a/) *(Please note: I do not respond to support requests via LinkedIn.)*