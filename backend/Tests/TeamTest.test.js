jest.mock("../Models/TeamModel");
jest.mock("../Models/PlayerModel");
jest.mock("../Controllers/NotificationController");

const {
  getTeams,
  getTeam,
  getTeamsByPlayer,
  createTeam,
  joinTeam,
  unjoinTeam,
  updateTeam,
  deleteTeam,
} = require("../Controllers/TeamController");
const Team = require("../Models/TeamModel");
const Player = require("../Models/PlayerModel");
const Notification = require("../Controllers/NotificationController");

describe("Team Controller Tests", () => {
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

  it("should get all teams", async () => {
    const mockTeams = [{ name: "Team 1" }, { name: "Team 2" }];
    Team.find.mockResolvedValue(mockTeams);

    await getTeams({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockTeams);
  });

  it("should get a team by ID", async () => {
    const mockTeam = { _id: "teamID", name: "Team 1" };
    Team.findById.mockResolvedValue(mockTeam);

    await getTeam({ params: { teamID: "teamID" } }, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockTeam);
  });

  it("should get teams by player", async () => {
    const mockPlayerID = "playerID";
    const mockTeams = [{ name: "Team 1" }, { name: "Team 2" }];
    Team.find.mockResolvedValue(mockTeams);

    await getTeamsByPlayer(
      { params: { playerID: mockPlayerID } },
      mockResponse
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockTeams);
  });

  it("should create a new team", async () => {
    const mockReqBody = {
      _id: "ownerID",
      name: "New Team",
      city: "New City",
      sportType: "Football",
    };
    const mockTeam = { ...mockReqBody, players: ["ownerID"] };
    Team.prototype.save.mockResolvedValue(mockTeam);

    await createTeam({ body: mockReqBody }, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockTeam);
  });

  it("should join a team", async () => {
    const mockReqBody = {
      teamID: "teamID",
      _id: "playerID",
    };
    const mockTeam = { _id: "teamID", name: "Team 1", players: ["playerID"] };
    Team.findByIdAndUpdate.mockResolvedValue(mockTeam);
    Player.findById.mockResolvedValue({ _id: "playerID", name: "Player 1" });
    Notification.notify.mockResolvedValue();

    await joinTeam({ body: mockReqBody }, mockResponse);
    await new Promise((resolve) => setTimeout(resolve));

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockTeam);
  });

  it("should unjoin a team", async () => {
    const mockReqBody = {
      teamID: "teamID",
      _id: "playerID",
    };
    const mockTeam = { _id: "teamID", name: "Team 1", players: [] };
    Team.findByIdAndUpdate.mockResolvedValue(mockTeam);
    Player.findById.mockResolvedValue({ _id: "playerID", name: "Player 1" });
    Notification.notify.mockResolvedValue();

    await unjoinTeam({ body: mockReqBody }, mockResponse);
    await new Promise((resolve) => setTimeout(resolve));

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockTeam);
  });

  it("should update a team", async () => {
    const mockReqParams = { teamID: "teamID" };
    const mockReqBody = {
      name: "Updated Team",
      city: "Updated City",
      sportType: "Updated Sport",
    };
    const mockTeam = {
      _id: "teamID",
      name: "Updated Team",
      city: "Updated City",
      sportType: "Updated Sport",
    };
    Team.findByIdAndUpdate.mockResolvedValue(mockTeam);
    Notification.notify.mockResolvedValue();

    await updateTeam(
      { params: mockReqParams, body: mockReqBody },
      mockResponse
    );
    await new Promise((resolve) => setTimeout(resolve));

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockTeam);
  });

  it("should delete a team", async () => {
    const mockReqParams = { teamID: "teamID" };
    const mockTeam = { _id: "teamID", name: "Team 1", players: [] };
    Team.findByIdAndDelete.mockResolvedValue(mockTeam);
    Notification.notify.mockResolvedValue();

    await deleteTeam({ params: mockReqParams }, mockResponse);
    await new Promise((resolve) => setTimeout(resolve));

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockTeam);
  });
});
