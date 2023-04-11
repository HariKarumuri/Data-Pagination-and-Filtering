

function showPage(list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9; 
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         let studentItem = `
         <li class="student-item cf">
            <div class="student-details">
            <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
            <span class="date">Posted ${list[i].registered.date}</span>
            <div class="joined-details">
            <span class="email">Contact for More</span>

            </div>
         </li>
         `;
         studentList.insertAdjacentHTML('beforeend', studentItem);
      }
   }
 }


function addPagination(list) {
   const numOfPages = Math.ceil(list.length / 9);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for (let i = 1; i <= numOfPages; i++) {
      let button = `
      <li>
         <button type="button">${i}</button>
      </li>
      `;
      linkList.insertAdjacentHTML('beforeend', button);
   }

   document.querySelector('button').className = 'active';

   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         const active = document.querySelector('.active');
         active.className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);
      }
   });
 }

function addSearchBar() {
   const header = document.querySelector('.header');

   const searchElement = `
      <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label> 
   `;
   
   header.insertAdjacentHTML('beforeend', searchElement);

   const search = document.querySelector('.student-search input');
   const submit = document.querySelector('.student-search button');

   submit.addEventListener('click', (e) => {
      e.preventDefault();
      searchFunc(data);
   });
   
   search.addEventListener('keyup', () => {
      searchFunc(data);
   });
}

function searchFunc(list) {
   const studentList = document.querySelector('.student-list');
   const input = document.querySelector('.student-search input').value.toLowerCase();
   const showStudents = [];
   for (let i = 0; i < list.length; i++) {
      const name = Object.values(list[i].name).join(' ').toLowerCase();
      if ( input !== 0 && name.includes(input)) {
         showStudents.push(list[i]);
         studentList.textContent = '';
         showPage(showStudents, 1);
         addPagination(showStudents);
       }
       if (showStudents.length === 0) {
          studentList.textContent = 'No results found';
          addPagination(showStudents);
       }
   }
}



showPage(data, 1);
addPagination(data);
addSearchBar();