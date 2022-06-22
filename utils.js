exports.sendResponse = (res, status, data) => {
    res.status(status).json({
      status,
      data
    });
  };