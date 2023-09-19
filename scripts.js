// const today = async () => {
//   let date = new Date();
//   // let currentDay= String(date.getDate()).padStart(2, '0');
//   // let currentMonth = String(date.getMonth()+1).padStart(2,"0");
//   // let currentYear = date.getFullYear();
//   // let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

//   return date.format('DD-MM-YYYY')
// }


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postPet = async (newName, newBirthday, newType, newGender, newBreed, newWeigth, newMicrochip) => {
  const formData = new FormData();
  formData.append('name', newName);
  formData.append('birthday', newBirthday);
  formData.append('type', newType);
  formData.append('gender', newGender);
  formData.append('breed', newBreed);
  formData.append('weight', newWeigth);
  formData.append('microchip', newMicrochip);
 
  let url = 'http://127.0.0.1:5000/pet';

  fetch(url, {
    method: 'post',
    body: formData
  })
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });
}


/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getPet = async () => {
  let url = 'http://127.0.0.1:5000/pets';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.pets.forEach(item => insertPetOnList(pet.name, pet.birthday, pet.type, pet.gender, pet.breed, pet.weigth, pet.microchip))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para deletar um pet da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (petName) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/pet?name=' + petName;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  ----------------------------------------------------------------------------------------------------------------------
  Função para adicionar um novo pet com nome, data de nascimento, sexo do animal, tipo do animal, raça, peso e microchip 
  ----------------------------------------------------------------------------------------------------------------------
*/
const newPet = () => {
  let newName = document.getElementById("newName").value;
  let newBirthday = document.getElementById("newBirthday").value;
  let newType = document.getElementById("newType").value;
  let newGender = document.getElementById("newGender").value;
  let newBreed = document.getElementById("newBreed").value;
  let newWeigth = document.getElementById("newWeigth").value;
  let newMicrochip = document.getElementById("newMicrochip").value;

  if (newName === '') {
    alert("Escreva o nome de um pet!");
  } else if (isNaN(newWeigth) || isNaN(newMicrochip)) {
    alert("Peso e microchip precisam ser números!");
  } else {
    postPet(newName, newBirthday, newType, newGender, newBreed, newWeigth, newMicrochip)
    insertPetOnList(newName, newBirthday, newType, newGender, newBreed, newWeigth, newMicrochip)
    alert("Pet adicionado!")
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada pet da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um pet da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  var table = document.getElementById('tab_pet_body');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const petName = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza que deseja excluir este pet?")) {
        div.remove()
        deleteItem(petName)
        alert("Pet Removido!")
      }
    }
  }
}


const formatDate = (value) => {
  let data = new Date(value)
  // let dataFormatada = ((data.getDate() + "/" + meses[(data.getMonth())] + "/" + data.getFullYear()))

  // console.log(dataFormatada)
  return data.toLocaleDateString("pt-BR")

}

/*
  --------------------------------------------------------------------------------------
  Função para inserir pets na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertPetOnList = (name, birthday, type, gender, breed, weigth, microchip) => {
  var item = [name, formatDate(birthday), type, gender, breed, weigth, microchip]
  var table = document.getElementById('tab_pet_body');

  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newName").value = "";
  document.getElementById("newBirthday").value = "";
  document.getElementById("newType").value = "";
  document.getElementById("newGender").value = "";
  document.getElementById("newBreed").value = "";
  document.getElementById("newWeigth").value = "";
  document.getElementById("newMicrochip").value = "";

  removeElement()
}


/*
--------------------------------------------------------------------------------------
Função para carregamento inicial dos dados existentes 
--------------------------------------------------------------------------------------
*/
const getPets = async () => {
let url = 'http://127.0.0.1:5000/pets';
fetch(url, {
  method: 'get',
})
  .then((response) => response.json())
  .then((data) => {
    data.pets.forEach(pet => insertPetOnList(pet.name, pet.birthday, pet.type, pet.gender, pet.breed, pet.weigth, pet.microchip))
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


getPets()