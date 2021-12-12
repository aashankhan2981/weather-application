const citydoc = document.querySelector(".city");
const countrydoc = document.querySelector(".country");
const submitbtn = document.querySelector(".submitbtn");
const main = document.querySelector(".main");
const upper = document.querySelector(".upper");
const lower = document.querySelector(".lower");
const getinput = () => {
  const countryInput = countrydoc.value;
  const cityInput = citydoc.value;
  const url = `http://api.weatherstack.com/current?access_key=ef9a31b4a5aa5853b100ffe60821a6ba&query=${countryInput},${cityInput}`;
  getData(url);
};
const getData = async (url) => {
  let {
    data: { current, location },
  } = await axios.get(url);
  // let a = await axios.get(url)
  // console.log(a)
  try {
    let {
      observation_time: obTime,
      temperature,
      weather_icons: weatherIconUrl,
      weather_descriptions: status,
      ...dummy
    } = current;
    let { name: city, country, localtime, ...dummy2 } = location;
    // console.log(obTime,temperature,weatherIconUrl,city,country,localtime)
    setDisplay(temperature, city, country, localtime, weatherIconUrl, status);
  } catch {
    document.querySelector(
      ".upper"
    ).innerHTML = `<h3 class="error">Are you out of your mind</>`;
  }
};
// getData()
const setDisplay = (temperature, city, country, localtime, url, status) => {
  let upperarea = `<div class="upperdynamic" id="temperature">Temperature: ${temperature} C <br></><img src="${url}" alt="weather-icon" class="weather-img"> <p>${status}</></div><div class="upperdynamic" id="city">City: ${city}<br></br>Country: ${country}<br></br>Time: ${localtime}</div>`;
  document.querySelector(".upper").innerHTML = upperarea;
};
submitbtn.addEventListener("click", getinput);
