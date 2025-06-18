const el = d3.select('body')
    .append('p')
    //.attr('class', 'foo')
    .classed('foo', true)
    .classed('bar', true)
    .text('Hola')
    .style('color', 'blue');

console.log(el);
