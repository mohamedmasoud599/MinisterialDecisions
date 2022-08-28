import { Schema, model, Document, Model } from "mongoose";
import Joi from "joi";

interface IDecision extends Document {
  faculty: string;
  decision: string;
  year: string;
  number: string;
  imgs: string[];
}

const validateDecision = (body: object) => {
  const joiSchema = Joi.object({
    faculty: Joi.string().required(),
    decision: Joi.string().required(),
    year: Joi.string().required(),
    number: Joi.string().required(),
    imgs: Joi.array().required(),
  });
  return joiSchema.validateAsync(body);
};

const decisionSchema = new Schema(
  {
    faculty: {
      type: String,
      required: true,
    },
    decision: {
      type: String,
      required: true,
    },
    imgs: {
      type: Array,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Decision: Model<IDecision> = model("Decision", decisionSchema);

export { Decision, validateDecision };
