import { FC, memo, useEffect, useRef, useState } from "react";
import { useBubbleSort } from "../../hooks/useBubbleSort";
import { Data, data } from "../mock-data/data";
import BarChart from "./BarChart";

type ChartWrapperProps = {};

const ChartWrapper: FC<ChartWrapperProps> = (props) => {
  const [chartData, setChartData] = useState([...data]);
  const [historyArray, setHistoryArray] = useState([[...data]]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const { bubbleSort } = useBubbleSort();

  const timeoutRef = useRef<number>();

  useEffect(() => {
    setChartData(
      historyArray[activeIndex] ?? historyArray[historyArray.length - 1]
    );
  }, [activeIndex, historyArray]);

  useEffect(() => {
    if (activeIndex < historyArray.length - 1 && playing) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setActiveIndex(activeIndex + 1);
      }, 500);
    } else {
      setPlaying(false);
    }
  }, [activeIndex, playing]);

  const handleBubbleSort = (arr: Data[]) => {
    const historyArray = bubbleSort(arr, arr.length);
    setHistoryArray(historyArray);

    setPlaying(true);
  };

  return <BarChart data={chartData} handleBubbleSort={handleBubbleSort} />;
};

ChartWrapper.defaultProps = {};

export default memo(ChartWrapper);
