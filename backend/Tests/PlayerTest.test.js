const {
  getPlayers,
  getPlayersByGame,
  getPlayersByTeam,
  getPlayer,
  signup,
  login,
} = require("../Controllers/PlayerController");
const Player = require("../Models/PlayerModel");
const Game = require("../Models/GameModel");
const Team = require("../Models/TeamModel");

jest.mock("../Models/PlayerModel");
jest.mock("../Models/GameModel");
jest.mock("../Models/TeamModel");

describe("Unit tests for Player functions", () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all players", async () => {
    const mockPlayers = [{ name: "Player 1" }, { name: "Player 2" }];
    Player.find.mockResolvedValue(mockPlayers);

    await getPlayers({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockPlayers);
  });

  it("should get a player by ID", async () => {
    const mockPlayer = { _id: "123", name: "Player 1" };
    const playerId = "123";
    Player.findById.mockResolvedValue(mockPlayer);

    await getPlayer({ params: { playerID: playerId } }, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockPlayer);
  });

  it("should get players by game ID", async () => {
    const mockGame = { _id: "gameID", players: ["playerID1", "playerID2"] };
    const mockPlayers = [
      { _id: "playerID1", name: "Player 1" },
      { _id: "playerID2", name: "Player 2" },
    ];

    Game.findById.mockResolvedValue(mockGame);
    Player.find.mockResolvedValue(mockPlayers);

    await getPlayersByGame({ params: { gameID: "gameID" } }, mockResponse);
    await new Promise((resolve) => setTimeout(resolve));

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockPlayers);
  });

  it("should get players by team ID", async () => {
    const mockTeam = { _id: "teamID", players: ["playerID1", "playerID2"] };
    const mockPlayers = [
      { _id: "playerID1", name: "Player 1" },
      { _id: "playerID2", name: "Player 2" },
    ];

    Team.findById.mockResolvedValue(mockTeam);
    Player.find.mockResolvedValue(mockPlayers);

    await getPlayersByTeam({ params: { teamID: "teamID" } }, mockResponse);

    await new Promise((resolve) => setTimeout(resolve));

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockPlayers);
  });

  it("should create a new player", async () => {
    const mockNewPlayer = { email: "test@example.com", name: "Test Player" };
    Player.findOne.mockResolvedValue(null);
    Player.prototype.save.mockResolvedValue(mockNewPlayer);

    const req = {
      body: {
        email: "test@example.com",
        password: "password",
        name: "Test Player",
        phone: "123456789",
        sportType: "Football",
      },
    };

    await signup(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockNewPlayer);
  });

  it("should log in an existing player", async () => {
    const existingPlayer = {
      email: "test@example.com",
      password: "password",
      name: "Test Player",
    };
    Player.findOne.mockResolvedValue(existingPlayer);

    const req = {
      body: {
        email: "test@example.com",
        password: "password",
      },
    };

    await login(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(existingPlayer);
  });
});
