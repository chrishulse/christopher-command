"use client";

import { useState } from "react";

type OperationsTool = "briefing" | "client" | "mission" | "marketing";

const workflowSteps = [
  {
    number: "01",
    title: "Plan",
    description:
      "Turn priorities and responsibilities into one focused daily brief.",
  },
  {
    number: "02",
    title: "Execute",
    description:
      "Generate the checklists, documents, and workflows needed to begin.",
  },
  {
    number: "03",
    title: "Advance",
    description:
      "Track progress and identify the next action that creates momentum.",
  },
];

const priorities = [
  {
    task: "Prepare Harper Property mission",
    status: "Ready",
    time: "8:30 AM",
  },
  {
    task: "Deliver Wilson listing package",
    status: "In progress",
    time: "11:00 AM",
  },
  {
    task: "Follow up with new prospect",
    status: "Queued",
    time: "2:00 PM",
  },
];

const operationsTools: Record<
  OperationsTool,
  {
    label: string;
    title: string;
    description: string;
    steps: string[];
    action: string;
  }
> = {
  briefing: {
    label: "Daily Command",
    title: "Operations Briefing",
    description:
      "Organize today’s responsibilities into one focused operating plan.",
    steps: [
      "Identify the primary mission",
      "Rank time-sensitive tasks",
      "Protect the best work window",
      "Select the next concrete action",
    ],
    action: "Generate Briefing",
  },

  client: {
    label: "Client Operations",
    title: "New Client Intake",
    description:
      "Convert a basic customer request into a structured project package.",
    steps: [
      "Capture client and project details",
      "Recommend the correct service",
      "Generate a project scope",
      "Prepare follow-up tasks",
    ],
    action: "Create Client Package",
  },

  mission: {
    label: "Field Operations",
    title: "Mission Planner",
    description:
      "Prepare the schedule, equipment, travel, and production requirements.",
    steps: [
      "Review the assignment location",
      "Estimate batteries and storage",
      "Build the equipment checklist",
      "Organize the production sequence",
    ],
    action: "Build Mission Plan",
  },

  marketing: {
    label: "Growth Operations",
    title: "Marketing Studio",
    description:
      "Transform completed work into useful business-development content.",
    steps: [
      "Create social captions",
      "Draft a Google Business update",
      "Generate image descriptions",
      "Prepare a client follow-up",
    ],
    action: "Generate Campaign",
  },
};

