const {
  getGames,
  getGameByID,
  getGamesByCity,
  getGamesByPlayer,
  addGame,
  joinGame,
  unjoinGame,
  updateGame,
  deleteGame,
} = require("../Controllers/GameController");
const Game = require("../Models/GameModel");
const Team = require("../Models/TeamModel");
const Player = require("../Models/PlayerModel");
const Notification = require("../Controllers/NotificationController");

jest.mock("../Models/GameModel");
jest.mock("../Models/TeamModel");
jest.mock("../Models/PlayerModel");
jest.mock("../Controllers/NotificationController");

describe("Game Controller Tests", () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all games", async () => {
    const mockGames = [{ place: "Place 1" }, { place: "Place 2" }];
    Game.find.mockResolvedValue(mockGames);

    await getGames({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockGames);
  });

  it("should get a game by ID", async () => {
    const mockGame = { _id: "gameID", place: "Place 1" };
    Game.findById.mockResolvedValue(mockGame);

    await getGameByID({ params: { gameID: "gameID" } }, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockGame);
  });

  it("should get games by city", async () => {
    const mockCity = "New York";
    const mockGames = [
      { place: "Place 1", city: mockCity },
      { place: "Place 2", city: mockCity },
    ];
    Game.find.mockResolvedValue(mockGames);

    await getGamesByCity({ params: { city: mockCity } }, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockGames);
  });

  it("should get games by player", async () => {
    const mockPlayerID = "playerID";
    const mockGames = [{ place: "Place 1" }, { place: "Place 2" }];
    Game.find.mockResolvedValue(mockGames);

    await getGamesByPlayer(
      { params: { playerID: mockPlayerID } },
      mockResponse
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockGames);
  });

  it("should add a new game", async () => {
    const mockReqBody = {
      _id: "orgnizerID",
      place: "New Place",
      city: "New City",
      time: new Date(),
      totalSpots: 10,
      sportType: "Football",
    };
    const mockGame = { ...mockReqBody, players: ["orgnizerID"] };
    Game.prototype.save.mockResolvedValue(mockGame);

    await addGame({ body: mockReqBody }, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockGame);
  });

  it("should join a game", async () => {
    const mockReqBody = {
      gameID: "gameID",
      _id: "playerID",
    };
    const mockGame = {
      _id: "gameID",
      place: "Place 1",
      players: ["playerID"],
    };
    Game.findByIdAndUpdate.mockResolvedValue(mockGame);
    Player.findById.mockResolvedValue({ _id: "playerID", name: "Player 1" });
    Notification.notify.mockResolvedValue();

    await joinGame({ body: mockReqBody }, mockResponse);
    await new Promise((resolve) => setTimeout(resolve));

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockGame);
  });

  it("should unjoin a game", async () => {
    const mockReqBody = {
      gameID: "gameID",
      _id: "playerID",
    };
    const mockGame = { _id: "gameID", place: "Place 1", players: [] };
    Game.findByIdAndUpdate.mockResolvedValue(mockGame);
    Player.findById.mockResolvedValue({ _id: "playerID", name: "Player 1" });
    Notification.notify.mockResolvedValue();

    await unjoinGame({ body: mockReqBody }, mockResponse);
    await new Promise((resolve) => setTimeout(resolve));

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockGame);
  });

  it("should update a game", async () => {
    const mockReqParams = { gameID: "gameID" };
    const mockReqBody = {
      place: "Updated Place",
      city: "Updated City",
      time: new Date(),
      availableSpots: 5,
    };
    const mockGame = {
      _id: "gameID",
      place: "Updated Place",
      city: "Updated City",
      availableSpots: 5,
    };
    Game.findByIdAndUpdate.mockResolvedValue(mockGame);
    Notification.notify.mockResolvedValue();

    await updateGame(
      { params: mockReqParams, body: mockReqBody },
      mockResponse
    );
    await new Promise((resolve) => setTimeout(resolve));

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockGame);
  });

  it("should delete a game", async () => {
    const mockReqParams = { gameID: "gameID" };
    const mockGame = { _id: "gameID", place: "Place 1", players: [] };
    Game.findByIdAndDelete.mockResolvedValue(mockGame);
    Notification.notify.mockResolvedValue();

    await deleteGame({ params: mockReqParams }, mockResponse);
    await new Promise((resolve) => setTimeout(resolve));

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockGame);
  });
});
