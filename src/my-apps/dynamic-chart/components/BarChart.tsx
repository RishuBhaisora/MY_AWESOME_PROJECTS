import { FC, memo } from "react";
import { Data } from "../mock-data/data";
import Bar from "./Bar";

type BarChartProps = {
  data: Data[];
  handleBubbleSort: (x: Data[]) => void;
};

const BarChart: FC<BarChartProps> = ({ data, handleBubbleSort }) => {
  return (
    <div className=" h-[90vh]  p-10 m-10 items-end  space-x-4 bg-yellow-300 shadow-lg rounded-lg flex overflow-hidden relative">
      <button onClick={() => handleBubbleSort(data)}>Sort</button>
      {data.map((dta) => (
        <Bar key={dta.id} y_axis={dta.y_axis} color={dta.bar_color} />
      ))}
    </div>
  );
};

BarChart.defaultProps = {};

export default memo(BarChart);
