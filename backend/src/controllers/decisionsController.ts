import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import { Decision, validateDecision } from "../models/decisionModel";

import base64Img from "base64-img";

//@desc  GET decisions
//@route GET /api/decisions
//@access Private
const getDecisions = AsyncHandler(async (req: Request, res: Response) => {
  const decisions = await Decision.find();
  res.status(200).json(decisions);
});

//@desc GET single decision
//@route GET /api/decisions/[id]
//@access Private
const getDecision = AsyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const decision = await Decision.findById(id);
  if (decision) {
    res.status(200).json(decision);
  } else res.status(404).json({ message: "decision not found" });
});

//@desc  POST decision
//@route POST /api/decision
//@access Private
const postDecision = AsyncHandler(async (req: Request, res: Response) => {
  await validateDecision(req.body);

  const { faculty, decision, year, number, imgs } = req.body;

  //upload imgs
  const imgsPaths: string[] = [];
  if (imgs) {
    for (const img of imgs) {
      const filePath = base64Img.imgSync(
        img,
        `public/pictures/${faculty}/`,
        Date.now()
      );
      console.log(filePath);
      imgsPaths.push(filePath.split("public")[1]);
    }
  }

  const decisionDocument = await Decision.create({
    faculty,
    decision,
    year,
    number,
    imgs: imgsPaths,
  });

  res.status(200).json(decisionDocument);
});

export { getDecisions, getDecision, postDecision };
