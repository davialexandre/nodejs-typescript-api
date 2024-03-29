import { model, Schema, Types } from 'mongoose';

export enum BeachPosition {
  S = 'S',
  E = 'E',
  N = 'N',
  W = 'W',
}

export interface Beach {
  _id?: string;
  name: string;
  position: BeachPosition;
  lat: number;
  lng: number;
  user: Types.ObjectId;
}

const schema = new Schema<Beach>(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Beach = model<Beach>('Beach', schema);
