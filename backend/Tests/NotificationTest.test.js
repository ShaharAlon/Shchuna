jest.mock("../Models/NotificationModel");

const {
  notify,
  getNotifications,
  deleteNotification,
} = require("../Controllers/NotificationController");
const Notification = require("../Models/NotificationModel");

describe("Notification Controller Tests", () => {
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

  it("should notify", async () => {
    const mockReqBody = {
      senderID: "senderID",
      message: "Hello!",
      receiversID: ["receiverID1", "receiverID2"],
    };
    const mockNotification = {
      sender: "senderID",
      message: "Hello!",
      receivers: ["receiverID1", "receiverID2"],
    };
    Notification.prototype.save.mockResolvedValue(mockNotification);

    await notify(
      mockReqBody.senderID,
      mockReqBody.message,
      mockReqBody.receiversID
    );

    expect(Notification.prototype.save).toHaveBeenCalledWith();
  });

  it("should get notifications by player", async () => {
    const mockPlayerID = "playerID";
    const mockNotifications = [
      { message: "Notification 1" },
      { message: "Notification 2" },
    ];
    Notification.find.mockResolvedValue(mockNotifications);

    await getNotifications(
      { params: { playerID: mockPlayerID } },
      mockResponse
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockNotifications);
  });

  it("should delete a notification", async () => {
    const mockReqParams = { notificationID: "notificationID" };
    const mockNotification = {
      _id: "notificationID",
      message: "Notification 1",
    };
    Notification.findByIdAndDelete.mockResolvedValue(mockNotification);

    await deleteNotification({ params: mockReqParams }, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockNotification);
  });
});
