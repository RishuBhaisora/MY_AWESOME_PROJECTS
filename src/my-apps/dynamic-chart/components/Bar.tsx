import { FC, memo, useMemo } from "react";
import cn from "classnames";
type BarProps = {
  y_axis: number;
  color: string;
};

const Bar: FC<BarProps> = ({ y_axis, color }) => {
  return (
    <div className={" mt-2 space-x-2 font-bold  "}>
      {y_axis}
      <div
        style={{ height: `${y_axis}px` }}
        className={cn(" w-24 bg-red-600", `bg-${color}-600 `)}
      ></div>
    </div>
  );
};

Bar.defaultProps = {};

export default memo(Bar);
