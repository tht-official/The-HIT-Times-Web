import mongoose from "mongoose";

export interface Player {
  player_name: string;
  player_description: string;
  player_image: string;
}

export interface SportSquad {
  team_name: string;
  team_logo: string;
  players: Player[];
}

export interface Teams {
  team_code: string;
  dept_name: string;
  football?: SportSquad;
  cricket?: SportSquad;
  volleyball?: SportSquad;
  basketball?: SportSquad;
}

const PlayerSchema = new mongoose.Schema({
  player_name: {
    type: String,
    required: true,
  },
  player_description: {
    type: String,
    required: true,
  },
  player_image: {
    type: String,
    required: true,
  },
});

const SportSquadSchema = new mongoose.Schema({
  team_name: {
    type: String,
    required: true,
  },
  team_logo: {
    type: String,
    required: true,
  },
  players: [PlayerSchema],
});

const TeamSchema = new mongoose.Schema<Teams>(
  {
    team_code: {
      type: String,
      required: true,
      unique: true,
    },
    dept_name: {
      type: String,
      required: true,
    },
    football: { type: SportSquadSchema, required: false },
    cricket: { type: SportSquadSchema, required: false },
    volleyball: { type: SportSquadSchema, required: false },
    basketball: { type: SportSquadSchema, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Team ||
  mongoose.model<Teams>("Team", TeamSchema);
