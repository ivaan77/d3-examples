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
    dimensions.containerHeight = dimensions.height- dimensions.margin.top - dimensions.margin.bottom;

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
        .rangeRound([0, dimensions.containerHeight])
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

    // axes

    const xAxis = d3.axisBottom(xScale);

    const xAxisGroup = container.append('g')
        .call(xAxis)
        .style('transform', `translateY(${dimensions.containerHeight}px)`)
        .classed('axis', true);

    xAxisGroup.append('text', )
        .attr('x', dimensions.containerWidth / 2)
        .attr('y', dimensions.margin.bottom - 10)
        .attr('fill', 'black')
        .text('Humidity')
}

draw();
