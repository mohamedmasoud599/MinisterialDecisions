import Canvas from "canvas";
import { format } from "date-fns";

const cameraWatermark = async (base64, data) => {
  const canvas = Canvas.createCanvas(1280, 720);
  const context = canvas.getContext("2d");

  function drawStroked(text, x, y) {
    context.font = "20px Sans-serif";
    context.strokeStyle = "black";
    context.lineWidth = 3;
    context.strokeText(text, x, y);
    context.fillStyle = "white";
    context.fillText(text, x, y);
  }

  const background = await Canvas.loadImage(base64);
  context.drawImage(background, 0, 0, canvas.width, canvas.height);

  context.strokeStyle = "#f1c40f";
  context.lineWidth = 5;
  context.strokeRect(0, 0, canvas.width, canvas.height);

  let { name, nationalId } = data;
  let date = format(Date.now(), "yyyy-MM-dd , hh:mm aa");

  drawStroked("منطقة تجنيد وتعبئة الزقازيق", 25, 25);
  drawStroked(date, 25, 50);

  drawStroked(name, canvas.width - 250, 25);
  if (nationalId) {
    drawStroked(nationalId, canvas.width - 200, 50);
  }

  return canvas.toDataURL();
};

export default cameraWatermark;
