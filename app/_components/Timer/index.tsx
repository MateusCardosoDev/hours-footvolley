import { useState, useEffect } from "react";

const getNextClassDate = () => {
  const now = new Date();
  const classDays = [1, 3, 5]; // Seg (1), Qua (3), Sex (5)
  const classHour = 20; // 20h

  let nextClass = new Date(now);
  nextClass.setHours(classHour, 0, 0, 0); // Ajusta para 20:00:00

  // Se hoje já passou do horário, procurar o próximo dia
  if (now > nextClass) {
    nextClass.setDate(nextClass.getDate() + 1);
  }

  // Encontrar o próximo dia de aula
  while (!classDays.includes(nextClass.getDay())) {
    nextClass.setDate(nextClass.getDate() + 1);
  }

  return nextClass;
};

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const updateTimer = () => {
      const nextClass = getNextClassDate();
      const diff = nextClass.getTime() - new Date().getTime();
      setTimeLeft(diff);
    };

    updateTimer(); // Chama uma vez para setar o tempo inicial
    const interval = setInterval(updateTimer, 1000); // Atualiza a cada segundo

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg text-center">
      <h2 className="text-lg font-bold">Próxima Aula de Futevôlei</h2>
      <p className="text-xl mt-2">{formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;
