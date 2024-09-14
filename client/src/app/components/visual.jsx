"use client";
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const VisualComponent = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 1928;
    const height = 900;
    const n = 20; // number of layers
    const m = 200; // number of samples per layer

    function bump(a, n) {
      const x = 1 / (0.1 + Math.random());
      const y = 2 * Math.random() - 0.5;
      const z = 10 / (0.1 + Math.random());
      for (let i = 0; i < n; ++i) {
        const w = (i / n - y) * z;
        a[i] += x * Math.exp(-w * w);
      }
    }

    function bumps(n, m) {
      const a = Array(n).fill(0);
      for (let i = 0; i < m; ++i) bump(a, n);
      return a;
    }

    const x = d3.scaleLinear().domain([0, m - 1]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 1]).range([height, 0]);
    const z = false ? d3.interpolateRgb("red", "blue") : d3.interpolateCool; /* CHANGE COLOR FOR SPIDERMAN MODE */

    const area = d3.area()
      .x((d, i) => x(i))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]));

    const stack = d3.stack()
      .keys(d3.range(n).map(String))
      .offset(d3.stackOffsetWiggle)
      .order(d3.stackOrderNone);

    function randomize() {
      const layers = stack(d3.transpose(Array.from({ length: n }, () => bumps(m, 10))));
      y.domain([
        d3.min(layers, l => d3.min(l, d => d[0])),
        d3.max(layers, l => d3.max(l, d => d[1]))
      ]);
      return layers;
    }

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");

    const path = svg.selectAll("path")
      .data(randomize)
      .join("path")
      .attr("d", area)
      .attr("fill", () => z(Math.random()));

    function update() {
      path.data(randomize)
        .transition()
        .delay(0) /*CHANGE DELAY TO DEPEND ON HEART RATE*/
        .duration(100) /* CHANGE DURATION */
        .attr("d", area);
    }

    d3.interval(update, 100); /* CHANGE INTERVAL */

  }, []);

  return <svg ref={svgRef}></svg>;
};

export default VisualComponent;