export default function Home() {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [activeTool, setActiveTool] =
    useState<OperationsTool>("briefing");
  const [actionComplete, setActionComplete] = useState(false);

  const selectedTool = operationsTools[activeTool];

  function selectTool(tool: OperationsTool) {
    setActiveTool(tool);
    setActionComplete(false);
  }

  if (!dashboardOpen) {
    return (
      <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
        <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 font-bold shadow-lg shadow-blue-500/20">
                CT
              </div>

              <div>
                <p className="font-semibold tracking-tight">
                  ChrisTopher Command
                </p>
                <p className="text-xs text-slate-500">
                  AI Operations Center
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-slate-400 sm:inline-flex">
                OpenAI Build Week MVP
              </span>

              <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                System Ready
              </span>
            </div>
          </nav>
        </header>

        <section className="relative isolate">
          <div className="absolute left-1/2 top-[-12rem] -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="absolute bottom-[-10rem] right-[-8rem] -z-10 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="mx-auto flex min-h-[calc(100vh-81px)] max-w-7xl flex-col justify-center px-6 py-20">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-7 inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300">
                AI operations for people building alone
              </div>

              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
                Turn business chaos into
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  organized execution.
                </span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                One command center for planning missions, managing
                clients, creating deliverables, and deciding what
                matters next.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setDashboardOpen(true)}
                  className="rounded-xl bg-blue-500 px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-400"
                >
                  Start My Day
                </button>

                <p className="text-sm text-slate-500">
                  Demo workspace · No account required
                </p>
              </div>
            </div>

            <div className="mx-auto mt-16 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
              {workflowSteps.map((step) => (
                <article
                  key={step.number}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-blue-400/30 hover:bg-slate-900"
                >
                  <p className="text-xs font-bold tracking-widest text-blue-400">
                    {step.number}
                  </p>

                  <h2 className="mt-4 text-lg font-semibold">
                    {step.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 font-bold shadow-lg shadow-blue-500/20">
              CT
            </div>

            <div>
              <p className="font-semibold">ChrisTopher Command</p>
              <p className="text-xs text-slate-500">
                Solo Operator Workspace
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDashboardOpen(false)}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            Exit Dashboard
          </button>
        </nav>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold tracking-wider text-blue-400">
              MISSION CONTROL
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Good evening, Chris.
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Your work has been organized around the mission most
              likely to create forward movement.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3">
            <p className="text-xs font-semibold text-emerald-300">
              SYSTEM STATUS
            </p>
            <p className="mt-1 text-sm text-emerald-100">
              Operations ready
            </p>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-12">
          <section className="space-y-6 lg:col-span-8">
            <article className="overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/15 via-slate-900 to-slate-900 p-7">
              <p className="text-sm font-semibold text-blue-300">
                TODAY&apos;S PRIMARY MISSION
              </p>

              <div className="mt-4 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                  <h2 className="text-3xl font-bold">
                    Harper Property Aerial Package
                  </h2>

                  <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                    Capture the essential listing images, complete one
                    smooth property orbit, and prepare same-day preview
                    assets.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => selectTool("mission")}
                  className="shrink-0 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-blue-100"
                >
                  Open Mission
                </button>
              </div>

              <div className="mt-7 grid gap-4 border-t border-slate-700/70 pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-slate-500">START</p>
                  <p className="mt-1 font-medium">8:30 AM</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    CONDITIONS
                  </p>
                  <p className="mt-1 font-medium">
                    Flight window favorable
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    ESTIMATED TIME
                  </p>
                  <p className="mt-1 font-medium">55 minutes</p>
                </div>
              </div>
            </article>

            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Priority Timeline</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Three important actions
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
                    Today
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {priorities.map((priority) => (
                    <div
                      key={priority.task}
                      className="flex items-start justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
                    >
                      <div>
                        <p className="font-medium">
                          {priority.task}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {priority.status}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm text-slate-400">
                        {priority.time}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                <p className="font-semibold">Business Pulse</p>
                <p className="mt-1 text-sm text-slate-500">
                  Current demo workspace
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  {[
                    ["2", "Active projects"],
                    ["3", "Open leads"],
                    ["1", "Delivery due"],
                    ["4", "Content assets"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
                    >
                      <p className="text-2xl font-bold text-blue-300">
                        {value}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          <aside className="lg:col-span-4">
            <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 lg:sticky lg:top-6">
              <p className="text-xs font-semibold tracking-widest text-blue-400">
                {selectedTool.label.toUpperCase()}
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                {selectedTool.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {selectedTool.description}
              </p>

              <div className="mt-6 space-y-3">
                {selectedTool.steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xs font-semibold text-blue-300">
                      {index + 1}
                    </span>

                    <p className="text-sm leading-6 text-slate-300">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setActionComplete(true)}
                className="mt-6 w-full rounded-xl bg-blue-500 px-5 py-3 font-semibold transition hover:bg-blue-400"
              >
                {actionComplete
                  ? "Demo Output Ready"
                  : selectedTool.action}
              </button>

              {actionComplete && (
                <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                  <p className="text-sm font-semibold text-emerald-200">
                    Workflow prepared
                  </p>
                  <p className="mt-1 text-xs leading-5 text-emerald-100/70">
                    The interface is ready for live OpenAI generation
                    in the next development stage.
                  </p>
                </div>
              )}

              <div className="mt-7 border-t border-slate-800 pt-6">
                <p className="mb-3 text-xs font-semibold text-slate-500">
                  AI OPERATIONS TOOLS
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(operationsTools) as OperationsTool[]).map(
                    (tool) => (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => selectTool(tool)}
                        className={`rounded-xl border px-3 py-3 text-left text-xs font-medium transition ${
                          activeTool === tool
                            ? "border-blue-400/40 bg-blue-500/15 text-blue-200"
                            : "border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700 hover:text-white"
                        }`}
                      >
                        {operationsTools[tool].title}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </article>
          </aside>
        </div>
      </div>
    </main>
  );
}