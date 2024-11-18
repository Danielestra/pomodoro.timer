import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

const Pomodoro = () => {
  const [time, setTime] = useState(25 * 60); // Tempo inicial: 25 minutos em segundos
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  // Função para formatar o tempo
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Hook de efeito para controlar o timer
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    if (time === 0) {
      setIsBreak((prev) => !prev); // Alterna entre foco e descanso
      setTime(isBreak ? 25 * 60 : 5 * 60); // 25 min para foco, 5 min para descanso
    }

    return () => clearInterval(timer); // Limpa o intervalo ao desmontar
  }, [isRunning, time, isBreak]);

  // Funções de controle
  const handleStartPause = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    setIsRunning(false);
    setTime(25 * 60);
    setIsBreak(false);
  };

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>{isBreak ? "Break Time" : "Focus Time"}</h1>
          <h2>{formatTime(time)}</h2>
          <Button
            variant={isRunning ? "danger" : "success"}
            onClick={handleStartPause}
            className="mx-2"
          >
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Pomodoro;
