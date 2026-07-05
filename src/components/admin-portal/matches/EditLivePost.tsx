"use client";

import {
  adminInputClass,
  adminLabelClass,
  adminSelectClass,
  formChoiceInputClass,
} from "@/components/forms/form-styles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { codeToTeamName, getAllTeamsCode } from "@/lib/codeToTeamName";
import { MatchPosts } from "@/models/Match";
import parse from "html-react-parser";
import { Trash2 } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Teams } from "@/models/Team"; 

interface EditLivePostFormProps {
  match: MatchPosts;
}

const EditLivePostForm: React.FC<EditLivePostFormProps> = ({ match }) => {
  const [matchData, setMatchData] = useState<MatchPosts>(match);

  // Synchronize state with props when the match prop updates
  useEffect(() => {
    setMatchData(match);
  }, [match]);

  const [showPenalty, setShowPenalty] = useState<boolean>(false);
  const [allTeams, setAllTeams] = useState<Teams[]>([]);
  const [sendNotification, setSendNotification] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState({
    error: false,
    success: false,
    message: "",
  });
  const [timelineContent, setTimelineContent] = useState<string>("");

  const team1ScoreRef = useRef<HTMLInputElement>(null);
  const team2ScoreRef = useRef<HTMLInputElement>(null);
  const matchStatusRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<any>(null);

  // Clear status message after 5 seconds
  useEffect(() => {
    if (statusMessage.message) {
      const timer = setTimeout(() => {
        setStatusMessage({ error: false, success: false, message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  // Initialize Quill content
  useEffect(() => {
    setTimelineContent("");
  }, []);

    // Fetch all configured teams in MongoDB on mount
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch("/api/v1/team");
        const json = await res.json();
        if (res.ok && Array.isArray(json.data)) {
          setAllTeams(json.data);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);

  const handleTeamChange = useCallback(
    (setTeamCode: (code: string) => void, otherTeamCode: string) =>
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value !== otherTeamCode) {
          setTeamCode(value);
        }
      },
    []
  );

  const renderTeamSelect = (
    teamCode: string,
    setTeamCode: (code: string) => void,
    otherTeamCode: string
  ) => (
    <select
      className={adminSelectClass}
      value={teamCode}
      onChange={handleTeamChange(setTeamCode, otherTeamCode)}
    >
      {getAllTeamsCode().map((code: string) => (
        <option key={code} value={code} disabled={code === otherTeamCode}>
          {codeToTeamName[code]}
        </option>
      ))}
    </select>
  );

    const renderTeamInput = (
    teamNo: number,
    teamCode: string,
    setTeamCode: (code: string) => void,
    teamName: string,
    setTeamName: (name: string) => void,
    teamScore: string,
    setTeamScore: (score: string) => void,
    otherTeamCode: string
  ) => {
    const isBadminton = matchData.match_type === "badminton";
    const isVolleyballOrBasketball = matchData.match_type === "volleyball" || matchData.match_type === "basketball";

    return (
      <div className="mb-4">
        <label className={`${adminLabelClass} mb-2 block`}>
          {"Team " + teamNo}
        </label>
        
        {isBadminton ? (
          <input
            className={adminInputClass}
            required
            placeholder="Team Name (e.g. John / Jane)"
            value={teamName || ""}
            onChange={(e) => {
              const val = e.target.value;
              setTeamName(val);
              setTeamCode(val.toLowerCase().trim().replace(/\s+/g, "-"));
            }}
          />
        ) : isVolleyballOrBasketball ? (
          <select
            className={adminSelectClass}
            value={teamCode || ""}
            onChange={(e) => {
              const val = e.target.value;
              setTeamCode(val);
              const matched = allTeams.find((t) => t.team_code === val);
              const sport = matchData.match_type as "volleyball" | "basketball";
              setTeamName(matched?.[sport]?.team_name || matched?.dept_name || val);
            }}
            required
          >
            <option value="">Select Team</option>
            {allTeams
              .filter((t) => {
                const sportSquad = t[matchData.match_type as "volleyball" | "basketball"];
                return sportSquad && sportSquad.team_name;
              })
              .map((t) => (
                <option key={t.team_code} value={t.team_code} disabled={t.team_code === otherTeamCode}>
                  {t[matchData.match_type as "volleyball" | "basketball"]?.team_name || t.dept_name}
                </option>
              ))}
          </select>
        ) : (
          <select
            className={adminSelectClass}
            value={teamCode || ""}
            onChange={(e) => {
              const val = e.target.value;
              setTeamCode(val);
              setTeamName(codeToTeamName[val] || val);
            }}
            required
          >
            <option value="">Select Department</option>
            {getAllTeamsCode().map((code: string) => (
              <option key={code} value={code} disabled={code === otherTeamCode}>
                {codeToTeamName[code]}
              </option>
            ))}
          </select>
        )}

        <input
          ref={teamNo === 1 ? team1ScoreRef : team2ScoreRef}
          className={`${adminInputClass} mt-2`}
          required
          placeholder="Score"
          value={teamScore || ""}
          onChange={(e) => setTeamScore(e.target.value)}
        />
      </div>
    );
  };

  const setTeam1Code = useCallback((teamCode: string) => {
    setMatchData(prev => ({
      ...prev,
      team1: { ...prev.team1, team_code: teamCode },
    }));
  }, []);

  const setTeam2Code = useCallback((teamCode: string) => {
    setMatchData(prev => ({
      ...prev,
      team2: { ...prev.team2, team_code: teamCode },
    }));
  }, []);

    const setTeam1Name = useCallback((teamName: string) => {
    setMatchData(prev => ({
      ...prev,
      team1: { ...prev.team1, team_name: teamName },
    }));
  }, []);

  const setTeam2Name = useCallback((teamName: string) => {
    setMatchData(prev => ({
      ...prev,
      team2: { ...prev.team2, team_name: teamName },
    }));
  }, []);

  const setTeam1Score = useCallback((teamScore: string) => {
    setMatchData(prev => ({
      ...prev,
      team1: { ...prev.team1, team_score: teamScore },
    }));
  }, []);

  const setTeam2Score = useCallback((teamScore: string) => {
    setMatchData(prev => ({
      ...prev,
      team2: { ...prev.team2, team_score: teamScore },
    }));
  }, []);

  useEffect(() => {
    if (showPenalty) return;
    const isPenalty =
      matchData.team1.team_penalty != null &&
      matchData.team2.team_penalty != null &&
      (matchData.team1.team_penalty.trim() !== "0" ||
        matchData.team2.team_penalty.trim() !== "0") &&
      matchData.team1.team_score === matchData.team2.team_score;
    setShowPenalty(isPenalty);
  }, [matchData, showPenalty]);

  const PenaltyComponents = () => (
    <div className="mb-4">
      <input
        type="checkbox"
        checked={showPenalty}
        onChange={() => setShowPenalty(!showPenalty)}
        className="mr-2"
      />
      <label className={`${adminLabelClass} mb-2`}>Show penalty</label>
      {showPenalty && (
        <div className="grid grid-flow-row grid-cols-2 gap-4">
          <div className="mb-2">
            <label className={`${adminLabelClass} mb-1 block`}>
              {matchData.team1.team_name || codeToTeamName[matchData.team1.team_code] || matchData.team1.team_code}
            </label>
            <input
              className={adminSelectClass}
              required
              placeholder="Penalty"
              value={matchData.team1.team_penalty || ""}
              onChange={(e) =>
                setMatchData(prev => ({
                  ...prev,
                  team1: { ...prev.team1, team_penalty: e.target.value },
                }))
              }
            />
          </div>
          <div>
              <label className={`${adminLabelClass} mb-1 block`}>
              {matchData.team2.team_name || codeToTeamName[matchData.team2.team_code] || matchData.team2.team_code}
            </label>
            <input
              className={adminSelectClass}
              required
              placeholder="Penalty"
              value={matchData.team2.team_penalty || ""}
              onChange={(e) =>
                setMatchData(prev => ({
                  ...prev,
                  team2: { ...prev.team2, team_penalty: e.target.value },
                }))
              }
            />
          </div>
        </div>
      )}
    </div>
  );

  const MatchTypeInputField = () => {
    const setMatchType = useCallback((matchType: string) => {
      setMatchData((prev) => ({ ...prev, match_type: matchType }));
    }, []);

    return (
      <div>
        <label
          htmlFor="matchType"
          className={`${adminLabelClass} mb-2 block`}
        >
          Match Type
        </label>
                <select
          id="matchType"
          className={adminSelectClass}
          value={matchData.match_type || "football"}
          onChange={(e) => setMatchType(e.target.value)}
        >
          <option value="football">Football</option>
          <option value="cricket">Cricket</option>
          <option value="volleyball">Volleyball</option>
          <option value="basketball">Basketball</option>
          <option value="badminton">Badminton</option>
        </select>
      </div>
    );
  };

  const MatchStatusInputField = () => {
    const setMatchStatus = useCallback((matchStatus: string) => {
      setMatchData(prev => ({ ...prev, match_status: matchStatus }));
    }, []);

    return (
      <div>
        <label className={`${adminLabelClass} mb-2 block`}>
          Match Status
        </label>
        <input
          ref={matchStatusRef}
          className={adminSelectClass}
          type="text"
          value={matchData.match_status || ""}
          onChange={(e) => setMatchStatus(e.target.value)}
        />
      </div>
    );
  };

  const MatchDateField = (match_date: Date) => {
    const datetimeLocal = (datetime: Date) => {
      const dt = new Date(datetime);
      const offset = dt.getTimezoneOffset();
      dt.setMinutes(dt.getMinutes() - offset);
      return dt.toISOString().slice(0, 16);
    };
    const date = datetimeLocal(match_date);

    const setMatchDate = useCallback((date: string) => {
      setMatchData(prev => ({ ...prev, match_date: new Date(date) }));
    }, []);

    return (
      <div className="mb-4">
        <label className={`${adminLabelClass} mb-2 block`}>
          Match Date
        </label>
        <input
          className={adminSelectClass}
          type="datetime-local"
          value={date}
          onChange={(e) => setMatchDate(e.target.value)}
        />
      </div>
    );
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `/api/v1/live/match/${matchData.firebase_match_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(matchData),
        }
      );

      if (response.ok) {
        setStatusMessage({
          error: false,
          success: true,
          message: "Match updated successfully",
        });

        if (sendNotification) {
          await sendLiveNotification("", matchData, matchData.firebase_match_id);
        }
      } else {
        setStatusMessage({
          error: true,
          success: false,
          message: "Error updating match: " + response.statusText,
        });
      }
    } catch (error: any) {
      setStatusMessage({
        error: true,
        success: false,
        message: "Error updating match: " + error.message,
      });
    }
  };

  const IsMatchLiveField = () => {
    const handleIsLiveChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMatchData(prev => ({ ...prev, is_live: e.target.value === "yes" }));
      },
      []
    );

    return (
      <div className="mb-4">
        <label className={`${adminLabelClass} mb-2 block`}>
          Is Live
        </label>
        <select
          className={adminSelectClass}
          value={matchData.is_live ? "yes" : "no"}
          onChange={handleIsLiveChange}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
    );
  };

    const MatchDetailsForm = () => (
    <form className="grid grid-flow-row gap-2 my-2" onSubmit={handleOnSubmit}>
      <div className="grid grid-flow-row grid-cols-2 gap-4">
        <div>
          {renderTeamInput(
            1,
            matchData.team1.team_code,
            setTeam1Code,
            matchData.team1.team_name,
            setTeam1Name,
            matchData.team1.team_score,
            setTeam1Score,
            matchData.team2.team_code
          )}
        </div>
        <div>
          {renderTeamInput(
            2,
            matchData.team2.team_code,
            setTeam2Code,
            matchData.team2.team_name,
            setTeam2Name,
            matchData.team2.team_score,
            setTeam2Score,
            matchData.team1.team_code
          )}
        </div>
      </div>
      {matchData.match_type === "football" && <PenaltyComponents />}
      <IsMatchLiveField />
      <MatchTypeInputField />
      <MatchStatusInputField />
      {MatchDateField(matchData.match_date)}
      <div className="flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            className={formChoiceInputClass}
            checked={sendNotification}
            onChange={() => setSendNotification(!sendNotification)}
          />
          <span>Send notification</span>
        </label>
        <Button type="submit" className="w-full sm:w-auto">
          Save changes
        </Button>
      </div>
    </form>
  );

  const TimelineHistory = () => {
    const handleDeleteTimeline = async (firebase_timeline_id: string) => {
      const res = await fetch(
        `/api/v1/live/match/${matchData.firebase_match_id}/timeline/${firebase_timeline_id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        const newTimeline = matchData.timeline.filter(
          (timeline) => timeline.firebase_timeline_id !== firebase_timeline_id
        );
        setMatchData(prev => ({ ...prev, timeline: newTimeline }));
      } else {
        setStatusMessage({
          error: true,
          success: false,
          message: "Error deleting timeline: " + res.statusText,
        });
      }
    };

    return (
      <Card className="border-border/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Timeline history</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {matchData.timeline.length === 0 ? (
            <p className="text-sm text-muted-foreground">No timeline posts yet.</p>
          ) : (
            matchData.timeline
              .sort(
                (a, b) =>
                  new Date(b.timeline_date).getTime() -
                  new Date(a.timeline_date).getTime()
              )
              .map((timeline) => (
                <div
                  key={timeline.firebase_timeline_id}
                  className="flex flex-col gap-2 rounded-lg border border-border bg-muted/30 p-3"
                >
                  <div className="flex flex-row items-start justify-between gap-2">
                    <p className="text-xs text-muted-foreground">
                      {new Date(timeline.timeline_date).toLocaleString()}
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() =>
                        handleDeleteTimeline(timeline.firebase_timeline_id)
                      }
                      aria-label="Delete timeline entry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="prose prose-sm max-w-none dark:prose-invert prose-a:text-primary prose-a:underline">
                    {parse(timeline.msgHtml)}
                  </div>
                </div>
              ))
          )}
        </CardContent>
      </Card>
    );
  };

  const AddTimeline = () => {
    const handleAddTimeline = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const timeline_date = formData.get("timeline_date") as string;
      const content = timelineContent.trim();

      if (!content || content === "<p><br></p>") {
        setStatusMessage({
          error: true,
          success: false,
          message: "Content cannot be empty",
        });
        return;
      }

      const timeline = {
        timeline_date: timeline_date ? new Date(timeline_date) : new Date(),
        msgHtml: content,
      };

      try {
        const res = await fetch(
          `/api/v1/live/match/${matchData.firebase_match_id}/timeline`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(timeline),
          }
        );

        if (res.ok) {
          const newTimeline = await res.json();
          setMatchData(prev => ({
            ...prev,
            timeline: [...prev.timeline, newTimeline.data],
          }));
          setTimelineContent(""); // Reset Quill content
          setStatusMessage({
            error: false,
            success: true,
            message: "Timeline added successfully",
          });
          if (sendNotification) {
            const contentText = new DOMParser()
              .parseFromString(content, "text/html")
              .body.textContent || "";
            await sendLiveNotification(
              contentText,
              matchData,
              matchData.firebase_match_id,
              true
            );
          }
        } else {
          setStatusMessage({
            error: true,
            success: false,
            message: "Error adding timeline",
          });
        }
      } catch (error: any) {
        setStatusMessage({
          error: true,
          success: false,
          message: "Error adding timeline: " + error.message,
        });
      }
    };

    const handleQuillChange = useCallback((content: string) => {
      setTimelineContent(content);
    }, []);

    return (
      <Card className="border-border/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Add timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTimeline} className="grid gap-4">
            <input
              name="timeline_date"
              type="datetime-local"
              className={adminInputClass}
            />
            <div className="quill-container overflow-hidden rounded-md border border-border">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={timelineContent}
                onChange={handleQuillChange}
                preserveWhitespace={true}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "list",
                  "bullet",
                  "link",
                ]}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Add timeline</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  const sendLiveNotification = useCallback(
    async (
      timelineMessage: string,
      data: MatchPosts,
      firebaseMatchId: string,
      isTimeline: boolean = false
    ) => {
      const scoreLine = `${data.team1.team_name} ${data.team1.team_score} - ${data.team2.team_score} ${data.team2.team_name}`;
      let notificationBody: string;

      if (isTimeline) {
        notificationBody = timelineMessage;
      } else {
        notificationBody = `${scoreLine}\n${data.match_status}`;
      }

      try {
        const notifyRes = await fetch("/api/v1/live/notification/send", {
          method: "POST",
          body: JSON.stringify({
            team1: {
              team_name: data.team1.team_name,
              team_score: data.team1.team_score,
            },
            team2: {
              team_name: data.team2.team_name,
              team_score: data.team2.team_score,
            },
            match_status: notificationBody,
            postId: firebaseMatchId,
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        });

        if (notifyRes.ok) {
          setStatusMessage({
            error: false,
            success: true,
            message: "Notification sent successfully",
          });
        } else {
          setStatusMessage({
            error: true,
            success: false,
            message: "Error sending notification",
          });
        }
      } catch (error: any) {
        setStatusMessage({
          error: true,
          success: false,
          message: "Error sending notification: " + error.message,
        });
      }
    },
    []
  );

  const MessageBox = () => (
    <p
      className={
        statusMessage.error
          ? "rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          : "rounded-md border border-border bg-muted px-4 py-3 text-sm text-foreground"
      }
    >
      {statusMessage.message}
    </p>
  );

  return (
    <div className="grid gap-6">
      {statusMessage.message && <MessageBox />}
      <Card className="border-border/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Match details</CardTitle>
        </CardHeader>
        <CardContent>
          <MatchDetailsForm />
        </CardContent>
      </Card>
      <AddTimeline />
      <TimelineHistory />
    </div>
  );
};

export default EditLivePostForm;