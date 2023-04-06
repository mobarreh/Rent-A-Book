const sendHandler = async (event) => {
  const name = document.querySelector('#name').value;
  const description = document.querySelector('#description').value;
  const price = document.querySelector('#price').value;

    event.preventDefault();
      const response = await fetch(`/api/books/send`, {
        method: 'POST',
        body: JSON.stringify({name, description,price}),
        headers: { 'Content-Type': 'application/json' },
        });

    if (response.ok) {
      alert ('Email receipt sent')
      } else {
        alert(response.statusText);
      }
  };
  document
    .querySelector('.rent-form')
    .addEventListener('submit', sendHandler);
  