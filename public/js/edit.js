let buttonSelected = document.querySelector('.form-group');
let choreId ='';
let user_id = '';
let userPoints = '';
let totalPossiblePoints = '';
let total =''; 
function choreSelected(event){
    


    if (event.target.classList.contains("itemBtn")){
        alert("Hello")
        choreId = event.target.getAttribute('data-id');
        alert(choreId)
        user_id = event.target.getAttribute('value');
        alert(user_id)
        userPoints = event.target.getAttribute('points');
        alert(userPoints)
        totalPossiblePoints = event.target.getAttribute('tPoints');
        alert(totalPossiblePoints)
        total = parseInt(userPoints) + parseInt(totalPossiblePoints)
        alert(total);
        userUpdate(user_id,total,choreId)
}return ;
}

const userUpdate = async () =>{
    alert("Updating User");
    const id = user_id;
    const points = total;
    const chore = choreId;
    alert('id ' + id);
    alert('points ' + points);
    alert('chore id ' + chore);

    if (id && points && chore) {
        const response = await fetch(`/api/users/${id}`, {
          method: 'POST',
          body: JSON.stringify({ points }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          alert("OK " + chore);
          delButtonHandler(chore);
        } else {
          alert('Failed to create post');
        }
      }return
    };


const newFormHandler = async (event) => {
    event.preventDefault();
    alert("Updating Product")
    const id = document.getElementById('productUpdate').innerHTML
    const product_name = document.querySelector('#product_name').value.trim();
    const price = document.querySelector('#price').value.trim();
    const stock = document.querySelector('#stock').value.trim();
    const category_id = document.querySelector('#category_id').value.trim();
  //   alert(id)
  // alert(product_name)
  // alert(price)
  // alert(stock)
  // alert(category_id)
    if (product_name && price && stock && category_id) {
      const response = await fetch(`/api/userChore/${id}`, {
        method: 'POST',
        body: JSON.stringify({ id, product_name, price, stock, category_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  const delButtonHandler = async (req) => {
      alert("Trying to Delete")
      const id = choreId
      alert("chore " + id)
    if (id) {
      const response = await fetch(`/api/userChore/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/chores');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  document
    .querySelector("#maybeNames")
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.form-group')
    .addEventListener('click', delButtonHandler);

  document
  .addEventListener('click', choreSelected)
  
  
  