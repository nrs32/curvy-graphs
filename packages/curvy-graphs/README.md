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
---

## API Reference


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