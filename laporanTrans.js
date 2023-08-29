// kita ambil dulu fungsi onclick pada button submit pada HTML
function tampilkanTrans() {
  // pertama kita ambil dulu data tanggal yang dipilih.
  const tanggal = document.getElementById("tanggal").value;
  // console.log(tanggal);

  // setelah itu kita ambil data dari local storage sesuai tanggal yang di pilih.
  const data = localStorage.getItem("data");

  // ubah data ke bentuk array / obj
  const parsedData = JSON.parse(data);

  // filter data yang sesuai dengan tanggal di pilih
  const pilihTanggal = parsedData.filter((item) => item.tgl === tanggal);
  // buat variable untuk tampung data string
  let stringData = "";

  stringData = `<h2>Laporan Transaksi</h2>
      <div class="main">
        <div class="pilihTanggal">
          <label for="#">Masukkan tanggal</label>
          <input class="kolomInput" id="tanggal" type="date" />
        </div>
        <div>
          <button type="submit" onclick="tampilkanTrans()">Pilih</button>
        </div>
      </div>`;

  // ini kondisi untuk jika memlih tanggal yang belum ada transaksi
  // caranya cek dulu data apa yang di dapat / tipe datanya bagaimana ketika kita memilih tanggal yang blm ada transaksi.
  // setelah di cek tipe data yang di dapat jika blm ada transaksi yaitu '[] / length : 0'
  // untuk membuat kondisinya bukan berarti if (pilihTanggal == []), tapi seperti yang di bawah ini.
  if (pilihTanggal.length == 0) {
    // alert("Tidak ada transaksi pada tanggal " + tanggal + ".");
    htmlData = `<center><div>
      <span>Tidak ada transaksi pada tanggal ${formatDateToIndonesian(
        tanggal
      )}.</span>
    </div></center>`;
    stringData += htmlData;
  } else {
    // buat looping data yang sudah di parse
    pilihTanggal.forEach((item) => {
      let htmlData = `<div class="mainContent">
    <div class="borderIcon">
        <div class="icon">
        <svg
            data-icon-name="sign-out-2"
            data-style="line"
            icon_origin_id="12090"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            id="sign-out-2"
            class="icon line"
            width="30"
            height="30"
        >
            <polyline
            style="
                fill: none;
                stroke: rgb(255, 255, 255);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 1;
            "
            points="18 9 21 12 18 15"
            id="primary"
            ></polyline>
            <path
            style="
                fill: none;
                stroke: rgb(255, 255, 255);
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 1;
            "
            d="M21,12H7m7,4v3a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V5A1,1,0,0,1,4,4h9a1,1,0,0,1,1,1V8"
            data-name="primary"
            id="primary-2"
            ></path>
        </svg>
        </div>
    </div>
    <div class="judul">${item.ket}</div>
    <div class="tanggal">${formatDateToIndonesian(item.tgl)}</div>
    <div class="jumlah">${formatToIDR(item.jml)}</div>
    </div>`;
      stringData += htmlData;
    });
  }

  // Function format untuk menjadi rupiah
  // fungsinya dipanggil tp lgsg masuk ke looping
  function formatToIDR(number) {
    // Use the toLocaleString() function to format the number
    return Number(number).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0, // No decimal places
    });
  }

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

  const mainContent = document.getElementById("container");

  mainContent.innerHTML = stringData;
}
