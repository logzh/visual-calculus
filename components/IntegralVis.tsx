import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

interface Props {
  width?: number;
  height?: number;
}

const IntegralVis: React.FC<Props> = ({ width = 600, height = 400 }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [rectCount, setRectCount] = useState<number>(4);

  // Function: f(x) = 0.1 * (x + 3) * (x - 1) * (x - 4) + 4
  // Adjusted to stay positive in range for simpler area viz
  const f = (x: number) => 0.1 * Math.pow(x, 2) + 1;
  const range = { min: -4, max: 4 };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xDomain = [-5, 5];
    const yDomain = [0, 5];

    const xScale = d3.scaleLinear().domain(xDomain).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain(yDomain).range([innerHeight, 0]);

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(10))
      .attr("color", "#94a3b8");

    g.append("g")
      .call(d3.axisLeft(yScale).ticks(5))
      .attr("color", "#94a3b8");

    // Draw Riemann Rectangles
    // Width of each rect
    const totalWidth = range.max - range.min;
    const dx = totalWidth / rectCount;
    
    let currentArea = 0;

    // Create data for rects
    const rectsData = [];
    for (let i = 0; i < rectCount; i++) {
      const xLeft = range.min + i * dx;
      const heightVal = f(xLeft); // Left Riemann sum
      currentArea += heightVal * dx;
      rectsData.push({ x: xLeft, y: heightVal, w: dx });
    }

    g.selectAll(".bar")
      .data(rectsData)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.x))
      .attr("y", d => yScale(d.y))
      .attr("width", d => xScale(d.x + d.w) - xScale(d.x) - 1) // -1 for slight gap
      .attr("height", d => innerHeight - yScale(d.y))
      .attr("fill", "#10b981") // emerald-500
      .attr("fill-opacity", 0.3)
      .attr("stroke", "#10b981")
      .attr("stroke-width", 1);

    // Curve
    const line = d3.line<number>()
      .x(d => xScale(d))
      .y(d => yScale(f(d)))
      .curve(d3.curveMonotoneX);

    const dataPoints = d3.range(xDomain[0], xDomain[1] + 0.1, 0.1);

    g.append("path")
      .datum(dataPoints)
      .attr("fill", "none")
      .attr("stroke", "#0f172a")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Area Text
    svg.append("text")
      .attr("x", width - margin.right)
      .attr("y", margin.top + 20)
      .attr("text-anchor", "end")
      .attr("class", "text-sm font-mono fill-emerald-700 font-bold")
      .text(`Approx Area: ${currentArea.toFixed(3)}`);

  }, [rectCount, width, height]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200">
        <svg ref={svgRef} width={width} height={height} className="overflow-visible" />
      </div>

      <div className="w-full max-w-md space-y-2 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
        <div className="flex justify-between text-sm font-medium text-emerald-900">
          <span>Rectangles (N): {rectCount}</span>
          <span>Precision: {rectCount > 50 ? "High" : "Low"}</span>
        </div>
        <input
          type="range"
          min="1"
          max="50"
          step="1"
          value={rectCount}
          onChange={(e) => setRectCount(parseInt(e.target.value))}
          className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
        />
        <p className="text-xs text-emerald-700 text-center">
          Increase N to make the rectangles thinner. 
          As N → ∞, the sum approaches the exact Area (Integral).
        </p>
      </div>
    </div>
  );
};

export default IntegralVis;