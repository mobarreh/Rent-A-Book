const sendHandler = async (event) => {
    event.preventDefault();
      const response = await fetch(`/api/books/send`, {
        method: 'POST',
        body: JSON.stringify({text: '' }),
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
  