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

  // Obtenha o ID do post a partir de um atributo data-post-id
  const postId = likeButton.dataset.postId;
  let likeAmount = parseInt(likesAmount.textContent, 10);

  heartIcon.addEventListener('click', () => {
    // Alterna a classe visual e define a URL para a requisição
    heartIcon.classList.toggle('liked');
    const isLiked = heartIcon.classList.contains('liked');
    const endpoint = isLiked
      ? `/posts/${postId}/like`
      : `/posts/${postId}/unlike`;

    // Atualiza no frontend para feedback instantâneo
    likeAmount = isLiked ? likeAmount + 1 : likeAmount - 1;
    likesAmount.textContent = likeAmount;

    // Envia a atualização para o backend
    fetch(endpoint, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        // Garante que o frontend esteja sincronizado com o backend
        likesAmount.textContent = data.like_count;
      })
      .catch(error => {
        console.error('Erro ao atualizar o contador de likes:', error);
        // Reverte o estado em caso de falha no backend
        heartIcon.classList.toggle('liked');
        likeAmount = isLiked ? likeAmount - 1 : likeAmount + 1;
        likesAmount.textContent = likeAmount;
      });
  });
});
