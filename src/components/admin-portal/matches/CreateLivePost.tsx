"use client";

import {
  adminInputClass,
  adminLabelClass,
  adminSelectClass,
  formChoiceInputClass,
} from "@/components/forms/form-styles";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { codeToTeamName, getAllTeamsCode } from "@/lib/codeToTeamName";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateLivePostForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    team1Code: "100",
    team1Score: "",
    team2Code: "101",
    team2Score: "",
    matchDateTime: "",
    isLive: "true",
    matchType: "football",
    matchStatus: "",
    sendNotification: true,
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<any>) => {
    setFormData((prev) => ({
      ...prev,
      [field]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const handleTeamChange =
    (team: "team1Code" | "team2Code") =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const otherTeam =
        team === "team1Code" ? formData.team2Code : formData.team1Code;
      if (e.target.value !== otherTeam) {
        setFormData((prev) => ({ ...prev, [team]: e.target.value }));
      }
    };

  const submitMatchData = async (e: React.FormEvent) => {
    e.preventDefault();

    const matchData = {
      team1: {
        team_score: formData.team1Score,
        team_code: formData.team1Code,
        team_name: codeToTeamName[formData.team1Code],
      },
      team2: {
        team_score: formData.team2Score,
        team_code: formData.team2Code,
        team_name: codeToTeamName[formData.team2Code],
      },
      match_date: new Date(formData.matchDateTime),
      is_live: formData.isLive === "true",
      match_type: formData.matchType,
      match_status: formData.matchStatus,
    };

    try {
      const res = await fetch("/api/v1/live/create", {
        method: "POST",
        body: JSON.stringify(matchData),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (!res.ok) throw new Error("Failed to create match");

      const result = await res.json();
      if (result.msg !== "success") {
        throw new Error(result.msg);
      }

      const matchId = result.matchId || result.data?.firebase_match_id;

      if (!formData.sendNotification) {
        router.push(`/admin-portal/matches/edit/${matchId}`);
        return;
      }

      const notifyRes = await fetch("/api/v1/live/notification/send", {
        method: "POST",
        body: JSON.stringify({
          team1: matchData.team1,
          team2: matchData.team2,
          match_status: `Match between ${matchData.team1.team_name} and ${matchData.team2.team_name} is now LIVE!`,
          postId: matchId,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      const notifyResult = await notifyRes.json();
      if (!notifyResult.success && notifyResult.msg !== "success") {
        alert(`Failed to send notification: ${notifyResult.msg}`);
      }
      router.push(`/admin-portal/matches/edit/${matchId}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      alert(`Error: ${errorMessage}`);
    }
  };

  const renderTeamSelect = (
    teamCode: string,
    teamField: "team1Code" | "team2Code"
  ) => (
    <select
      className={adminSelectClass}
      value={teamCode}
      onChange={handleTeamChange(teamField)}
    >
      {getAllTeamsCode().map((code: string) => (
        <option
          key={code}
          value={code}
          disabled={
            code ===
            (teamField === "team1Code" ? formData.team2Code : formData.team1Code)
          }
        >
          {codeToTeamName[code]}
        </option>
      ))}
    </select>
  );

  const renderTeamInput = (teamNum: 1 | 2) => {
    const teamCodeField = `team${teamNum}Code` as "team1Code" | "team2Code";
    const teamScoreField = `team${teamNum}Score` as "team1Score" | "team2Score";

    return (
      <div className="space-y-2">
        <label className={adminLabelClass}>Team {teamNum}</label>
        {renderTeamSelect(formData[teamCodeField], teamCodeField)}
        <input
          className={adminInputClass}
          required
          placeholder="Score"
          value={formData[teamScoreField]}
          onChange={handleInputChange(teamScoreField)}
        />
      </div>
    );
  };

  return (
    <Card className="border-border/80">
      <CardContent className="pt-6">
        <form onSubmit={submitMatchData} className="grid gap-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {renderTeamInput(1)}
            {renderTeamInput(2)}
          </div>

          <div className="space-y-2">
            <label className={adminLabelClass}>Match date and time</label>
            <input
              className={adminInputClass}
              type="datetime-local"
              required
              value={formData.matchDateTime}
              onChange={handleInputChange("matchDateTime")}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className={adminLabelClass}>Is match live?</label>
              <select
                className={adminSelectClass}
                value={formData.isLive}
                onChange={handleInputChange("isLive")}
              >
                <option value="true">Live</option>
                <option value="false">Not live</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className={adminLabelClass}>Match type</label>
              <select
                className={adminSelectClass}
                value={formData.matchType}
                onChange={handleInputChange("matchType")}
              >
                <option value="football">Football</option>
                <option value="cricket">Cricket</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className={adminLabelClass}>Match status</label>
            <textarea
              className={adminInputClass}
              required
              placeholder="Match started"
              value={formData.matchStatus}
              onChange={handleInputChange("matchStatus")}
              maxLength={35}
              rows={2}
            />
          </div>

          <div className="flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                className={formChoiceInputClass}
                checked={formData.sendNotification}
                onChange={handleInputChange("sendNotification")}
              />
              Notify users
            </label>
            <Button type="submit" className="w-full sm:w-auto">
              Create match
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateLivePostForm;
