import api from "./api";

const Service = {
  async Login(body) {
    try {
      const res = await api.post("/players/login/", body);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  async SignUp(body) {
    try {
      const res = await api.post("/players/signup/", body);
      return res;
    } catch (error) {
      return error.response;
    }
  },

  async addTeam(body) {
    try {
      const res = await api.post("/teams/add/", body);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  async getTeam(id) {
    try {
      const res = await api.get(`/teams/get/${id}/`);
      return res.data;
    } catch (error) {
      return error.response.data.error;
    }
  },
  async getTeams() {
    try {
      const res = await api.get("/teams/");
      return res;
    } catch (error) {
      return error.respons.data.error;
    }
  },
  async getMyTeams(id) {
    try {
      const res = await api.get(`/teams/getMyTeams/${id}`);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  async updateTeam(id, body) {
    try {
      const res = await api.put(`/teams/${id}/`, body);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  async deleteTeam(id) {
    try {
      const res = await api.delete(`/teams/${id}/`);
      return res;
    } catch (error) {
      return error.response;
    }
  },

  async joinTeam(body) {
    try {
      const res = await api.post(`/teams/join/`, body);
      return res;
    } catch (error) {
      return error.response;
    }
  },

  async unjoinTeam(body) {
    try {
      const res = await api.post(`/teams/unjoin/`, body);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  async addGame(body) {
    try {
      const res = await api.post("/games/add/", body);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  async getGames() {
    try {
      const res = await api.get("/games/");
      return res.data;
    } catch (error) {
      return error.response.data.error;
    }
  },
  async getMyGames(id) {
    try {
      const res = await api.get(`/games/getByPlayer/${id}`);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  async getGame(id) {
    try {
      const res = await api.get(`/games/getByID/${id}/`);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  async updateGame(id, body) {
    try {
      const res = await api.put(`/games/${id}/`, body);
      return res;
    } catch (error) {
      return error.response;
    }
  },

  async deleteGame(id) {
    try {
      const res = await api.delete(`/games/${id}/`);
      return res;
    } catch (error) {
      return error.response;
    }
  },

  async joinGame(body) {
    try {
      const res = await api.post(`/games/join/`, body);
      return res;
    } catch (error) {
      return error.response;
    }
  },

  async unjoinGame(body) {
    try {
      const res = await api.post(`/games/unjoin/`, body);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  async getNotifications(id) {
    try {
      const res = await api.get(`/players/getNotifications/${id}/`);
      return res;
    } catch (error) {
      return error.response;
    }
  },
  async deleteNotification(id) {
    try {
      const res = await api.delete(`/players/deleteNotification/${id}/`);
      return res;
    } catch (error) {
      return error.response;
    }
  },
};
export default Service;
