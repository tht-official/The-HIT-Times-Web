"use client"
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shield, X, Target, Gamepad, Volleyball } from 'lucide-react';

export default function RulesSection() {
  const [activeGame, setActiveGame] = useState(0);
  const [showFullRules, setShowFullRules] = useState(false);
  const [selectedRules, setSelectedRules] = useState<number | null>(null);

  const games = [
    {
      name: "Valorant Championship",
      icon: <Target className="w-5 h-5 text-red-500" />,
      shortDesc: "5v5 tactical shooter with unique agent abilities",
      rules: [
        "SOLO REGISTRATION IS NOT ALLOWED.",
        "EACH TEAM MUST HAVE ONE OFFLINE PLAYER FROM HIT COLLEGE; THE REMAINING FOUR PLAYERS CAN BE FROM OUTSIDE HIT.",
        "ALL PLAYERS MUST REGISTER USING THEIR RIOT GAME ID; ONLY REGISTERED IDS WILL BE ALLOWED IN THE LOBBY.",
        "TOURNAMENT FORMAT WILL BE DECIDED BASED ON NUMBER OF PARTICIPATING TEAMS.",
        "ALL MATCHES WILL BE BEST OF 1 EXCEPT THE FINALS WHICH WILL BE BEST OF 3.",
        "MUMBAI SERVER WILL BE USED.",
        "TOURNAMENT MODE MUST BE ON.",
        "CHEATS MUST BE OFF.",
        "IF ANY PLAYER IS CAUGHT CHEATING, IT WILL LEAD TO IMMEDIATE DISQUALIFICATION.",
        "OFFENSIVE LANGUAGE, TOXIC BEHAVIOR, OR MISCONDUCT WILL LEAD TO DISQUALIFICATION.",
        "MAP POOL: ASCENT, BIND, BREEZE, HAVEN, ICEBOX, LOTUS, SUNSET.",
        "ONLINE PLAYERS MUST JOIN A LIVE GOOGLE MEET VIDEO CALL DURING THEIR MATCHES.",
        "ORGANISERS RESERVE THE RIGHT TO CHANGE OR ADD RULES AT ANY POINT DURING THE TOURNAMENT."
      ]
    },
    {
      name: "COD Masters",
      icon: <Shield className="w-5 h-5 text-red-500" />,
      shortDesc: "4v4 action-packed first-person shooter tournament",
      rules: [
        "NO SOLO ENTRIES ARE ACCEPTED. IT HAS TO BE A SQUAD WITH AT LEAST 2 MEMBERS.",
        "ONE PLAYER MUST BE FROM HIT. THE IGL (IN-GAME LEADER) MUST BE PRESENT PHYSICALLY ON THE MATCH DAY.",
        "IF ANY TEAM IS FOUND TO BE USING UNFAIR MEANS, THE ENTIRE TEAM WILL BE BANNED FROM THE TOURNAMENT.",
        "NO USE OF TABLETS, IPADS OR EMULATORS ARE ALLOWED. GAMES WILL ONLY BE PLAYED ON MOBILE PHONES.",
        "THERE WOULD BE A TOTAL OF 3 MATCHES FOR CALL OF DUTY.",
        "ONE MUST JOIN THE ROOM 10 MINUTES PRIOR TO THE START OF THE GAME.",
        "IF ANY PLAYER IS FOUND USING ABUSIVE LANGUAGE AGAINST ANY OTHER PLAYER FROM A DIFFERENT TEAM, THE ENTIRE TEAM WILL BE BANNED.",
        "IF ANY CONFLICT ARISES, THE DECISION OF THE ORGANISING BODY WILL BE THE ULTIMATUM.",
        "THE FINAL RESULTS WOULD BE CALCULATED OUT OF THE 3 MATCHES.",
        "THE MATCHES WOULD BE PLAYED IN BATTLE ROYALE FORMAT. THE MAPS WOULD BE ISOLATED AND BLACKOUT.",
        "ALL RULES AND DECISIONS ARE SUBJECT TO CHANGE AT THE DISCRETION OF THE ORGANIZERS."
      ]
    },
    {
      name: "BGMI Showdown",
      icon: <Gamepad className="w-5 h-5 text-red-500" />,
      shortDesc: "4-player squad battle royale on mobile",
      rules: [
        "TEAM COMPOSITION: EACH TEAM MUST CONSIST OF 4 PLAYERS; NO SUBSTITUTES ARE ALLOWED DURING THE TOURNAMENT.",
        "ELIGIBILITY: PLAYERS FROM OUTSIDE THE COLLEGE ARE ALLOWED TO PARTICIPATE, ALONG WITH CURRENT COLLEGE STUDENTS.",
        "PLAYERS MUST REGISTER WITH THEIR CORRECT BGMI IDS; ANY CHANGES MUST BE INFORMED AT LEAST 24 HOURS BEFORE THE DATE.",
        "GAME VERSION: ALL PLAYERS MUST PLAY ON THE LATEST VERSION OF BGMI AVAILABLE ON THEIR RESPECTIVE DEVICES.",
        "MATCH FORMAT: THE TOURNAMENT WILL FOLLOW AN ELIMINATION FORMAT FOLLOWED BY A POINTS-BASED FINAL ROUND. TEAMS WITH THE HIGHEST POINTS FROM THE FINAL ROUND WILL BE DECLARED THE WINNERS.",
        "MAP POOL: MATCHES WILL BE HELD ON ERANGEL, MIRAMAR, AND SANHOK.",
        "ROUND FORMAT: AN INITIAL ELIMINATION ROUND WILL FILTER TOP-PERFORMING TEAMS. QUALIFYING TEAMS WILL COMPETE IN MULTIPLE FINAL-ROUND MATCHES WHERE POINTS FROM KILLS AND PLACEMENTS WILL DETERMINE THE WINNERS.",
        "ROOM SETTINGS: TPP MODE, SQUAD, RED ZONE ON, STANDARD LOOT, WITH FAIR ZONE SETTINGS; SPECIFIC RULES WILL BE SHARED BEFORE EACH MATCH.",
        "OFFLINE PARTICIPATION: AT LEAST ONE TEAM MEMBER MUST BE PHYSICALLY PRESENT AT THE EVENT VENUE; THE REMAINING PLAYERS MAY PARTICIPATE ONLINE.",
        "CHECK-IN: TEAM CAPTAINS MUST CHECK IN 15 MINUTES BEFORE MATCH TIME; BEING MORE THAN 10 MINUTES LATE MAY LEAD TO DISQUALIFICATION.",
        "DEVICE RULES: USE OF MOBILE PHONES ONLY. EMULATORS OR TABLETS ARE STRICTLY PROHIBITED.",
        "SUSPICIOUS ACTIVITY: IF A PLAYER IS REPORTED FOR SUSPICIOUS BEHAVIOR, THEY MAY BE REQUIRED TO RECORD AND PRESENT FULL GAMEPLAY OF FURTHER ROUNDS IF THEY QUALIFY BEYOND THE ELIMINATION STAGE.",
        "CONDUCT: TOXIC BEHAVIOR, VERBAL ABUSE, OR UNSPORTSMANLIKE CONDUCT WILL NOT BE TOLERATED AND MAY RESULT IN DISQUALIFICATION.",
        "CHEATING: ANY USE OF HACKS, SCRIPTS, UNAUTHORIZED TOOLS, OR THIRD-PARTY APPS WILL LEAD TO INSTANT DISQUALIFICATION.",
        "ACCOUNT RULES: PLAYERS MUST USE THEIR OWN ACCOUNT; SMURFING OR ACCOUNT SHARING WILL RESULT IN DISQUALIFICATION.",
        "REPORTING RESULTS: TEAM CAPTAINS MUST SUBMIT CLEAR SCREENSHOTS OF MATCH RESULTS, INCLUDING TEAM RANK AND KILLS.",
        "RULE CHANGES: ORGANIZERS RESERVE THE RIGHT TO MODIFY RULES WITH PRIOR NOTICE TO ENSURE FAIR PLAY."
      ]
    },
    {
      name: "FIFA Tournament",
      icon: <Volleyball className="w-5 h-5 text-red-500" />,
      shortDesc: "1v1 football simulation game",
      rules: [
        "NO PERSONAL LAPTOPS REQUIRED FOR THE EVENT. ALL NECESSARY EQUIPMENT WILL BE PROVIDED.",
        "ONLY CURRENT HITIANS ARE ACCEPTED FOR THIS EVENT. INDIVIDUAL PLAYERS MUST REPORT TO THE FIFA DESK TO ADD THEIR NAME TO THE WAITLIST ON THE DAY OF PARTICIPATION.",
        "DIRECT KNOCKOUT; NO SECOND CHANCES AFTER A LOSS.",
        "ONLY UCL TEAMS ALLOWED. TWO PLAYERS CAN CHOOSE THE SAME TEAM. CHOOSE WISELY-NO COMPLAINTS AFTER LOSING.",
        "JOYSTICK ONLY. JOYSTICKS WILL BE PROVIDED, BUT YOU MAY USE YOUR OWN XBOX-STYLE CONTROLLER IF PREFERRED. NO KEYBOARDS ALLOWED.",
        "NO CONTROL ASSISTS PERMITTED. MANUAL/CUSTOM SETTINGS ONLY.",
        "HALF LENGTH: 5 MINS; GAME SPEED: NORMAL; INJURIES: OFF; OFFSIDES & BOOKINGS: ON; EXTRA TIME & PENALTIES: ON (FOR DRAWS).",
        "MATCHES WILL BE DRAWN ON THE SPOT.",
        "PLAYERS MUST REPORT 15 MINS BEFORE THEIR MATCH.",
        "NO TOXIC BEHAVIOR, STALLING, OR REPEATED PAUSING. PLAY FAIR.",
        "EACH TEAM WILL BE GIVEN 1 MIN MAX TO CUSTOMIZE TEAM MANAGEMENT, FORMATION, OR TACTICAL CHANGES BEFORE THE MATCH.",
        "REPLAYS ALLOWED ONLY IF < 10 IN-GAME MINS PLAYED WHEN ISSUE OCCURS; OTHERWISE, RESULT STANDS UNLESS ORGANIZER DECIDES.",
        "HANDLE ALL GEAR RESPONSIBLY. ANY DAMAGE CAUSED WILL RESULT IN FINES, AND MAY LEAD TO DISQUALIFICATION.",
        "THE TOURNAMENT ORGANIZER RESERVES ALL RIGHTS TO MODIFY, CANCEL, OR MAKE FINAL DECISIONS ON ANY MATTERS RELATED TO THE EVENT."
      ]
    }
  ];

  const nextGame = () => {
    setActiveGame((prev) => (prev === games.length - 1 ? 0 : prev + 1));
  };

  const prevGame = () => {
    setActiveGame((prev) => (prev === 0 ? games.length - 1 : prev - 1));
  };

  const openFullRules = (gameIndex: number) => {
    setSelectedRules(gameIndex);
    setShowFullRules(true);
  };

  const closeFullRules = () => {
    setShowFullRules(false);
  };

  // Auto-rotate games every 8 seconds if full rules are not shown
  useEffect(() => {
    if (showFullRules) return;
    
    const interval = setInterval(() => {
      nextGame();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [showFullRules]);

  return (
    <section id="rules" className="py-20 relative bg-black">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-900/20 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-red-900/20 to-transparent"></div>
      <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-red-500/5 blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-red-500/5 blur-xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <Shield className="text-red-500 mr-2" />
            <span className="text-white">Tournament <span className="text-red-500">Rules</span></span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Familiarize yourself with the rules before competing. Fair play and sportsmanship are essential for an epic gaming experience.
          </p>
        </div>
        
        {/* Game Selector (Visible on larger screens) */}
        <div className="hidden md:flex justify-center space-x-4 mb-8">
          {games.map((game, index) => (
            <button
              key={index}
              onClick={() => setActiveGame(index)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeGame === index 
                  ? 'bg-red-500 text-white scale-105' 
                  : 'bg-black/50 border border-red-500/30 text-gray-300 hover:border-red-500/50'
              }`}
            >
              <span className="mr-2 inline-flex">{game.icon}</span>
              {game.name}
            </button>
          ))}
        </div>
        
        {/* Slider */}
        <div className="relative">
          <div className="backdrop-blur-lg bg-black/60 border border-red-900/20 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-red-900/20">
              <h3 className="text-2xl font-bold text-red-500 flex items-center">
                <span className="text-3xl mr-3">{games[activeGame].icon}</span>
                {games[activeGame].name}
              </h3>
              <div className="md:hidden flex items-center">
                <span className="text-gray-400 text-sm mr-2">{activeGame + 1}/{games.length}</span>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-300 mb-6">{games[activeGame].shortDesc}</p>
              
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mr-2">
                  <Shield className="w-4 h-4 text-red-500" />
                </span>
                Key Rules
              </h4>
              
              <div className="space-y-3">
                {games[activeGame].rules.slice(0, 5).map((rule, index) => (
                  <div 
                    key={index}
                    className="backdrop-blur-sm bg-black/30 border border-red-900/10 rounded-lg p-3 hover:border-red-500/30 transition-all flex"
                  >
                    <div className="text-red-500 font-bold mr-3 self-start">{index + 1}.</div>
                    <div className="text-gray-300">{rule}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button 
                  onClick={() => openFullRules(activeGame)}
                  className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-500 py-2 px-6 rounded-lg text-sm transition-colors inline-flex items-center"
                >
                  View All Rules 
                  <span className="ml-2 text-xs bg-red-500/30 rounded-full px-2 py-1">
                    {games[activeGame].rules.length}
                  </span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            onClick={prevGame}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black border border-red-500/50 flex items-center justify-center text-red-500 hover:bg-red-500/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={nextGame}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black border border-red-500/50 flex items-center justify-center text-red-500 hover:bg-red-500/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Pagination indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveGame(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeGame === index 
                  ? 'w-8 bg-red-500' 
                  : 'bg-red-500/30 hover:bg-red-500/50'
              }`}
              aria-label={`Go to game ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Full Rules Modal */}
      {showFullRules && selectedRules !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 border border-red-900/30 rounded-xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-red-900/30 flex justify-between items-center">
              <h3 className="text-xl font-bold text-red-500 flex items-center">
                <span className="text-2xl mr-2">{games[selectedRules].icon}</span>
                {games[selectedRules].name} - Complete Rulebook
              </h3>
              <button 
                onClick={closeFullRules}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="space-y-4">
                {games[selectedRules].rules.map((rule, index) => (
                  <div 
                    key={index}
                    className="backdrop-blur-sm bg-black/30 border border-red-900/10 rounded-lg p-4 hover:border-red-500/30 transition-all flex"
                  >
                    <div className="text-red-500 font-bold mr-3 self-start">{index + 1}.</div>
                    <div className="text-gray-300">{rule}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-red-900/30 flex justify-end">
              <button 
                onClick={closeFullRules}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg text-sm transition-colors"
              >
                Close Rulebook
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}