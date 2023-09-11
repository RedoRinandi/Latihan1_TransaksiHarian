// Untuk mengisi nama pada user profile.
const user = document.getElementById("userProfile");
let nama = localStorage.getItem("nama");

if (!nama) {
  nama = prompt("Masukkan nama anda:");
  localStorage.setItem("nama", nama);
}
user.innerHTML = nama + "!";

// untuk mengisi transaksi terkini
// ambil data dulu dari local storage
const data = localStorage.getItem("data");
// parse data dalam bentuk array/obj
const parsedData = JSON.parse(data);
// Untuk ini sebenarnya bisa dikerjakan di akhir.
// ini untuk keperluan transaksi hari ini di halaman awal
// jadi pada transaksi hari ini yang akan muncul hanya tanggal hari ini saja
// jadi kita bisa menggunakan 'filter', tetapi fungsi filter hanya bisa digunakan di data array saja.
// jadi yang di filter yaitu parsedData.
// Mengambil tanggal saat ini dalam format YYYY-MM-DD
const tanggalHariIni = new Date().toISOString().slice(0, 10);

const transaksiHariIni = parsedData.filter(
  (item) => item.tgl === tanggalHariIni
);
console.log(transaksiHariIni);

// buat variable untuk menampung data string
let stringData = "";

stringData = `<div class="mainDesc">
<h3>Transaksi terkini</h3>
<a href="laporanTrans.html">Lihat semua</a>
</div>`;

if (transaksiHariIni.length == 0) {
  htmlData = `<div class="tidakAdaTransaksi">
        <svg
          data-icon-name="present-close"
          data-style="line"
          icon_origin_id="17466"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          id="present-close"
          class="icon line"
          width="80"
          height="80"
        >
          <path
            style="
              fill: none;
              stroke: rgb(255, 255, 255);
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: 1;
            "
            d="M19,17H5a1,1,0,0,1-1-1V4H20V16A1,1,0,0,1,19,17ZM3,4H21M10.4,17,8,20m5.6-3L16,20"
            id="primary"
          ></path>
          <line
            style="
              fill: none;
              stroke: rgb(255, 255, 255);
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: 1;
            "
            y2="8"
            x2="14.5"
            y1="13"
            x1="9.5"
            data-name="primary"
            id="primary-2"
          ></line>
          <line
            style="
              fill: none;
              stroke: rgb(255, 255, 255);
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: 1;
            "
            y2="8"
            x2="9.5"
            y1="13"
            x1="14.5"
            data-name="primary"
            id="primary-3"
          ></line>
        </svg>
        <h4>Tidak ada transaksi</h4>
      </div>`;

  stringData += htmlData;
} else {
  // buat looping data di array, pakai forEach
  transaksiHariIni.forEach((item) => {
    // buat format angka di transaksi terkini.
    // memakai numeraljs (library)
    // jgn lupa klo mau pake numeraljs tambahkan jg scriptnya di file html
    // ini berfunsi untuk memformat jml yang ada di LS misal dari 1000 jd 1,000
    const jmlDiformat = numeral(item.jml).format("0,0");

    // buat html pakai template literal
    let htmlData = `<div id="mainContent1" class="mainContent1">
          <div class="borderIcon">
            <div id="icon" class="icon">
              <svg
                data-icon-name="debit-purchase-left"
                data-style="line"
                icon_origin_id="18778"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Line Color"
                id="debit-purchase-left"
                class="icon line"
                width="30"
                height="30"
              >
                <path
                  style="
                    fill: none;
                    stroke: rgb(255, 255, 255);
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 1;
                  "
                  d="M7.45,14.5h.1m1.9,0h.1"
                  id="secondary-upstroke"
                ></path>
                <line
                  style="
                    fill: none;
                    stroke: rgb(255, 255, 255);
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 1;
                  "
                  y2="9"
                  x2="3"
                  y1="9"
                  x1="21"
                  id="secondary"
                ></line>
                <rect
                  style="
                    fill: none;
                    stroke: rgb(255, 255, 255);
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 1;
                  "
                  transform="translate(24 24) rotate(180)"
                  rx="1"
                  height="14"
                  width="18"
                  y="5"
                  x="3"
                  id="primary"
                ></rect>
              </svg>
            </div>
          </div>
          <div id="ket" class="ket">${item.ket}</div>
          <div id="tanggal" class="tanggal">${formatDateToIndonesian(
            item.tgl
          )}</div>
          <div id="jumlah" class="jumlah">${"Rp. " + jmlDiformat}</div>
        </div>`;

    // masukkan html ke data penampung
    stringData += htmlData;
  });
}

// Function format untuk menjadi rupiah
// fungsinya dipanggil tp lgsg masuk ke looping
// function formatToIDR(number) {
//   // Use the toLocaleString() function to format the number
//   return Number(number).toLocaleString("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0, // No decimal places
//   });
// }

// function untuk merubah format tanggal menjadi '21 juni 2023'
// fungsinya dipanggil tp lgsg masuk ke looping
function formatDateToIndonesian(dateString) {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dateParts = dateString.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // JavaScript months are 0-indexed
  const day = parseInt(dateParts[2]);

  const formattedDate = `${day} ${months[month]} ${year}`;
  return formattedDate;
}

// ambil element html yang mau di manipulasi
const mainContent1 = document.getElementById("mainContent");
// mengapa get elemen by id nya 'mainContent'?, karena tidak bisa memanggil mainContent1.
// klo memanggil mainContent1 hasil looping nya akan menumpuk, dan ketentuannya yang harus dipanggil adalah kepalanya dari mainContent1
// kepala dari 'mainContent1' yaitu 'mainContent', karena dia berada di dalam div dari mainContent.
// nah jd yang ada di dalam div mainContent akan termanipulasi semua.
// karena kita tujuannya hanya memanipulasi yang ada di dalam div mainContent1, oleh karena itu kita jg harus menambahkan elemen div 'mainDesc' karena ia berada di dalam div dari mainContent.
// tetapi kita tidak menambahkan div mainDesc di dalam looping karena klo di dalam nanti ikut terlooping juga.
// sehingga di taro diluar looping, dimasukkan ke elemen penampung juga yaitu stringData.
// console.log(mainContent1);

// isi innerHtml nya
mainContent1.innerHTML = stringData;
