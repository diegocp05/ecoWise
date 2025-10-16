export const getAqiInfo = (aqi: number) => {
  if (aqi <= 50) {
    return {
      level: "Bom",
      color: "#4ade80", // Verde
      recommendation: "A qualidade do ar está ótima. Aproveite para praticar atividades ao ar livre!",
    };
  }
  if (aqi <= 100) {
    return {
      level: "Moderado",
      color: "#facc15", // Amarelo
      recommendation: "Qualidade do ar aceitável. Pessoas sensíveis podem sentir algum desconforto.",
    };
  }
  if (aqi <= 150) {
    return {
      level: "Insalubre (Grupos Sensíveis)",
      color: "#f97316", // Laranja
      recommendation: "Grupos sensíveis podem ser afetados. Limite o esforço prolongado ao ar livre.",
    };
  }
  if (aqi <= 200) {
    return {
      level: "Insalubre",
      color: "#ef4444", // Vermelho
      recommendation: "Todos podem começar a sentir efeitos na saúde. Evite atividades externas.",
    };
  }
  if (aqi <= 300) {
    return {
      level: "Muito Insalubre",
      color: "#a855f7", // Roxo
      recommendation: "Alerta de saúde. A população inteira pode ser afetada. Permaneça em locais fechados.",
    };
  }
  return {
    level: "Perigoso",
    color: "#7e22ce", // Roxo escuro
    recommendation: "Condições de emergência. Risco sério à saúde. Evite qualquer exposição ao ar.",
  };
};