import { useEffect, useState } from "react";
import { Box, Image, VStack, HStack, Text } from "@chakra-ui/react";

import "../App.css";

function Wheather() {
  const [status, setStatus] = useState("");
  const [showMessage, setShowMessage] = useState(true);
  const [wheatherData, setWheatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating…");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  function getWheatherData(latitude, longitude) {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=9ee2d6a713ab47ddb18195351233001&q=${latitude},${longitude}&lang=ro&days=5`
    )
      .then((res) => res.json())
      .then((response) => {
        setWheatherData(response);
        setForecastData(response.forecast.forecastday);
      })
      .catch((err) => console.log(err));
  }

  function error() {
    setStatus("Unable to retrieve your location");
  }

  function success(position) {
    setShowMessage(false);
    getWheatherData(position.coords.latitude, position.coords.longitude);
  }

  return (
    <>
      <Box>
        <VStack color={"black"}>
          <VStack rounded="md" bg="white" pb={"5px"}>
            <HStack>
              <Text>
                {wheatherData.location?.region},{wheatherData.location?.country}
              </Text>
            </HStack>
          </VStack>
          <VStack rounded="md" bg="white" pb={"5px"}>
            <HStack>
              <VStack>
                <Text>Temperatura: {wheatherData.current?.temp_c}°C</Text>
                <Text>
                  {" "}
                  Temperatura resimtita: {wheatherData.current?.feelslike_c}°C
                </Text>
              </VStack>
              <Image src={wheatherData.current?.condition.icon}></Image>
            </HStack>
            <Text>Viteza vantului: {wheatherData.current?.wind_kph}/kph</Text>
            <Text>
              Presiunea atmosferica: {wheatherData.current?.pressure_mb}/mb
            </Text>
            <Text>Precipitatii: {wheatherData.current?.precip_mm}/mm</Text>
            <Text>Umiditate: {wheatherData.current?.humidity}%</Text>
          </VStack>
          <HStack rounded="md" bg="white" pb={"5px"}>
            {forecastData.map((el, index) => (
              <VStack rounded="md" bg="white" pb={"5px"} key={index}>
                <Text>{el.date}</Text>
                <HStack>
                  <VStack>
                    <Text>Min. : {el.day.mintemp_c}°C</Text>
                    <Text>Max. : {el.day.maxtemp_c}°C</Text>
                  </VStack>
                  <Image src={el.day?.condition.icon}></Image>
                </HStack>
                <VStack>
                  <Text>Rasarit: {el.astro.sunrise}</Text>
                  <Text>Apus: {el.astro.sunset}</Text>
                </VStack>
              </VStack>
            ))}
          </HStack>
        </VStack>
      </Box>
      {showMessage && (
        <Box rounded="md" bg="white" pb={"5px"}>
          <Text color={"black"}>{status}</Text>
        </Box>
      )}
    </>
  );
}

export default Wheather;
