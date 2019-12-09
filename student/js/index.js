$(document).ready(function(){  
  $("#addCar").hide();
  $("#addManufacturer").hide();
    
});

var list = document.getElementById("main");

function cp() {
  return document.createElement("p");
}


$("#manufacturerNames").click(function () {
  $("#index").hide();
  $("#addCar").hide();
  $("#addManufacturer").hide();
  $("#main").show();
  $.ajax({
    url: "/manufacturerNames", success: function (result) {
      $("#main").html("");
      let cars = document.createElement("div");
      for (manufacturer of result) {
        let card = document.createElement("p");
        card.textContent = manufacturer;
        card.className="listing-card";
        $(card).click(function () {
          document.cookie = "name=" + card.textContent;
          console.log(document.cookie);
          manufacturer_cookie();
        })
        cars.appendChild(card);
      }
      list.appendChild(cars);
    }
  });
});

function manufacturer_cookie() {
  $("#index").hide();
  $("#addCar").hide();
  $("#addManufacturer").hide();
  $("#main").show();
  $.ajax({
    url: "/manufacturer", success: function (result) {
      $("#main").html("");
      for (car of result) {
        car_details(car);
        console.log(car);
      }
    }
  });
}

$("#manufacturers").click(function () {
  $("#index").hide();
  $("#addCar").hide();
  $("#addManufacturer").hide();
  $("#main").show();
  $.ajax({
    url: "/manufacturers", success: function (result) {
      $("#main").html("");
      for (manufacturer of result) {
        manufacturer_details(manufacturer)
      }
    }
  });
});

$("#home").click(function () {
  $("#index").show();
  $("#addCar").hide();
  $("#addManufacturer").hide();
  $("#main").show();
  $.ajax({
    url: "/", success: function (result) {
      $("#main").html("");
    }
  });
});

$("#cars").click(function () {
  $("#index").hide();
  $("#addCar").hide();
  $("#addManufacturer").hide();
  $("#main").show();
  $.ajax({
    url: "/cars", success: function (result) {
      $("#main").html("");
      for (car of result) {
        car_details(car);
        console.log(car);
      }
    }
  });
});

$("#addcar").click(function () {
  $("#index").hide();
  $("#main").hide();
  $("#addManufacturer").hide();
  $("#addCar").show();
  
});

$("#addmanufacturer").click(function () {
  $("#index").hide();
  $("#main").hide();
  $("#addCar").hide();
  $("#addManufacturer").show();
});

function addNewCar(){
    var form = $("#addCar").serializeArray();
    var url = "/addCar";
    $.ajax({
        type: "POST",
        url: url,
        data: form,
        statusCode: {
            409: function() {
                alert("Error: A car is in the DB with the same name.");
            }
        },
        success: function (data) {
            alert("SUCCESS: The car had been added to the DB successfully.");
        }
    });

}

function addNewManufacturer(){
    var form = $("#addManufacturer").serializeArray();
    var url = "/addManufacturers";
    $.ajax({
        type: "POST",
        url: url,
        data: form,
        statusCode: {
            409: function () {
                alert("Error: A manufacturer is in the DB with the same name.");
            }
        },
        success: function (data) {
            alert("SUCCESS: The manufacturer had been added to the DB successfully.");
        }
    });

}



function car_details(car) {
  var card = document.createElement("div");
  card.className += "listing-card";
  var title = document.createElement("h1");
  title.textContent = car.manufacturer + " ";
  title.textContent += car.name;
  var color = cp();
  color.textContent = "Color: " + car.color;
  var y = cp();
  y.textContent = "Year: " + car.year;
  var avail = cp();
  avail.textContent = "Available: " + car.available;
  var cons = cp();
  cons.textContent = "Consumption: " + car.consumption;
  var hp = cp();
  hp.textContent = "Horsepower: " + car.horsepower;
  card.appendChild(title);
  card.appendChild(color);
  card.appendChild(y);
  card.appendChild(avail);
  card.appendChild(cons);
  card.appendChild(hp);
  list.appendChild(card);
}

function manufacturer_names(manufacturer) {
  var card = document.createElement("p");
  card.textContent = manufacturer;
  return card;
}

function manufacturer_details(manufacturer) {
  var card = document.createElement("div");
  card.className = "listing-card";
  var name = document.createElement("h1");
  name.textContent = manufacturer.name;
  var country = cp();
  country.textContent = "Country: " + manufacturer.country;
  var founded = cp();
  founded.textContent = "Founded: " + manufacturer.founded;
  card.appendChild(name);
  card.appendChild(country);
  card.appendChild(founded);
  list.appendChild(card);
}



function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}