"use client";

import { useState } from "react";
import type { GeneratedProject } from "./ClientIntake";

type OperationsBriefingProps = {
  open: boolean;
  project: GeneratedProject | null;
  onClose: () => void;
};

const timeline = [
  { time: "7:45 AM", action: "Depart for the property" },
  { time: "8:20 AM", action: "Arrive and complete site assessment" },
  { time: "8:30 AM", action: "Aircraft inspection and pre-flight setup" },
  { time: "8:45 AM", action: "Capture essential aerial photographs" },
  { time: "9:30 AM", action: "Record smooth property orbit" },
  { time: "10:00 AM", action: "Verify coverage and back up media" },
  { time: "1:00 PM", action: "Edit and prepare preview assets" },
  { time: "4:30 PM", action: "Deliver client preview package" },
];

const equipment = [
  "DJI Mini 4 Pro",
  "RC 2 controller",
  "Three charged flight batteries",
  "ND filter set",
  "Formatted memory cards",
  "Landing pad",
  "Phone and charging cable",
  "Backup storage drive",
];

const risks = [
  {
    title: "Wind conditions",
    detail:
      "Complete exterior flight operations early before afternoon winds increase.",
  },
  {
    title: "Airspace verification",
    detail:
      "Confirm operating restrictions and authorization requirements before departure.",
  },
  {
    title: "Battery reserve",
    detail:
      "Land each flight with sufficient reserve capacity and keep one battery unused for contingency coverage.",
  },
];

export default function OperationsBriefing({
  open,
  project,
  onClose,
}: OperationsBriefingProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [briefingReady, setBriefingReady] = useState(false);

  const clientName = project?.clientName.trim() || "Harper Realty";
  const projectType =
    project?.projectType.trim() || "Residential Real Estate";
  const location = project?.location.trim() || "Lubbock, Texas";
  const projectTitle =
    project?.plan.projectTitle || "Harper Property Aerial Package";
  const recommendedPackage =
    project?.plan.recommendedPackage || "Essential Listing Package";

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

  if (!open) {
    return null;
  }

  function generateBriefing() {
    setBriefingReady(false);
    setIsGenerating(true);

    window.setTimeout(() => {
      setIsGenerating(false);
      setBriefingReady(true);
    }, 1100);
  }

  function closeBriefing() {
    setIsGenerating(false);
    setBriefingReady(false);
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
              Local Operations Engine
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
              CT will organize the assignment into a timeline,
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
              className="mt-8 w-full rounded-xl bg-blue-500 px-6 py-4 text-lg font-semibold shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-400 sm:w-auto"
            >
              Generate Operations Briefing
            </button>
          </section>
        )}

        {isGenerating && (
          <section className="flex min-h-[32rem] items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/70">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-blue-400" />

              <h2 className="mt-6 text-2xl font-bold">
                Organizing today&apos;s mission
              </h2>

              <p className="mt-3 text-slate-400">
                Analyzing timing, requirements, risks, and next actions.
              </p>
            </div>
          </section>
        )}

        {briefingReady && !isGenerating && (
          <div className="space-y-6">
            <section className="rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/20 via-slate-900 to-slate-900 p-7">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-semibold text-blue-300">
                    TODAY&apos;S PRIMARY OBJECTIVE
                  </p>

                  <h2 className="mt-3 max-w-3xl text-3xl font-bold">
                    Complete the {projectType.toLowerCase()} assignment
                    for {clientName} and deliver polished assets by{" "}
                    {deadlineLabel}.
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
                  {timeline.map((item) => (
                    <div
                      key={`${item.time}-${item.action}`}
                      className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
                    >
                      <p className="w-20 shrink-0 text-sm font-semibold text-blue-300">
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
                    {estimatedInvoice}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-emerald-100/70">
                    Estimated invoice for the{" "}
                    {recommendedPackage.toLowerCase()}.
                  </p>
                </section>

                <section className="rounded-3xl border border-blue-400/20 bg-blue-500/10 p-6">
                  <p className="text-xs font-semibold tracking-widest text-blue-300">
                    RECOMMENDED FIRST ACTION
                  </p>

                  <p className="mt-3 text-xl font-bold">
                    Leave by 7:45 AM.
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    This protects the best lighting window and reduces
                    exposure to stronger afternoon winds.
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
                  {equipment.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xs font-bold text-blue-300">
                        ✓
                      </span>

                      <p className="text-sm text-slate-300">{item}</p>
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
                  {risks.map((risk) => (
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
