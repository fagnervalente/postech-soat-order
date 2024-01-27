import { Schema } from "ajv";
import { ajv } from "./helper";

const schema: Schema = {
  type: "object",
  properties: {
    products: { type: "array", items: { type: "number" }, minItems: 1 },
    customerId: { type: "string", nullable: true },
    totalPrice: { type: "number", nullable: false }
  },
  required: ["products"],
  additionalProperties: false
}

export default ajv.compile(schema);