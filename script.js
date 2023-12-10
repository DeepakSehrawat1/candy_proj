var form = document.getElementById("form_group");

form.addEventListener("submit", addelement);

window.addEventListener("DOMContentLoaded", function () {
  axios
    .get("https://crudcrud.com/api/8da56eb5f64744ccb534a74601713e98/candy")
    .then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        console.log(res.data[i]);
        showele(res.data[i]);
      }
    })
    .catch((ele) => console.log("error"));
});

function addelement(e) {
  e.preventDefault();
  var item1 = document.getElementById("amount").value;
  var item2 = document.getElementById("job").value;
  var item3 = document.getElementById("category").value;
  var item4 = document.getElementById("quantity").value;

  let myobj = {
    price: item1,
    description: item2,
    name: item3,
    quantity: item4,
  };

  axios
    .post(
      "https://crudcrud.com/api/8da56eb5f64744ccb534a74601713e98/candy",
      myobj
    )
    .then((res) => showele(myobj))
    .catch((err) => console.log(err));

  document.getElementById("amount").value = " ";
  document.getElementById("job").value = " ";
  document.getElementById("category").value = " ";
  document.getElementById("quantity").value = " ";
}

function showele(obj) {
  var items = document.getElementById("items");

  //creating li
  var newitem = document.createElement("li");

  //attaching to li
  newitem.appendChild(document.createTextNode(obj.price));
  newitem.appendChild(document.createTextNode(obj.description));
  newitem.appendChild(document.createTextNode(obj.name));
  newitem.appendChild(document.createTextNode(obj.quantity));

  //creating buy1 btn
  var buy1 = document.createElement("button");
  buy1.id = "buy1";
  buy1.appendChild(document.createTextNode("BUY 1"));
  newitem.appendChild(buy1);

  //creating buy2 btn
  var buy2 = document.createElement("button");
  buy2.id = "buy2";
  buy2.appendChild(document.createTextNode("Buy 2"));
  newitem.appendChild(buy2);

  //creating buy3 btn
  var buy3 = document.createElement("button");
  buy3.id = "buy3";
  buy3.appendChild(document.createTextNode("Buy 3"));
  newitem.appendChild(buy3);

  items.appendChild(newitem);

  buy1.addEventListener("click", function (e) {
    e.preventDefault();
    var count = obj.quantity - 1;
    console.log(count);

    if (count < 0) {
      alert("stock finished");
      exit();
    }

    let updated1 = {
      price: obj.price,
      description: obj.description,
      name: obj.name,
      quantity: count,
    };
    axios
      .put(
        "https://crudcrud.com/api/8da56eb5f64744ccb534a74601713e98/candy/" +
          obj._id,
        updated1
      )
      .then((res) => {
        console.log("updated");
      })
      .catch((err) => console.log(err));
  });

  buy2.addEventListener("click", function (e) {
    e.preventDefault();
    var count2 = obj.quantity - 2;
    console.log(count2);

    if (count2 < 0) {
      alert("stock finished");
      exit();
    }

    let updated2 = {
      price: obj.price,
      description: obj.description,
      name: obj.name,
      quantity: count2,
    };
    axios
      .put(
        "https://crudcrud.com/api/8da56eb5f64744ccb534a74601713e98/candy/" +
          obj._id,
        updated2
      )
      .then((res) => {
        console.log("updated");
      })
      .catch((err) => console.log(err));
  });

  buy3.addEventListener("click", function (e) {
    e.preventDefault();
    var count3 = obj.quantity - 3;
    console.log(count3);

    if (count3 < 0) {
      alert("stock finished");
      exit();
    }

    let updated3 = {
      price: obj.price,
      description: obj.description,
      name: obj.name,
      quantity: count3,
    };
    axios
      .put(
        "https://crudcrud.com/api/8da56eb5f64744ccb534a74601713e98/candy/" +
          obj._id,
        updated3
      )
      .then((res) => {
        console.log("updated");
      })
      .catch((err) => console.log(err));
  });
}
