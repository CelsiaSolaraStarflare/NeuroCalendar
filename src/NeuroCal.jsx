import { useMemo, useState } from 'react';

const ICON_SHAPES = {
  calendar: [
    { type: 'path', attrs: { d: 'M8 2v4' } },
    { type: 'path', attrs: { d: 'M16 2v4' } },
    { type: 'rect', attrs: { width: 18, height: 18, x: 3, y: 4, rx: 2 } },
    { type: 'path', attrs: { d: 'M3 10h18' } },
  ],
  plus: [
    { type: 'path', attrs: { d: 'M5 12h14' } },
    { type: 'path', attrs: { d: 'M12 5v14' } },
  ],
  sparkles: [
    {
      type: 'path',
      attrs: {
        d: 'M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z',
      },
    },
    { type: 'path', attrs: { d: 'M20 2v4' } },
    { type: 'path', attrs: { d: 'M22 4h-4' } },
    { type: 'circle', attrs: { cx: 4, cy: 20, r: 2 } },
  ],
  refreshCw: [
    { type: 'path', attrs: { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' } },
    { type: 'path', attrs: { d: 'M21 3v5h-5' } },
    { type: 'path', attrs: { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' } },
    { type: 'path', attrs: { d: 'M8 16H3v5' } },
  ],
  chevronLeft: [{ type: 'path', attrs: { d: 'm15 18-6-6 6-6' } }],
  chevronRight: [{ type: 'path', attrs: { d: 'm9 18 6-6-6-6' } }],
  clock: [
    { type: 'path', attrs: { d: 'M12 6v6l4 2' } },
    { type: 'circle', attrs: { cx: 12, cy: 12, r: 10 } },
  ],
  check: [{ type: 'path', attrs: { d: 'M20 6 9 17l-5-5' } }],
  close: [
    { type: 'path', attrs: { d: 'M18 6 6 18' } },
    { type: 'path', attrs: { d: 'm6 6 12 12' } },
  ],
  zap: [
    {
      type: 'path',
      attrs: {
        d: 'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z',
      },
    },
  ],
  settings: [
    {
      type: 'path',
      attrs: {
        d: 'M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915',
      },
    },
    { type: 'circle', attrs: { cx: 12, cy: 12, r: 3 } },
  ],
  menu: [
    { type: 'path', attrs: { d: 'M4 5h16' } },
    { type: 'path', attrs: { d: 'M4 12h16' } },
    { type: 'path', attrs: { d: 'M4 19h16' } },
  ],
  moreHorizontal: [
    { type: 'circle', attrs: { cx: 12, cy: 12, r: 1 } },
    { type: 'circle', attrs: { cx: 19, cy: 12, r: 1 } },
    { type: 'circle', attrs: { cx: 5, cy: 12, r: 1 } },
  ],
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

const MOCK_APPLE_EVENTS = [
  {
    id: 1,
    title: 'Deep Work',
    dayIndex: 1,
    startHour: 9,
    duration: 2,
    type: 'work',
    color: 'bg-blue-100 border-blue-300 text-blue-700',
  },
  {
    id: 2,
    title: 'Team Sync',
    dayIndex: 1,
    startHour: 13,
    duration: 1,
    type: 'meeting',
    color: 'bg-purple-100 border-purple-300 text-purple-700',
  },
  {
    id: 3,
    title: 'Gym',
    dayIndex: 2,
    startHour: 7,
    duration: 1.5,
    type: 'personal',
    color: 'bg-green-100 border-green-300 text-green-700',
  },
  {
    id: 4,
    title: 'Doctor Appt',
    dayIndex: 3,
    startHour: 15,
    duration: 1,
    type: 'personal',
    color: 'bg-red-100 border-red-300 text-red-700',
  },
  {
    id: 5,
    title: 'Project Review',
    dayIndex: 4,
    startHour: 10,
    duration: 1,
    type: 'work',
    color: 'bg-blue-100 border-blue-300 text-blue-700',
  },
];

const Icon = ({ name, size = 20, className = '' }) => {
  const shapes = ICON_SHAPES[name] || [];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {shapes.map((shape, idx) => {
        if (shape.type === 'path') {
          return <path key={`${name}-path-${idx}`} d={shape.attrs.d} />;
        }
        if (shape.type === 'rect') {
          return <rect key={`${name}-rect-${idx}`} {...shape.attrs} />;
        }
        if (shape.type === 'circle') {
          return <circle key={`${name}-circle-${idx}`} {...shape.attrs} />;
        }
        return null;
      })}
    </svg>
  );
};

const formatHour = (value) => {
  const ampm = value >= 12 ? 'PM' : 'AM';
  const hour = value % 12 || 12;
  return `${hour} ${ampm}`;
};

function NeuroCal() {
  const [currentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isSynced, setIsSynced] = useState(false);
  const [inputStr, setInputStr] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [view, setView] = useState('week');
  const [suggestion, setSuggestion] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const weekDates = useMemo(() => {
    const curr = new Date(currentDate);
    const first = curr.getDate() - curr.getDay();
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(curr);
      day.setDate(first + i);
      return day;
    });
  }, [currentDate]);

  const now = new Date();
  const currentTimeOffset = now.getHours() * 60 + now.getMinutes();

  const handleSync = () => {
    if (isProcessing || isSynced) return;
    setIsProcessing(true);
    window.setTimeout(() => {
      setEvents([...MOCK_APPLE_EVENTS]);
      setIsSynced(true);
      setIsProcessing(false);
    }, 1500);
  };

  const checkAndAddEvent = (newEvent) => {
    const isOverlap = (existing, candidate) => {
      const existingStart = existing.startHour;
      const existingEnd = existing.startHour + existing.duration;
      const candidateStart = candidate.startHour;
      const candidateEnd = candidate.startHour + candidate.duration;
      return candidateStart < existingEnd && candidateEnd > existingStart;
    };

    const conflict = events.find(
      (event) => event.dayIndex === newEvent.dayIndex && isOverlap(event, newEvent)
    );

    if (conflict) {
      let suggestedHour = newEvent.startHour;
      let foundSlot = false;

      for (let hour = 9; hour < 18; hour += 1) {
        const isBlocked = events.some((event) => {
          if (event.dayIndex !== newEvent.dayIndex) return false;
          const hourEnd = hour + newEvent.duration;
          const eventEnd = event.startHour + event.duration;
          const overlapsThisHour =
            (hour >= event.startHour && hour < eventEnd) ||
            (hourEnd > event.startHour && hourEnd <= eventEnd);
          return overlapsThisHour;
        });

        if (!isBlocked && hour !== newEvent.startHour) {
          suggestedHour = hour;
          foundSlot = true;
          break;
        }
      }

      setSuggestion({
        original: newEvent,
        conflictWith: conflict,
        suggestedStart: foundSlot ? suggestedHour : null,
        message: `Conflict detected with "${conflict.title}".`,
      });
    } else {
      setEvents((prev) => [...prev, newEvent]);
    }
  };

  const handleAISubmit = (event) => {
    event.preventDefault();
    if (!inputStr.trim()) return;
    setIsProcessing(true);

    window.setTimeout(() => {
      const lowerInput = inputStr.toLowerCase();
      let dayIndex = new Date().getDay();
      let startHour = 9;
      let duration = 1;
      let title = 'New Event';

      if (lowerInput.includes('tomorrow')) dayIndex = (new Date().getDay() + 1) % 7;
      if (lowerInput.includes('monday')) dayIndex = 1;
      if (lowerInput.includes('tuesday')) dayIndex = 2;
      if (lowerInput.includes('wednesday')) dayIndex = 3;
      if (lowerInput.includes('thursday')) dayIndex = 4;
      if (lowerInput.includes('friday')) dayIndex = 5;
      if (lowerInput.includes('saturday')) dayIndex = 6;
      if (lowerInput.includes('sunday')) dayIndex = 0;

      const timeMatch = lowerInput.match(/(\d+)(?::00)?\s*(am|pm)/);
      if (timeMatch) {
        let hour = parseInt(timeMatch[1], 10);
        if (timeMatch[2] === 'pm' && hour !== 12) hour += 12;
        if (timeMatch[2] === 'am' && hour === 12) hour = 0;
        startHour = hour;
      }

      if (lowerInput.includes('2 hours') || lowerInput.includes('2 hrs')) duration = 2;
      if (lowerInput.includes('30 min')) duration = 0.5;

      const splitWord = lowerInput.includes(' at ')
        ? ' at '
        : lowerInput.includes(' on ')
        ? ' on '
        : null;

      if (splitWord) {
        title = inputStr.split(splitWord)[0];
        title = title.charAt(0).toUpperCase() + title.slice(1);
      } else {
        title = inputStr;
      }

      const newEvent = {
        id: Date.now(),
        title,
        dayIndex,
        startHour,
        duration,
        type: 'ai-generated',
        color: 'bg-indigo-100 border-indigo-300 text-indigo-700',
      };

      checkAndAddEvent(newEvent);
      setInputStr('');
      setIsProcessing(false);
    }, 1200);
  };

  const acceptSuggestion = () => {
    if (suggestion && suggestion.suggestedStart !== null) {
      const fixedEvent = { ...suggestion.original, startHour: suggestion.suggestedStart };
      setEvents((prev) => [...prev, fixedEvent]);
      setSuggestion(null);
    }
  };

  const forceOriginal = () => {
    if (suggestion) {
      setEvents((prev) => [...prev, suggestion.original]);
      setSuggestion(null);
    }
  };

  const eventStyle = (event) => {
    const top = event.startHour * 60;
    const height = event.duration * 60;
    return { top: `${top}px`, height: `${height}px` };
  };

  const todayString = now.toDateString();

  return (
    <div className="flex h-screen bg-white text-slate-800 font-sans overflow-hidden">
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-0 md:w-64'
        } transition-all duration-300 flex-shrink-0 bg-slate-50 border-r border-slate-200 flex flex-col h-full absolute md:relative z-20`}
      >
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
            <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center">
              <Icon name="sparkles" size={18} />
            </div>
            NeuroCal
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1">
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto flex-1">
          <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-sm">{now.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
              <div className="flex gap-1 text-slate-400">
                <Icon name="chevronLeft" size={16} />
                <Icon name="chevronRight" size={16} />
              </div>
            </div>
            <div className="grid grid-cols-7 text-center text-xs gap-y-3 text-slate-500">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                <span key={day}>{day}</span>
              ))}
              {Array.from({ length: 30 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-6 w-6 flex items-center justify-center rounded-full ${
                    i + 1 === now.getDate() ? 'bg-black text-white' : 'hover:bg-slate-100'
                  }`}
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Integrations</h3>
              {isProcessing && (
                <Icon name="refreshCw" size={12} className="text-slate-400 animate-spin" />
              )}
            </div>
            <button
              onClick={handleSync}
              disabled={isSynced}
              className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                isSynced
                  ? 'bg-green-100 text-green-700 cursor-default'
                  : 'bg-white shadow-sm text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {isSynced ? (
                <>
                  <Icon name="check" size={16} /> iCloud Synced
                </>
              ) : (
                <>
                  <Icon name="calendar" size={16} /> Sync Apple Calendar
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
              {isSynced
                ? 'AI is now analyzing your personal events to optimize your schedule.'
                : 'Connect to allow AI to see conflicts and free time slots.'}
            </p>
          </div>

          {isSynced && (
            <div className="space-y-3 animate-fade-in-up">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">AI Insights</h3>
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                <div className="flex items-center gap-2 text-indigo-700 mb-1">
                  <Icon name="zap" size={14} />
                  <span className="text-xs font-bold">Focus Time Found</span>
                </div>
                <p className="text-xs text-indigo-600">
                  You have a 3-hour gap on Wednesday afternoon. Great for deep work.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col h-full bg-white relative">
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 hover:bg-slate-100 rounded-lg">
              <Icon name="menu" size={20} />
            </button>
            <h2 className="text-xl font-semibold text-slate-800">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setView('day')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  view === 'day' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  view === 'week' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'
                }`}
              >
                Week
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
              <Icon name="settings" size={20} />
            </button>
            <div className="h-8 w-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full border-2 border-white shadow-sm" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden relative" id="calendar-grid">
          <div className="flex min-w-[800px]">
            <div className="w-16 flex-shrink-0 border-r border-slate-100 bg-slate-50/50 sticky left-0 z-10">
              <div className="h-10" />
              {HOURS.map((hour) => (
                <div key={hour} className="h-[60px] text-xs text-slate-400 text-right pr-3 -mt-2">
                  {formatHour(hour)}
                </div>
              ))}
            </div>

            <div className="flex-1">
              <div className="flex h-10 border-b border-slate-100 sticky top-0 bg-white z-10">
                {weekDates.map((date) => {
                  const dayKey = date.toISOString();
                  const isToday = date.toDateString() === todayString;
                  return (
                    <div
                      key={dayKey}
                      className={`flex-1 text-center border-r border-slate-50 last:border-none flex flex-col justify-center ${
                        isToday ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      <span className={`text-xs uppercase font-semibold ${isToday ? 'text-blue-600' : 'text-slate-400'}`}>
                        {DAYS[date.getDay()]}
                      </span>
                      <span className={`text-sm font-bold ${isToday ? 'text-blue-600' : 'text-slate-700'}`}>
                        {date.getDate()}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="relative flex">
                <div className="absolute inset-0 z-0 pointer-events-none w-full">
                  {HOURS.map((hour) => (
                    <div key={`grid-${hour}`} className="h-[60px] border-b border-slate-100 w-full" />
                  ))}
                </div>

                {weekDates.map((date) => (
                  <div key={date.toISOString()} className="flex-1 relative border-r border-slate-50 min-h-[1440px]">
                    {events
                      .filter((event) => event.dayIndex === date.getDay())
                      .map((event) => (
                        <div
                          key={event.id}
                          style={eventStyle(event)}
                          className={`absolute inset-x-1 rounded-lg p-2 border shadow-sm text-xs transition-all hover:scale-[1.02] hover:z-10 cursor-pointer overflow-hidden flex flex-col ${event.color}`}
                        >
                          <div className="font-semibold truncate">{event.title}</div>
                          <div className="opacity-75">
                            {formatHour(event.startHour)} - {formatHour(event.startHour + event.duration)}
                          </div>
                          {event.type === 'ai-generated' && (
                            <div className="mt-auto flex items-center gap-1 text-[10px] opacity-100 font-bold">
                              <Icon name="sparkles" size={8} /> AI Added
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ))}

                <div
                  className="absolute left-0 right-0 border-t-2 border-red-400 z-0 pointer-events-none"
                  style={{ top: `${currentTimeOffset}px` }}
                >
                  <div className="absolute -left-2 -top-1.5 w-3 h-3 bg-red-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl shadow-2xl rounded-2xl z-30">
          {suggestion && (
            <div className="bg-white rounded-t-2xl p-4 border-b border-slate-100 animate-slide-up flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
                  <Icon name="clock" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-800">Schedule Conflict Detected</h4>
                  <p className="text-xs text-slate-500">{suggestion.message}</p>
                  {suggestion.suggestedStart !== null && (
                    <p className="text-xs text-green-600 mt-1 font-medium">
                      AI Suggestion: Move to {formatHour(suggestion.suggestedStart)}?
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button
                  onClick={forceOriginal}
                  className="flex-1 md:flex-none px-3 py-2 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg"
                >
                  Keep Original
                </button>
                {suggestion.suggestedStart !== null && (
                  <button
                    onClick={acceptSuggestion}
                    className="flex-1 md:flex-none px-3 py-2 text-xs font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm shadow-green-200"
                  >
                    Accept New Time
                  </button>
                )}
                <button onClick={() => setSuggestion(null)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                  <Icon name="close" size={16} />
                </button>
              </div>
            </div>
          )}

          <form
            onSubmit={handleAISubmit}
            className={`bg-white/90 backdrop-blur-xl border border-slate-200 p-2 flex items-center gap-3 transition-all ${
              suggestion ? 'rounded-b-2xl' : 'rounded-2xl'
            }`}
          >
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white flex-shrink-0">
              {isProcessing ? <Icon name="refreshCw" className="animate-spin" size={20} /> : <Icon name="sparkles" size={20} />}
            </div>
            <input
              type="text"
              value={inputStr}
              onChange={(e) => setInputStr(e.target.value)}
              placeholder="Ask AI: 'Lunch with Mom tomorrow at 1pm' or 'Find time for gym'"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400 h-10"
            />
            <div className="flex items-center gap-1 pr-2">
              <span className="hidden md:inline text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded">⌘ K</span>
              <button
                type="submit"
                className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
              >
                <Icon name="plus" size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NeuroCal;
