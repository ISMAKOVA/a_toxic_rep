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

const colors=['#C590EF', '#83DBD6', '#745FF2']

const BarChart = (props) =>{
        return( <Chart width={400} height={400} series={props.data} minY={0}>
            <Bars
                colors={colors}
                barAttributes={{
                    onMouseMove: e => e.target.style.fillOpacity = 1,
                    onMouseLeave: e => e.target.style.fillOpacity = 0.8
                }}
                barStyle={{
                    fillOpacity: 0.8,
                }}
                innerPadding='0.5%'
                groupPadding='3%'
                // innerRadius='33%'
            />
        </Chart>
)

}

export default BarChart;
