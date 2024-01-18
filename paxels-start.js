const loadButton = document.getElementById("load");
const secondaryButton = document.getElementById("secondary-load");
const img = document.getElementsByTagName("img");
const editButton = document.getElementsByClassName("edit");
const mins = document.getElementsByTagName("small");
const form = document.getElementsByTagName("form")[0];
const searchInput = document.getElementById("search");
const searchWord = searchInput.value;

const arrayUrl = [];

// const minsFunction = function (id, i) {
//   for (let b = 0; b < mins.length; b++) {
//     // mins[i].innerText = "";
//     mins[i].innerText = id;
//   }
// };

const editFunction = function () {
  for (let i = 0; i < editButton.length; i++) {
    editButton[i].innerText = "";
    editButton[i].innerText = "Hide";
    editButton[i].addEventListener("click", function () {
      editButton[i].closest(".card").classList.add("d-none");
    });
  }
};
const imageFunction = function () {
  fetch("https://api.pexels.com/v1/search?query=people", {
    headers: {
      Authorization: "6BORDz3GGhLXzsbPaxMp1NlB9qmS1FVBRps91cA96sJcg89cLIRJVOhf",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        console.log("qualcosa è andato storto");
        throw new Error();
      }
    })
    .then((data) => {
      console.log(data.photos);
      const arrayImg = data.photos;

      loadButton.addEventListener("click", function () {
        arrayImg.forEach((element, i) => {
          const src = element.src.original;
          img[i].setAttribute("src", element.src.original);
          //   minsFunction(element.id, i);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

secondaryButton.addEventListener("click", function () {
  fetch("https://api.pexels.com/v1/search?query=Ocean", {
    headers: {
      Authorization: "6BORDz3GGhLXzsbPaxMp1NlB9qmS1FVBRps91cA96sJcg89cLIRJVOhf",
    },
  })
    .then((secondResponse) => {
      //   secondResponse.json();
      if (secondResponse.ok) {
        return secondResponse.json();
      } else {
        throw new Error("qualcosa è andato storto nella seconda chiamata");
      }
    })
    .then((secondData) => {
      const secondAlbum = secondData.photos;
      secondAlbum.forEach((secondElements, i) => {
        img[i].setAttribute("src", secondElements.src.original);
        // minsFunction(secondElements.id, i);
      });
    })
    .catch((errore) => {
      console.log("errore nella seconda chimata", errore);
    });
});
editFunction();
imageFunction();
