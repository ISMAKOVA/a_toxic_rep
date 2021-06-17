import {
    // main component
    Chart,
    // graphs
    Bars, Cloud, Dots, Labels, Lines, Pies, RadialLines, Ticks, Title,
    // wrappers
    Layer, Animate, Transform, Handlers,
    // helpers
    helpers, DropShadow, Gradient
} from 'rumble-charts';

const series = [{
    data: [1, 2, 4]
}];
const colors=['#C590EF', '#83DBD6', '#745FF2']

const PieChart = (props) =>{
    return(
        <Chart width={400} height={400} series={props.data}>
            <Transform method={['transpose', 'stack']}>
                <Pies
                    combined={true}
                    colors = {colors}

                />
            </Transform>
        </Chart>)

}

export default PieChart;
