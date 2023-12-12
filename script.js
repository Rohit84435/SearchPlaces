let firstLink;
let nextLink;
let lastLink;


  document.getElementById('searchTerm').addEventListener('input', function() {
      if (document.getElementById('searchTerm').value.trim() === '') {
          document.getElementById('searchBtn').disabled = true;
      } else {
          document.getElementById('searchBtn').disabled = false;
      }
  });


  document.addEventListener('keydown', function (event) {
      if ((event.ctrlKey||event.metaKey) && event.key === '/') {
          document.getElementById("searchTerm").focus();
          event.preventDefault();
      }
  });

document.getElementById("searchTerm").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      searchPlaces();
    }
  });

function clearTable(){
  document.getElementById("responseData").innerHTML = "";
}

function searchPlaces() {
  const searchQuery = document.getElementById("searchTerm").value;

  if (searchQuery == ''){
      document.getElementById("responseData").innerHTML = "Please enter something" ;
      return 0 ;
  }

  const limit = document.getElementById("limit").value;

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        clearTable() ;
        const responseDiv = document.getElementById("responseData");
        responseDiv.appendChild(generateTable(response.data));

        firstLink = response.links[0].href;
        nextLink = response.links[1].href;
        lastLink = response.links[2].href;
      } else {
        console.error("Error:", xhr.statusText);
      }
    }
  };

  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?&namePrefix=${searchQuery}&limit=${limit}`;
  xhr.open("GET", url, true);
  xhr.setRequestHeader("x-rapidapi-host", "wft-geo-db.p.rapidapi.com");
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "4d87729a07msh6b6acfcb8506b57p1f45adjsn3a7a3e979c66"
  ); // Replace with your actual API key
  xhr.send();
}

function generateTable(data) {
  if (data.length == 0) {
      console.log("No result") ;
      const noResult = document.createElement("div");
      noResult.innerHTML = "No Result Found" ;
      return noResult ;
  }
  else {
      console.log("Result found") ;
  }

  // Keys to exclude from the table
  const excludedKeys = [
    "id",
    "wikiDataId",
    "regionWdId",
    "population",
    "distance",
    "placeType",
    "latitude",
    "longitude",
    "countryCode",
    "regionCode"          
  ];

  // Create a table element
  const table = document.createElement("table");
  table.border = "1";

  // Create a header row excluding specified keys
  const headerRow = table.insertRow();
  const serialNumberHeader = document.createElement("th");
  serialNumberHeader.textContent = "S.No";
  headerRow.appendChild(serialNumberHeader);

  Object.keys(data[0]).forEach((key) => {
    if (!excludedKeys.includes(key)) {
      const th = document.createElement("th");
      th.textContent = key;
      headerRow.appendChild(th);
    }
  });

  // Create rows for each city excluding specified keys and add a serial number
  data.forEach((city, index) => {
    const row = table.insertRow();
    const serialNumberCell = row.insertCell();
    serialNumberCell.textContent = index + 1;

    Object.entries(city).forEach(([key, value]) => {
      if (!excludedKeys.includes(key)) {
        const cell = row.insertCell();
        cell.textContent = value;
      }
    });
  });

  return table;
}

function firstl() {
  console.log("FIRST " + firstLink);
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);

        clearTable() ;

        const responseDiv = document.getElementById("responseData");

        responseDiv.appendChild(generateTable(response.data));

        firstLink = response.links[0].href;
        nextLink = response.links[1].href;
        lastLink = response.links[2].href;
      } else {
        console.error("Error:", xhr.statusText);
      }
    }
  };

  const url = `https://wft-geo-db.p.rapidapi.com${firstLink}`;
  xhr.open("GET", url, true);
  xhr.setRequestHeader("x-rapidapi-host", "wft-geo-db.p.rapidapi.com");
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "4d87729a07msh6b6acfcb8506b57p1f45adjsn3a7a3e979c66"
  ); // Replace with your actual API key
  xhr.send();
}

function last() {
  console.log("LAST " + lastLink);
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);

        clearTable() ;

        const responseDiv = document.getElementById("responseData");

        responseDiv.appendChild(generateTable(response.data));

        firstLink = response.links[0].href;
        nextLink = response.links[1].href;
        lastLink = response.links[2].href;
      } else {
        console.error("Error:", xhr.statusText);
      }
    }
  };

  const url = `https://wft-geo-db.p.rapidapi.com${lastLink}`;
  xhr.open("GET", url, true);
  xhr.setRequestHeader("x-rapidapi-host", "wft-geo-db.p.rapidapi.com");
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "4d87729a07msh6b6acfcb8506b57p1f45adjsn3a7a3e979c66"
  ); // Replace with your actual API key
  xhr.send();
}

function next() {
  console.log("NEXT " + nextLink);
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);

        clearTable() ;

        const responseDiv = document.getElementById("responseData");

        responseDiv.appendChild(generateTable(response.data));

        firstLink = response.links[0].href;
        nextLink = response.links[1].href;
        lastLink = response.links[2].href;
      } else {
        console.error("Error:", xhr.statusText);
      }
    }
  };

  const url = `https://wft-geo-db.p.rapidapi.com${nextLink}`;
  xhr.open("GET", url, true);
  xhr.setRequestHeader("x-rapidapi-host", "wft-geo-db.p.rapidapi.com");
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "4d87729a07msh6b6acfcb8506b57p1f45adjsn3a7a3e979c66"
  ); // Replace with your actual API key
  xhr.send();
}