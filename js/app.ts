class Ui {
  displayGamesData(data: any[]): void {
    let gamesCard = '';

    for (let game of data) {
      gamesCard += `
        <div class="col-md-4">
          <div class="card" role="button" data-id="${game.id}">
            <div class="card-content">
              <div class="main-img position-relative">
                <img class="card-img-top object-fit-cover h-100" src="${game.thumbnail}" alt="${game.title} Thumbnail">
              </div>
              <div class="content">
                <div class="hstack justify-content-between">
                  <h3 class="h6 small text-white">${game.title}</h3>
                  <span class="badge text-bg-primary p-2">Free</span>
                </div>
                <p class="card-text small text-center opacity-50">
                  ${game.short_description.split(" ", 8).join(" ")}
                </p>
              </div>
              <footer class="card-footer small d-flex justify-content-between">
                <span class="badge badge-color">${game.genre}</span>
                <span class="badge badge-color">${game.platform}</span>
              </footer>
            </div>
          </div>
        </div>`;
    }

    const rowData = document.getElementById("rowData");
    if (rowData) {
      rowData.innerHTML = gamesCard;
    }
  }

  displayDetails(data: any): void {
    const content = `
      <div class="col-md-4">
        <img src="${data.thumbnail}" class="w-100" alt="image details" />
      </div>
      <div class="col-md-8">
        <h3 class="text-white">Title: ${data.title}</h3>
        <p class="text-white">Category: <span class="badge text-bg-info">${data.genre}</span></p>
        <p class="text-white">Platform: <span class="badge text-bg-info">${data.platform}</span></p>
        <p class="text-white">Status: <span class="badge text-bg-info">${data.status}</span></p>
        <p class="small text-white">${data.description}</p>
        <a class="btn btn-outline-warning" target="_blank" href="${data.game_url}">Show Game</a>
      </div>`;

    const contentDetails = document.getElementById("contentDetails");
    if (contentDetails) {
      contentDetails.innerHTML = content;
    }
  }
}

class Details {
  private ui: Ui;

  constructor(id: string) {
    this.ui = new Ui();
    this.initClose();
    this.getDetails(id);
  }

  private initClose(): void {
    const btnClose = document.getElementById("btnClose");
    btnClose?.addEventListener("click", () => {
      document.querySelector(".games")?.classList.remove("d-none");
      document.querySelector(".details")?.classList.add("d-none");
    });
  }

  private async getDetails(idGame: string): Promise<void> {
    const loading = document.querySelector<HTMLElement>(".loading");
    loading?.classList.remove("d-none");

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '337ea965d5msh628726a3b2ed715p1654bajsn809d11d2e54d',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    try {
      const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGame}`, options);
      const response = await api.json();
      this.ui.displayDetails(response);
    } catch (err) {
      console.error("Details error:", err);
    } finally {
      loading?.classList.add("d-none");
    }
  }
}

class Games {
  private ui: Ui;

  constructor() {
    this.ui = new Ui();
    this.getGames("mmorpg");

    document.querySelectorAll<HTMLAnchorElement>('.menu a').forEach(link => {
      link.addEventListener("click", (e: Event) => {
        const target = e.target as HTMLElement;
        document.querySelector(".menu .active")?.classList.remove("active");
        target.classList.add("active");

        const category = target.getAttribute("data-category");
        if (category) {
          this.getGames(category);
        }
      });
    });
  }

  private async getGames(category: string): Promise<void> {
    const loading = document.querySelector<HTMLElement>(".loading");
    loading?.classList.remove("d-none");

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '337ea965d5msh628726a3b2ed715p1654bajsn809d11d2e54d',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    try {
      const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
      const response = await api.json();
      this.ui.displayGamesData(response);
      this.attachCardEvents();
    } catch (err) {
      console.error("Games error:", err);
    } finally {
      loading?.classList.add("d-none");
    }
  }

  private attachCardEvents(): void {
    document.querySelectorAll<HTMLElement>(".card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.id;
        if (id) {
          new Details(id);
          document.querySelector(".games")?.classList.add("d-none");
          document.querySelector(".details")?.classList.remove("d-none");
        }
      });
    });
  }
}

const logoutBtn = document.querySelector<HTMLButtonElement>('#logoutBtn');

logoutBtn?.addEventListener('click', () => {
  window.location.href = 'index.html';
});


document.addEventListener("DOMContentLoaded", () => {
  new Games();
});
