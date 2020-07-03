import React from "react";

/**
 * Рисует координатную ось x для графика "Годы выпуска".
 */
export class CustomizedAxisTick extends React.PureComponent {
    render() {
        const {
            x, y, payload,
        } = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={30} y={-11} dy={16} className="small" textAnchor="end" fill="#666" transform="rotate(90)">{payload.value}</text>
            </g>
        );
    }
}
