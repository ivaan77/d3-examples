const draw = async () => {
    // data
    const dataSet = await d3.json('data.json');

    const xAccessor = ({currently}) => currently.humidity;
    const yAccessor = ({currently}) => currently.apparentTemperature
    // dimensions
    const dimensions = {
        width: 800,
        height: 800,
        margin: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50,
        }
    }

    dimensions.containerWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.containerHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    // draw image
    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height);

    const container = svg.append('g')
        .attr('transform', `translate(${dimensions.margin.left}, ${dimensions.margin.top})`);

    // scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(dataSet, xAccessor))
        .rangeRound([0, dimensions.containerWidth])
        .clamp(true)

    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataSet, yAccessor))
        .rangeRound([dimensions.containerHeight, 0])
        .nice()
        .clamp(true)

    // draw circles
    container.selectAll('circle')
        .data(dataSet)
        .join('circle')
        .attr('cx', data => xScale(xAccessor(data)))
        .attr('cy', data => yScale(yAccessor(data)))
        .attr('r', 5)
        .attr('fill', 'red')
        .attr('data-temp', yAccessor)

    // axes
    const xAxis = d3.axisBottom(xScale)
        .ticks(5)
        .tickFormat((labelValue) => labelValue * 100 + '%')
    //.tickValues([0.4,0.5,0.8])

    const xAxisGroup = container.append('g')
        .call(xAxis)
        .style('transform', `translateY(${dimensions.containerHeight}px)`)
        .classed('axis', true);

    xAxisGroup.append('text',)
        .attr('x', dimensions.containerWidth / 2)
        .attr('y', dimensions.margin.bottom - 10)
        .attr('fill', 'black')
        .text('Humidity')

    const yAxis = d3.axisLeft(yScale);

    const yAxisGroup = container.append('g')
        .call(yAxis)
        .classed('axis', true);

    yAxisGroup.append('text')
        .attr('x', -dimensions.height / 2)
        .attr('y', -dimensions.margin.left + 15)
        .attr('fill', 'black')
        .html('Temperature &deg; F')
        .style('transform', 'rotate(270deg)')
        .style('text-anchor', 'middle')
}

draw();
