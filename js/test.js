// console.log(insertionSort(test));
const test = [200, 100, 7, 1, 3, 2, 15, 9, 6];

function quicksort(arr, start, stop) {
  if (start < stop) {
    let pivotindex = partitionrand(arr, start, stop);
    quicksort(arr, start, pivotindex - 1);
    quicksort(arr, pivotindex + 1, stop);
  }

  return arr;
}

function partitionrand(arr, start, stop) {
  let randpivot = Math.floor(Math.random() * (stop - start + 1)) + start;
  [arr[start], arr[randpivot]] = [arr[randpivot], arr[start]];
  return partition(arr, start, stop);
}


function partition(arr, start = 0, stop = arr.length) {
  let pivot = start;
  let i = start + 1;

  for (let j = start + 1; j <= stop; j++) {
    if (arr[j] <= arr[pivot]) {
      [arr[j], arr[i]] = [arr[i], arr[j]];
      i++;
    }
    console.log(arr);
  }
  [arr[pivot], arr[i - 1]] = [arr[i - 1], arr[pivot]];
  pivot = i - 1;
  return pivot;
}

console.log(quicksort(test, 0, test.length - 1));
