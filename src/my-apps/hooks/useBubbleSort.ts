export const useBubbleSort = () => {
  function swap(arr: any, xp: number, yp: number) {
    let temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
  }
  function bubbleSort(arr: any, n: number) {
    let historyArray: any = [[...arr]];
    let i, j: any;
    for (i = 0; i < n - 1; i++) {
      for (j = 0; j < n - i - 1; j++) {
        if (arr[j].y_axis > arr[j + 1].y_axis) {
          swap(arr, j, j + 1);
          historyArray.push([...arr]);
        }
      }
    }
    return historyArray;
  }
  return { bubbleSort };
};
