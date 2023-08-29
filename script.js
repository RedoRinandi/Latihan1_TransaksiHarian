let nama = prompt('Masukkan nama anda:');
const user = document.querySelector('h1');

user.innerHTML = 'Helo, ${nama}!';