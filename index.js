const lista = document.getElementById("lista");
let resultados = []; //aqui se renderiza las imagenes
const showMsg = (msg) => {
  //esta funcion muesta los toast depediendo del estado si es success == true o false
  $("body").toast({
    class: msg.success ? "success" : "error",
    message: msg.message,
  });
};

const getImages = async () => {
  //actualiza la lista de imagenes
  const res = await fetch("list.php");
  const response = await res.json();
  resultados = response;
  lista.innerHTML = "";

  response.map(
    (url, index) =>
      (lista.innerHTML += `
      <div class="col-lg-4 mb-4 mb-lg-0" >
      <figure class="mt-2 d-inline">
      <img class="w-100 shadow-1-strong rounded mb-4 imagenes" onclick="deleteImg(${index})" src="${url}" alt="${url.substr(
      Array.from(url).indexOf("_")
    )}"  />
<figcaption>${url.substr(Array.from(url).indexOf("_"))}</figcaption>
</figure>
      </div>
       
  `)
  );
};

const deleteImg = (index) => {
  const datos = new FormData();
  datos.append("img", resultados[index]);
  axios.post("delete.php", datos).then((res) => {
    showMsg(res.data);
    getImages();
  });
};

window.addEventListener("load", function () {
  getImages();
  const form = document.querySelector("#formulario");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const files = form.querySelector('[type="file"]').files;
    const promises = [];

    for (let file of files) {
      promises.push(
        new Promise(function (resolve, reject) {
          new Compressor(file, {
            quality: 0.6,
            success(result) {
              resolve(result);
            },
            error(err) {
              console.log(err.message);
              reject();
            },
          });
        })
      );
    }
    promises.map(async (photo) => {
      //recorrer las promesas y filtrar las que no sean jpg despues enviarlas al php por axios, tambien se puedo usar fetch o xmlHttpRquest
      let img = await photo;
      if (img.type === "image/jpeg") {
        const formData = new FormData();
        formData.append("file", img, img.name);
        axios
          .post("files-handler.php", formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.data);
            showMsg(res.data);
            getImages();
          });
      } else {
        console.log("no se puede enviar");
      }
    });
  });
});
