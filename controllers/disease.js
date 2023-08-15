const Disease = require("../schema/disease_schema");

exports.addDisease = async (req, res) => {

  await Disease.deleteMany({"userId": req.userData.id})
  const job = {
    userId: req.userData.id,
    diseaseInfo: req.body.diseaseInfo,
  };

  const jobs = new Disease(job);

  try {
    await jobs.save();

    res.status(201).json(jobs);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error });
  }
};

exports.readDisease = async (req, res) => {
  try {

    const response = await Disease.find({ userId : req.userData.id})
    if(response.length == 0){
      return res.status(400).json({message: "Not found"})
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error });
  }
};

exports.deleteDisease = async (req, res) => {
  try {

    const response = await Disease.findByIdAndRemove(req.params.id)
    console.log(response)
    if(response == null){
      return res.status(400).json({message: "Not found"})
    }
    res.status(200).json({"message": "Successful"});
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error });
  }
};
