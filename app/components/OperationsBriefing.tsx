"use client";

import { useState } from "react";
import type { GeneratedProject } from "./ClientIntake";

type OperationsBriefingProps = {
  open: boolean;
  project: GeneratedProject | null;
  onClose: () => void;
};

type TimelineItem = {
  time: string;
  action: string;
};

type RiskItem = {
  title: string;
  detail: string;
};

type BriefingData = {
  objective: string;
  timeline: TimelineItem[];
  equipment: string[];
  risks: RiskItem[];
  revenueOpportunity: {
    amount: string;
    rationale: string;
  };
  firstAction: {
    action: string;
    reason: string;
  };
};

type BriefingResponse = {
  briefing: BriefingData;
  mode: "live";
  model: string;
  requestId?: string;
};

type GenerationMode = "idle" | "live" | "fallback";

export default function OperationsBriefing({
  open,
  project,
  onClose,
}: OperationsBriefingProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [briefingReady, setBriefingReady] = useState(false);
  const [briefing, setBriefing] = useState<BriefingData | null>(null);
  const [generationMode, setGenerationMode] =
    useState<GenerationMode>("idle");
  const [generationMessage, setGenerationMessage] =
    useState<string | null>(null);

  const clientName = project?.clientName.trim() || "Demo Client";
  const projectType =
    project?.projectType.trim() || "Residential Real Estate";
  const location = project?.location.trim() || "Lubbock, Texas";
  const projectTitle =
    project?.plan.projectTitle ||
    "Demo Client — Residential Real Estate";
  const recommendedPackage =
    project?.plan.recommendedPackage || "Essential Listing Package";
  const projectNotes =
    project?.notes.trim() || "No additional client notes.";

  const deadlineLabel = project?.deadline
    ? new Date(`${project.deadline}T12:00:00`).toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        },
      )
    : "close of business";

  const estimatedInvoice =
    projectType === "Residential Real Estate"
      ? "$150"
      : projectType === "Commercial Property"
        ? "$350"
        : projectType === "Ranch or Land"
          ? "$650+"
          : projectType === "Construction Progress"
            ? "$350"
            : "$250+";

  const localFallback: BriefingData = {
    objective:
      `Complete the ${projectType.toLowerCase()} assignment for ` +
      `${clientName} and prepare the agreed deliverables by ${deadlineLabel}.`,
    timeline: [
      {
        time: "7:45 AM",
        action: "Confirm the client scope, location, and deliverables.",
      },
      {
        time: "8:00 AM",
        action: "Check weather, airspace, access, and operating restrictions.",
      },
      {
        time: "8:30 AM",
        action: "Inspect equipment and complete the field setup.",
      },
      {
        time: "8:45 AM",
        action: "Capture the required photographs and video assets.",
      },
      {
        time: "10:00 AM",
        action: "Verify coverage and back up all original media.",
      },
      {
        time: "1:00 PM",
        action: "Edit, organize, and export the client deliverables.",
      },
      {
        time: "4:30 PM",
        action: "Send the preview or completed delivery package.",
      },
    ],
    equipment: [
      "Primary aircraft",
      "Remote controller",
      "Charged flight batteries",
      "Formatted memory cards",
      "ND filter set",
      "Landing pad",
      "Phone and charging cable",
      "Backup storage drive",
    ],
    risks: [
      {
        title: "Weather conditions",
        detail:
          "Check current and forecast conditions before beginning field operations.",
      },
      {
        title: "Airspace and authorization",
        detail:
          "Verify applicable airspace, restrictions, and authorization requirements.",
      },
      {
        title: "Client scope",
        detail:
          "Confirm access, property boundaries, required deliverables, and delivery expectations.",
      },
    ],
    revenueOpportunity: {
      amount: estimatedInvoice,
      rationale:
        `Estimated value for the ${recommendedPackage.toLowerCase()}. ` +
        "Final pricing should be confirmed against the approved scope.",
    },
    firstAction: {
      action: `Confirm the assignment details with ${clientName}.`,
      reason:
        "The location, access, deliverables, and operating window should be verified before field preparation begins.",
    },
  };

  if (!open) {
    return null;
  }

  async function generateBriefing() {
    setBriefingReady(false);
    setBriefing(null);
    setGenerationMode("idle");
    setGenerationMessage(null);
    setIsGenerating(true);

    try {
      const response = await fetch("/api/briefing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientName,
          projectType,
          location,
          deadline: project?.deadline || "",
          notes: projectNotes,
          recommendedPackage,
        }),
      });

      if (!response.ok) {
        throw new Error(`Briefing request failed: ${response.status}`);
      }

      const result = (await response.json()) as BriefingResponse;

      setBriefing(result.briefing);
      setGenerationMode("live");
      setGenerationMessage(
        "This briefing was generated live by GPT-5.6.",
      );
    } catch (error) {
      console.error("Live briefing generation failed.", error);

      setBriefing(localFallback);
      setGenerationMode("fallback");
      setGenerationMessage(
        "Live AI was unavailable, so CT continued with its local operations engine.",
      );
    } finally {
      setIsGenerating(false);
      setBriefingReady(true);
    }
  }

  function closeBriefing() {
    setIsGenerating(false);
    setBriefingReady(false);
    setBriefing(null);
    setGenerationMode("idle");
    setGenerationMessage(null);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 px-4 py-6 text-white backdrop-blur-sm sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-400">
              DAILY COMMAND
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Operations Briefing
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Convert the active mission into a focused operating plan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-200">
              {generationMode === "live"
                ? "Live · GPT-5.6"
                : generationMode === "fallback"
                  ? "Local fallback"
                  : "GPT-5.6 · Fallback ready"}
            </span>

            <button
              type="button"
              onClick={closeBriefing}
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              Return to Mission Control
            </button>
          </div>
        </header>

        {!briefingReady && !isGenerating && (
          <section className="rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/15 via-slate-900 to-slate-900 p-7 sm:p-10">
            <p className="text-sm font-semibold text-blue-300">
              ACTIVE MISSION
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              {projectTitle}
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-slate-300">
              GPT-5.6 will organize the assignment into a timeline,
              equipment plan, risk assessment, revenue opportunity,
              and recommended first action.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-5">
                <p className="text-xs text-slate-500">CLIENT</p>
                <p className="mt-2 font-semibold">{clientName}</p>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-5">
                <p className="text-xs text-slate-500">LOCATION</p>
                <p className="mt-2 font-semibold">{location}</p>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-5">
                <p className="text-xs text-slate-500">PRIORITY</p>
                <p className="mt-2 font-semibold text-amber-300">
                  High
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={generateBriefing}
              className="mt-8 w-full rounded-xl bg-emerald-500 px-6 py-4 text-lg font-semibold shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-400 sm:w-auto"
            >
              Generate Live Briefing
            </button>
          </section>
        )}

        {isGenerating && (
          <section className="flex min-h-[32rem] items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/70 px-6">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-emerald-400" />

              <h2 className="mt-6 text-2xl font-bold">
                GPT-5.6 is organizing the mission
              </h2>

              <p className="mt-3 text-slate-400">
                Analyzing timing, requirements, risks, and next actions.
              </p>
            </div>
          </section>
        )}

        {briefingReady && briefing && !isGenerating && (
          <div className="space-y-6">
            {generationMessage && (
              <section
                className={`rounded-2xl border p-4 ${
                  generationMode === "live"
                    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                    : "border-amber-400/20 bg-amber-400/10 text-amber-100"
                }`}
              >
                <p className="text-sm font-medium">
                  {generationMessage}
                </p>
              </section>
            )}

            <section className="rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/20 via-slate-900 to-slate-900 p-7">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-semibold text-blue-300">
                    TODAY&apos;S PRIMARY OBJECTIVE
                  </p>

                  <h2 className="mt-3 max-w-3xl text-3xl font-bold">
                    {briefing.objective}
                  </h2>
                </div>

                <span className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
                  Mission ready
                </span>
              </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-12">
              <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 lg:col-span-7">
                <p className="font-semibold">Mission Timeline</p>
                <p className="mt-1 text-sm text-slate-500">
                  Recommended sequence for efficient execution
                </p>

                <div className="mt-6 space-y-3">
                  {briefing.timeline.map((item) => (
                    <div
                      key={`${item.time}-${item.action}`}
                      className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
                    >
                      <p className="w-28 shrink-0 text-sm font-semibold text-blue-300">
                        {item.time}
                      </p>

                      <p className="text-sm leading-6 text-slate-300">
                        {item.action}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="space-y-6 lg:col-span-5">
                <section className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6">
                  <p className="text-xs font-semibold tracking-widest text-emerald-300">
                    REVENUE OPPORTUNITY
                  </p>

                  <p className="mt-3 text-4xl font-bold">
                    {briefing.revenueOpportunity.amount}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-emerald-100/70">
                    {briefing.revenueOpportunity.rationale}
                  </p>
                </section>

                <section className="rounded-3xl border border-blue-400/20 bg-blue-500/10 p-6">
                  <p className="text-xs font-semibold tracking-widest text-blue-300">
                    RECOMMENDED FIRST ACTION
                  </p>

                  <p className="mt-3 text-xl font-bold">
                    {briefing.firstAction.action}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {briefing.firstAction.reason}
                  </p>
                </section>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                <p className="font-semibold">Equipment Plan</p>
                <p className="mt-1 text-sm text-slate-500">
                  Required field-production equipment
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {briefing.equipment.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xs font-bold text-blue-300">
                        ✓
                      </span>

                      <p className="text-sm text-slate-300">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                <p className="font-semibold">Risk Assessment</p>
                <p className="mt-1 text-sm text-slate-500">
                  Conditions requiring attention
                </p>

                <div className="mt-6 space-y-3">
                  {briefing.risks.map((risk) => (
                    <div
                      key={risk.title}
                      className="rounded-2xl border border-amber-400/15 bg-amber-400/5 p-4"
                    >
                      <p className="font-medium text-amber-200">
                        {risk.title}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {risk.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={generateBriefing}
                className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
              >
                Regenerate Briefing
              </button>

              <button
                type="button"
                onClick={closeBriefing}
                className="rounded-xl bg-blue-500 px-5 py-3 font-semibold transition hover:bg-blue-400"
              >
                Briefing Complete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
