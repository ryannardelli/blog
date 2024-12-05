// Garantindo que o Chart.js será inicializado corretamente
document.addEventListener('DOMContentLoaded', function () {
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
});

const likeButtons = document.querySelectorAll('.like-button');

likeButtons.forEach((likeButton) => {
  const heartIcon = likeButton.querySelector('.heart-icon');
  const likesAmount = likeButton.querySelector('.likes-amount');

  let likeAmount = parseInt(likesAmount.textContent, 10);

  heartIcon.addEventListener('click', () => {
    heartIcon.classList.toggle('liked');
    if (heartIcon.classList.contains('liked')) {
      likeAmount++;
    } else {
      likeAmount--;
    }
    likesAmount.textContent = likeAmount;
  });
});
