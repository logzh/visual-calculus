import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

interface Props {
  width?: number;
  height?: number;
}

const DerivativeVis: React.FC<Props> = ({ width = 600, height = 400 }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [xVal, setXVal] = useState<number>(1.5);

  // Function: f(x) = x^3 / 3 - x
  // Derivative: f'(x) = x^2 - 1
  const f = (x: number) => (Math.pow(x, 3) / 3) - x;
  const df = (x: number) => Math.pow(x, 2) - 1;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xDomain = [-3, 3];
    const yDomain = [-3, 3];

    const xScale = d3.scaleLinear().domain(xDomain).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain(yDomain).range([innerHeight, 0]);

    // Gridlines (optional, minimal)
    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(5).tickSize(-innerHeight).tickFormat(() => ""))
      .style("stroke-opacity", 0.1);
    
    g.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).ticks(5).tickSize(-innerWidth).tickFormat(() => ""))
      .style("stroke-opacity", 0.1);

    // Axes
    g.append("g")
      .attr("transform", `translate(0,${yScale(0)})`)
      .call(d3.axisBottom(xScale).ticks(5))
      .attr("color", "#94a3b8");

    g.append("g")
      .attr("transform", `translate(${xScale(0)},0)`)
      .call(d3.axisLeft(yScale).ticks(5))
      .attr("color", "#94a3b8");

    // Line Path
    const line = d3.line<number>()
      .x(d => xScale(d))
      .y(d => yScale(f(d)))
      .curve(d3.curveMonotoneX);

    const dataPoints = d3.range(xDomain[0], xDomain[1] + 0.1, 0.1);

    g.append("path")
      .datum(dataPoints)
      .attr("fill", "none")
      .attr("stroke", "#4f46e5") // indigo-600
      .attr("stroke-width", 3)
      .attr("d", line);

    // Tangent Line
    // Equation: y - y1 = m(x - x1)  => y = m(x - x1) + y1
    const slope = df(xVal);
    const yVal = f(xVal);
    
    // Calculate endpoints for tangent line segment
    const lineLen = 1.5; 
    const x1 = xVal - lineLen;
    const x2 = xVal + lineLen;
    const y1 = slope * (x1 - xVal) + yVal;
    const y2 = slope * (x2 - xVal) + yVal;

    g.append("line")
      .attr("x1", xScale(x1))
      .attr("y1", yScale(y1))
      .attr("x2", xScale(x2))
      .attr("y2", yScale(y2))
      .attr("stroke", "#e11d48") // rose-600
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "4");

    // Point
    g.append("circle")
      .attr("cx", xScale(xVal))
      .attr("cy", yScale(yVal))
      .attr("r", 6)
      .attr("fill", "#e11d48")
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    // Slope Triangle (optional visual aid)
    const run = 0.5;
    const rise = slope * run;
    if (xVal + run < xDomain[1]) {
       const tx1 = xScale(xVal);
       const ty1 = yScale(yVal);
       const tx2 = xScale(xVal + run);
       const ty2 = yScale(yVal); // horizontal
       const tx3 = xScale(xVal + run);
       const ty3 = yScale(yVal + rise); // vertical

       // Draw triangle
       const trianglePath = d3.path();
       trianglePath.moveTo(tx1, ty1);
       trianglePath.lineTo(tx2, ty2);
       trianglePath.lineTo(tx3, ty3);
       trianglePath.closePath();
       
       g.append("path")
        .attr("d", trianglePath.toString())
        .attr("fill", "#e11d48")
        .attr("fill-opacity", 0.1)
        .attr("stroke", "none");
    }

  }, [xVal, width, height]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200">
        <svg ref={svgRef} width={width} height={height} className="overflow-visible" />
      </div>
      
      <div className="w-full max-w-md space-y-2 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
        <div className="flex justify-between text-sm font-medium text-indigo-900">
          <span>X Position: {xVal.toFixed(2)}</span>
          <span>Slope (Derivative): {df(xVal).toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="-2.5"
          max="2.5"
          step="0.01"
          value={xVal}
          onChange={(e) => setXVal(parseFloat(e.target.value))}
          className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <p className="text-xs text-indigo-700 text-center">
          Drag to see how the slope of the tangent line changes.
          Where is the slope zero? (Local max/min)
        </p>
      </div>
    </div>
  );
};

export default DerivativeVis;