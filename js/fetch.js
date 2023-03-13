// !GET - запрос
fetch('http://jsonplaceholder.typicode.com/posts')
  .then(function (response) {
    if (response.status !== 200) {
      console.log(
        'Looks like there was a problem. Status Code: ' + response.status
      );
      return;
    }

    // Examine the text in the response
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });

// !POST-запросы
let user = {
  name: 'John',
  surname: 'Smith',
};
async function test() {
  let response = await fetch('http://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  });

  return await response.json();
}
test()
  .then((result) => console.log(result))
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });
