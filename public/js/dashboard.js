document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

// chart
var ctx = document.getElementById('myChart').getContext('2d');
var statChart = new Chart(ctx, {
    type: 'bar', // Tipo do gráfico (pode ser 'line', 'bar', etc.)
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], // Rótulos para o eixo X
        datasets: [{
            label: 'Visitas por Mês', // Título do gráfico
            data: [120, 150, 180, 130, 170, 200, 250, 230, 220, 240, 260, 300], // Dados para cada mês
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Cor de fundo das barras
            borderColor: 'rgba(54, 162, 235, 1)', // Cor das bordas das barras
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});