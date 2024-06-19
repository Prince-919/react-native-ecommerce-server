export const sendToken = (user, res, message, statusCode) => {
  const token = user.generateToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message: message,
      token,
    });
};
