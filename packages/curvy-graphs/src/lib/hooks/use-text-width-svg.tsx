import { useEffect, useState } from "react";

function useTextWidthSVG(labels: string[], style: React.CSSProperties = {}, padding: number): number | null {
  const [maxWidth, setMaxWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!labels?.length) {
      setMaxWidth(0);
      return;
    }

    // Don't calculate text measurments until fonts are loaded
    document.fonts.ready.then(() => {
      // NS supports svg langauge, createElement is HTML only
      // The link tells NS what language to use, and that is SVG
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("style", "position: absolute; top: -9999px; left: -9999px;");
      document.body.appendChild(svg);
  
      let widestLabel = 0;
  
      labels.forEach((label) => {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        applyReactCSSAsAttributes(text, style);
        text.textContent = label;
        svg.appendChild(text);
  
        const width = text.getBBox().width;
        if (width > widestLabel) widestLabel = width;
      });
  
      svg.remove();
  
      setMaxWidth(Math.ceil(widestLabel + padding));
    });
  }, [labels, style, padding]);

  return maxWidth;
}

function applyReactCSSAsAttributes(
  element: SVGTextElement,
  style: React.CSSProperties
) {
  const styleMap: Record<string, string> = {
    fontSize: 'font-size',
    fontFamily: 'font-family',
    fontWeight: 'font-weight',
    fontStyle: 'font-style',
    letterSpacing: 'letter-spacing',
    wordSpacing: 'word-spacing',
    textAnchor: 'text-anchor',
    fill: 'fill',
  };

  for (const [key, value] of Object.entries(style)) {
    const svgAttr = styleMap[key];
    if (svgAttr && value != null) {
      element.setAttribute(svgAttr, value.toString());
    }
  }
}

export default useTextWidthSVG;
