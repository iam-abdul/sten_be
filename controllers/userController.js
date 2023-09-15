export const userLogin = async (req, res) => {
  try {
    return res.status(200).json({
      message: "success",
    });
  } catch (err) {
    console.log("err in user login");
    return res.status(400).json({
      message: "failed",
    });
  }
};
