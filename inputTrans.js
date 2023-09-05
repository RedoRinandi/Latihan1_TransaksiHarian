// Untuk mengambil data dari inputan web.
const element = document.querySelector("#formtransaksi");
element.addEventListener("submit", (event) => {
  event.preventDefault();
  const tgl = document.getElementById("tanggal").value;
  const ket = document.getElementById("keterangan").value;
  const jml = document.getElementById("jumlah").value;

  // karena di akhir harus dibuat fungsi untuk convert nilai jumalah (tampilannya saja)
  // memakai numeral js juga
  let nilaiAsli = numeral(jml).value();

  // Sebelum memasukkan data ke LS kita masukkan dulu dalam bentuk array object agar rapih
  // karena ada convert nilai jml di akhir maka data array nya jd di buat begini, agar nilai yang tersimpan di LS nya tetap jml bukan nilaiAsli.
  // jd kita buat object dengan tipe begini, agar menandakan bahwa si nilaiAsli adalah bagian dari jml
  const arrData = [{ tgl: tgl, ket: ket, jml: nilaiAsli }];

  // setelah itu kita format datanya dengan stringify, karena di dalam LS tidak bisa menerima data berbentuk object
  const dataString = JSON.stringify(arrData);

  // Ini kondisi untuk insert ke LS, jika LS masih kosong maka insert ke LS
  if (localStorage.getItem("data") == null) {
    localStorage.setItem("data", dataString);
  } else {
    // konsep penyimpanan di LS itu sistemnya penumpukan bukan penambahan, jadi klo sudah ada data lalu di input data lain maka data pertama akan tertumpuk oleh data ke dua
    // untuk itu kita perlu get dulu data yang ada di LS, masukkan ke dalam variable baru.
    const data = localStorage.getItem("data");
    // console.log(data);

    //setelah kita get kita parse lg data yg tadi bentuknya string menjadi objek, sama juga kita bikin variable baru
    const parsedData = JSON.parse(data);
    // console.log(parsedData[3].jml);

    // setelah itu kita ambil data yang baru di input tadi untuk di masukkan kedalam array
    const dataTemp = { tgl: tgl, ket: ket, jml: nilaiAsli };

    // setelah itu kita push data untuk dimasukkan, nah kita pakai variable parsedData tadi karena datanya sudah diparse ke dalam object
    parsedData.push(dataTemp);

    // setelah itu kita save ulang ke dalam LS, dan jgn lupa untuk parse lg ke string kumpulan data saat di save ke LS.
    localStorage.setItem("data", JSON.stringify(parsedData));

    alert("Input transaksi berhasil.");
  }

  document.getElementById("formtransaksi").reset();
});

// fungsi untuk membuat format ketika user menginput jumlah agar ada komanya
function formatNumeral(e) {
  e.value = e.value ? numeral(e.value).format("0,0") : "";

  // untuk mendapatkan nilai asli
  // bagian ini bebas mau diimplemen dimana
  // let nilaiAsli = numeral(e.value).value();
  // console.log(nilaiAsli);
}

// ======== CATATAN =========
// Mengapa dara jml yg tersimpan di LS harus 1000 bukan 1,000
// tujuannya agar kita mudah saat hendak mentotal semua jumlah nilainya
// jd kita gunakan fungsi numeral di halamanaAwal & laporanTrans agar angkanya jd berbentuk 1,000
