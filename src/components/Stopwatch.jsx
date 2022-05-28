import { Button, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Stopwatch = () => {
  const [timerId, setTimerId] = useState(null);
  const [watch, setWatch] = useState(0);


  function msToTime(duration) {
    var milliseconds = parseInt(duration % 1000),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milliseconds = milliseconds < 1 ? "00" + milliseconds : milliseconds;

    return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
  }

  useEffect(() => {
    return () => {
      //unmounting
    };
  }, [timerId, watch]);
  const start = () => {
    if (!timerId) {
      let id = setInterval(() => {
        setWatch((prev) => prev + 100);
      }, 100);
      setTimerId(id);
    }
  };
  const stop = () => {
    clearInterval(timerId);
    setTimerId(null);
  };
  const restart = () => {
    clearInterval(timerId);
    setWatch(0);
    setTimerId(null);
  };
  return (
    <div>
      <Heading>Stop Watch</Heading>
      <br />
      <br />
      <Heading>{msToTime(watch)}</Heading>
      <br/>
      <br/>
      <div style={{display:"flex",gap:"20px",justifyContent:"center"}}>
        <Button colorScheme="whatsapp" onClick={start}>
          Start
        </Button>
        <Button colorScheme="red" onClick={stop}>
          Stop
        </Button>
        <Button colorScheme="twitter"  onClick={restart}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Stopwatch;
