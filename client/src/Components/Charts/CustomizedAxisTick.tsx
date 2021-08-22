import React from "react";

interface IProps {
    x: number;
    y: number;
    payload: {value: string};
}

/**
 * Рисует координатную ось x для графика "Годы выпуска".
 */
export class CustomizedAxisTick extends React.PureComponent<IProps> {
    render() {
        const {x, y, payload} = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={30}
                    y={-11}
                    dy={16}
                    className="small"
                    textAnchor="end"
                    fill="#666"
                    transform="rotate(90)"
                >
                    {payload.value}
                </text>
            </g>
        );
    }
}
