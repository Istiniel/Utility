// Работает только с отсортированными массивами!!!
function binarySearch(arr, el) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((right + left) / 2);
    if (arr[mid] === el) {
      return mid;
    } else if (el < arr[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
}

console.log(
  binarySearch(
    ['a', 'st', '4', '2', 'ad', 'fgg', 'asd', 's', 'xf', 'asfasdg'],
    'xf'
  )
);

console.log(binarySearch([10, 20, 30, 50, 60, 80, 110, 130, 140, 170], 130));
