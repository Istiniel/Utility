let arr = [
  {
    value: 1,
    childs: [
      { value: ' 2', childs: [] },
      {
        value: ' 3',
        childs: [
          { value: '  19', childs: [] },
          { value: '  18', childs: [] },
        ],
      },
    ],
  },
  {
    value: 2,
    childs: [
      { value: ' 3', childs: [] },
      { value: ' 4', childs: [] },
    ],
  },
  {
    value: 5,
    childs: [
      { value: ' 6', childs: [] },
      { value: ' 7', childs: [] },
    ],
  },
];

function test(arr) {
  function display(e) {
    console.log(e.value);
    if (e.childs.length > 0) {
      test(e.childs);
    }
  }

  arr.map((e) => display(e));
  return arr;
}

function addChild(arr, id) {
  arr.map((e) =>
    e.value === id
      ? e.childs.push({ value: ' addedInfo', childs: [] })
      : e.childs.length > 0
      ? addChild(e.childs, id)
      : e
  );
  return arr;
}

function removeChild(arr, id) {
  arr = arr.filter((obj) => (obj.value !== id ? true : false));
  arr.map((obj) =>
    obj.childs.length > 0 ? (obj.childs = removeChild(obj.childs, id)) : obj
  );
  return arr;
}

arr = addChild(arr, '  19');
arr = removeChild(arr, '  18');

console.log(test(arr));
