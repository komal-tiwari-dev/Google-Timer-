import {
  Button,
  Heading,
  Text,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

const Timer = () => {
  const Ref = useRef(null);
  const [val, setValue] = React.useState("");
  const [timer, setTimer] = useState("00:00:00");
  const [btn, handleBtn] = useState(false);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);

    return { total, seconds, minutes, hours };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    // console.log(total);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
      );
    }else{handleBtn(false);}
  }
  
    
    
    
    const clearTimer = (e) => {
      setTimer("00:00:00");
      if (Ref.current) {
        clearInterval(Ref.current);
      }
      
    
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + Number(val));
    // console.log(deadline);
    
    return deadline;
  };
  
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);
  
  const onClickReset = () => {
    clearTimer(getDeadTime());
    handleBtn(!btn);
    setValue("")
  };
  
  
  const handleChange = (event) => setValue(event.target.value);
  
  // console.log(val);

  return (
    <div>
      <Heading size="2xl">Timer</Heading>
      <br />
      <Text as="h5" fontSize="3xl">
        Your Entered Time In Seconds : {val}{" "}
      </Text>
      <Input
        value={val}
        onChange={handleChange}
        htmlSize={25}
        width="auto"
        color="teal"
        placeholder="Enter time in seconds"
        _placeholder={{ color: "teal" }}
        textAlign="center"
        fontSize="xl"
      />
      <br />
      <br />
      <Heading>{timer}</Heading>
      <br />
      <Button colorScheme="teal" onClick={onClickReset}>
        {btn ? "Reset" : "Start"}
      </Button>
    </div>
  );
};

export default Timer;
