import { Player, Teams } from "@/models/Team";
import { useEffect, useState } from "react";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resolveImageUrl } from "@/lib/imageUtils";
import { cn } from "@/lib/utils";

const inputClass = cn(
  "block w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground",
  "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
);

type TeamProps = {
  teamCode: string;
  deptName: string;
};

type TeamFormProps = {
  team: Teams;
  setTeam: (team: Teams) => void;
  teamType: "football" | "cricket";
};

type PlayerFormProps = {
  player: Player;
  handleChange: (field: keyof Player, value: string) => void;
  handleDelete: () => void;
};

const emptyPlayer: Player = {
  player_name: "",
  player_description: "",
  player_image: "",
};

function formatImageSrc(src: string): string {
  if (!src || typeof src !== "string") {
    return "/no-image.png";
  }
  if (
    src.startsWith("/") ||
    src.startsWith("http://") ||
    src.startsWith("https://")
  ) {
    return src;
  }
  return `/${src}`;
}

const extractImageUrl = (url: string): string => {
  return resolveImageUrl(url, 500) ?? formatImageSrc(url);
};

const PlayerForm = ({
  player,
  handleChange,
  handleDelete,
}: PlayerFormProps) => (
  <div className="my-2 grid grid-cols-1 gap-2 rounded-md border border-border p-3 sm:grid-cols-[auto_1fr_1fr_1fr_auto] sm:items-center">
    <div className="flex justify-center sm:justify-start">
      <Image
        src={extractImageUrl(player.player_image)}
        alt={player.player_name}
        width={50}
        height={50}
        className="aspect-square rounded-full object-cover"
      />
    </div>
    <input
      type="text"
      placeholder="Player Name"
      className={inputClass}
      value={player.player_name}
      onChange={(e) => handleChange("player_name", e.target.value)}
    />
    <input
      type="text"
      className={inputClass}
      placeholder="Player Position"
      value={player.player_description}
      onChange={(e) => handleChange("player_description", e.target.value)}
    />
    <input
      type="url"
      className={inputClass}
      placeholder="Player Image URL"
      value={player.player_image}
      onChange={(e) => handleChange("player_image", e.target.value)}
    />
    <button
      type="button"
      onClick={handleDelete}
      className="justify-self-end text-destructive hover:opacity-80"
      aria-label="Remove player"
    >
      <TrashIcon width={20} />
    </button>
  </div>
);

const TeamFormSection = ({ team, setTeam, teamType }: TeamFormProps) => {
  const [newPlayer, setNewPlayer] = useState<Player>({ ...emptyPlayer });
  const teamData = team[teamType];

  const setTeamData = (field: keyof typeof teamData, value: string) => {
    setTeam({
      ...team,
      [teamType]: { ...teamData, [field]: value },
    });
  };

  const handleAddPlayer = () => {
    if (
      newPlayer.player_name ||
      newPlayer.player_description ||
      newPlayer.player_image
    ) {
      setTeam({
        ...team,
        [teamType]: {
          ...teamData,
          players: [...teamData.players, newPlayer],
        },
      });
      setNewPlayer({ ...emptyPlayer }); // Reset the new player form
    }
  };

  const handleEditPlayer = (
    index: number,
    field: keyof Player,
    value: string
  ) => {
    const updatedPlayers = teamData.players.map((player, idx) =>
      idx === index ? { ...player, [field]: value } : player
    );
    setTeam({
      ...team,
      [teamType]: { ...teamData, players: updatedPlayers },
    });
  };

  const handleDeletePlayer = (index: number) => {
    const updatedPlayers = teamData.players.filter((_, idx) => idx !== index);
    setTeam({
      ...team,
      [teamType]: { ...teamData, players: updatedPlayers },
    });
  };

  return (
    <Card className="border-border/80">
      <CardHeader>
        <CardTitle className="capitalize">{teamType}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[auto_1fr_1fr] sm:items-center">
        <Image
          src={extractImageUrl(teamData.team_logo ?? "")}
          alt={teamData.team_name}
          width={50}
          height={50}
          className="aspect-square rounded-full border border-border object-cover"
        />
        <input
          type="text"
          className={inputClass}
          placeholder="Team Name"
          value={teamData.team_name}
          required
          onChange={(e) => setTeamData("team_name", e.target.value)}
        />
        <input
          type="url"
          placeholder="Team Logo URL"
          required
          className={inputClass}
          value={teamData.team_logo}
          onChange={(e) => setTeamData("team_logo", e.target.value)}
        />
      </div>
      <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Players
      </h3>
      {teamData.players.map((player, index) => (
        <div key={index}>
          <PlayerForm
            player={player}
            handleChange={(field, value) =>
              handleEditPlayer(index, field, value)
            }
            handleDelete={() => handleDeletePlayer(index)}
          />
        </div>
      ))}
      <div className="space-y-3 border-t border-border pt-4">
        <p className="text-xs text-muted-foreground">Add new player</p>
        <PlayerForm
          player={newPlayer}
          handleChange={(field, value) =>
            setNewPlayer({ ...newPlayer, [field]: value })
          }
          handleDelete={() => setNewPlayer({ ...emptyPlayer })}
        />
        <Button type="button" variant="outline" size="sm" onClick={handleAddPlayer}>
          Add player
        </Button>
      </div>
      </CardContent>
    </Card>
  );
};

export default function TeamForm({ teamCode, deptName }: TeamProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state
  const emptyTeamData: Teams = {
    team_code: teamCode,
    dept_name: deptName,
    football: {
      team_name: "",
      team_logo: "",
      players: [] as Player[],
    },
    cricket: {
      team_name: "",
      team_logo: "",
      players: [] as Player[],
    },
  };
  const [team, setTeam] = useState(emptyTeamData);

  const getTeamData = async (code: string) => {
    const res = await fetch(`/api/v1/team/${code}`);
    const data = await res.json();
    if (res.ok && data.code === "success") {
      setTeam(data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTeamData(teamCode);
  }, [teamCode]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/v1/team/${teamCode}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(team),
      });
      const data = await res.json();
      console.log(data);
      console.log(team);

      if (!res.ok) {
        throw new Error(data.msg || "Failed to save team data");
      }
      setError(null); // Clear any previous error
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }

  return (
    <div className="max-w-full overflow-x-hidden space-y-6">
      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}
      <form onSubmit={handleSave} className="grid gap-6">
        <TeamFormSection team={team} setTeam={setTeam} teamType="football" />
        <TeamFormSection team={team} setTeam={setTeam} teamType="cricket" />
        <Button type="submit">Save changes</Button>
      </form>
    </div>
  );
}
