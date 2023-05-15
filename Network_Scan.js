const nmap = require('node-libnmap');

// Define as opções de varredura
const scanOptions = {
  range: ['192.168.0.1-100'], // Faixa de endereços IP a serem verificados
  ports: '1-1000', // Portas a serem verificadas
  timeout: 1200, // Tempo limite de varredura para cada host (em milissegundos)
  flags: '-sS', // Sinalizador Nmap para varredura TCP SYN
};

// Executa a varredura
nmap.scan(scanOptions, function(err, report) {
  if (err) {
    console.error(err);
    return;
  }

  // Processa o relatório de varredura
  const scanData = report[0];

  console.log(`Status da varredura: ${scanData.status}`);
  console.log(`Endereços IP verificados: ${scanData.ip}`);
  console.log(`Portas abertas: ${scanData.openPorts.length}`);

  // Exibe as portas abertas
  if (scanData.openPorts.length > 0) {
    console.log('Portas abertas:');
    scanData.openPorts.forEach((port) => {
      console.log(`- Porta ${port.port}: ${port.service}`);
    });
  }
});
