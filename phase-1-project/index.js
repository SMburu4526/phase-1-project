function searchAnime() {
  const query = document.getElementById("animeSearch").value.trim();
  const resultsDiv = document.getElementById("searchResults");

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter an anime title.</p>";
    return;
  }

  resultsDiv.innerHTML = "<p>Searching...</p>";

  fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=5`)
    .then(response => response.json())
    .then(data => {
      if (!data.data || data.data.length === 0) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
        return;
      }

      resultsDiv.innerHTML = ""; // Clear old results

      data.data.forEach(anime => {
        const animeCard = document.createElement("div");
        animeCard.className = "anime-result";

        animeCard.innerHTML = `
          <h3>${anime.title}</h3>
          <img src="${anime.images.jpg.image_url}" alt="${anime.title}" style="width:150px; border-radius:10px;">
          <p>${anime.synopsis ? anime.synopsis.substring(0, 200) + "..." : "No description available."}</p>
          <a href="${anime.url}" target="_blank">More Info</a>
        `;

        resultsDiv.appendChild(animeCard);
      });
    })
    .catch(error => {
      resultsDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    });
}
