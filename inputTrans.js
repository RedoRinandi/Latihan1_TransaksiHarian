// Untuk mengambil data dari inputan web.
const element = document.querySelector("#formtransaksi");
element.addEventListener("submit", (event) => {
  event.preventDefault();
  const tgl = document.getElementById("tanggal").value;
  const ket = document.getElementById("keterangan").value;
  const jml = document.getElementById("jumlah").value;

  // Sebelum memasukkan data ke LS kita masukkan dulu dalam bentuk array object agar rapih
  const arrData =[{tgl, ket, jml}];
  
  // setelah itu kita format datanya dengan stringify, karena di dalam LS tidak bisa menerima data berbentuk object
  const dataString = JSON.stringify(arrData);
  
  // Ini kondisi untuk insert ke LS, jika LS masih kosong maka insert ke LS
  if(localStorage.getItem('data') == null) {
    localStorage.setItem('data', dataString);
  } else {

    // konsep penyimpanan di LS itu sistemnya penumpukan bukan penambahan, jadi klo sudah ada data lalu di input data lain maka data pertama akan tertumpuk oleh data ke dua
    // untuk itu kita perlu get dulu data yang ada di LS, masukkan ke dalam variable baru.
    const data = localStorage.getItem('data');
    // console.log(data);

    //setelah kita get kita parse lg data yg tadi bentuknya string menjadi objek, sama juga kita bikin variable baru
    const parsedData = JSON.parse(data);
    
    // setelah itu kita ambil data yang baru di input tadi untuk di masukkan kedalam array
    const dataTemp = {tgl, ket, jml};

    // setelah itu kita push data untuk dimasukkan, nah kita pakai variable parsedData tadi karena datanya sudah diparse ke dalam object
    parsedData.push(dataTemp);

    // setelah itu kita save ulang ke dalam LS, dan jgn lupa untuk parse lg ke string kumpulan data saat di save ke LS.
    localStorage.setItem('data', JSON.stringify(parsedData))
    console.log(localStorage.getItem('data'));
  }

  document.getElementById("formtransaksi").reset();
});







