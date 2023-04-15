// listen for submit events
document.querySelector("#zipForm").addEventListener("submit", getLocationInfo);
// listen for delete
document.querySelector("body").addEventListener("click", deleteZip);

function getLocationInfo(e) {
  e.preventDefault();
  // get zip value from input field
  let zip = document.querySelector(".zip").value;

  // console.log(zip)

  // Using FetchAPI to get the zipApi from Zippopotamus API
  fetch(`http://api.zippopotam.us/us/${zip}`)
    .then(function (response) {
      if (response.status !== 200) {
        showIcon("remove");
        document.querySelector("#output").innerHTML = `
            <article class="message message-body is-danger">Invalid Zipcode, please try again</article>
            `;
        throw Error(response.statusText);
      } else {
        showIcon("check");
        return response.json();
      }
    })
    .then(function (response) {
      //
      let output = "";
      // Loop through the places provided
      response.places.forEach(function (place) {
        output += `
        <article class="message is-primary">
        <div class="message-header">
        <p>Location Info</p>
        <button class="delete"></button>
        </div>
        <div class="message-body">
        <ul>
            <li><strong>City:</strong>${place["place name"]}</li>
            <li><strong>State:</strong>${place["state"]}</li>
            <li><strong>Longitude:</strong>${place["longitude"]}</li>
            <li><strong>Latitude:</strong>${place[" latitude"]}</li>
        </ul>
        </div>
        </article>
        `;
        document.getElementById("output").innerHTML = output;
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
// show check or remove icon
function showIcon(icon) {
  document.querySelector(".icon-remove").style.display = "none";
  document.querySelector(".icon-check").style.display = "none";
  // show correct icon
  document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}

// Delete location
function deleteZip(e) {
  if (e.target.getElementsByClassName == "delete") {
    document.querySelector(".message").remove();
    document.querySelector(".zip").value = "";
    document.querySelector(".icon-check").style.display = "none";
  }
}
