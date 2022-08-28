import cameraWatermark from "../../services/camera-watermark.js";

import { Create, Fetch, Update } from "../common/actions";

const handleCapture = (photos, setPhotos, getScreenshot, nationalId, name) => {
  const shot = getScreenshot();
  const data = { nationalId, name };
  cameraWatermark(shot, data).then((rslt) => {
    setPhotos([...photos, rslt]);
  });
};

const handleUpdate = async (data, photos, fileNo) => {
  await Update("/volanteers", data, fileNo);
  await Create(`/volanteers/${fileNo}/examinationPhotos`, {
    examinationPhotos: photos,
  });
};

const handleSearch = async (fileNo, setRegistered) => {
  try {
    const registerd = (await Fetch(`/volanteers/fileNo/${fileNo}`)).data;
    setRegistered(registerd);
  } catch (error) {
    console.log(error.message);
  }
};
export { handleCapture, handleUpdate, handleSearch };
