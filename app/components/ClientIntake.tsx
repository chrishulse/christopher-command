"use client";

import { FormEvent, useRef, useState } from "react";

type ClientIntakeProps = {
  open: boolean;
  onClose: () => void;
  onProjectGenerated: (project: GeneratedProject) => void;
};

export type FormState = {
  clientName: string;
  projectType: string;
  location: string;
  deadline: string;
  notes: string;
};

export type DemoPlan = {
  projectTitle: string;
  executiveSummary: string;
  recommendedPackage: string;
  projectScope: string[];
  shotList: string[];
  checklist: string[];
  deliveryPlan: string[];
  followUpTasks: string[];
};

export type GeneratedProject = FormState & {
  plan: DemoPlan;
};

const initialForm: FormState = {
  clientName: "",
  projectType: "",
  location: "",
  deadline: "",
  notes: "",
};

function createDemoPlan(form: FormState): DemoPlan {
  const client = form.clientName.trim();
  const projectType = form.projectType.trim();
  const location = form.location.trim();
  const deadline = form.deadline.trim();

  return {
    projectTitle: `${client} — ${projectType}`,
    executiveSummary:
      `Prepare and deliver a focused ${projectType.toLowerCase()} package for ${client} at ${location}. ` +
      `The project should prioritize efficient field execution, clear client communication, and delivery by ${deadline}.`,
    recommendedPackage:
      projectType === "Residential Real Estate"
        ? "Essential Listing Package"
        : projectType === "Commercial Property"
          ? "Commercial Visual Media Package"
          : projectType === "Ranch or Land"
            ? "Land and Property Overview Package"
            : "Custom Aerial Media Package",
    projectScope: [
      `Confirm the client’s goals and required deliverables`,
      `Review the location and identify major visual priorities`,
      `Prepare the field-production and equipment plan`,
      `Capture the agreed aerial photo and video assets`,
      `Organize, edit, and deliver the finished media package`,
    ],
    shotList: [
      `Wide establishing view of ${location}`,
      "Front approach and primary property orientation",
      "Elevated three-quarter perspective",
      "Opposite-side coverage for complete context",
      "Top-down or near-vertical overview where appropriate",
      "Key structures, improvements, or selling features",
      "Surrounding roads, access points, and nearby context",
      "One smooth orbital video around the primary subject",
    ],
    checklist: [
      "Confirm client authorization and property access",
      "Check applicable airspace and operating restrictions",
      "Review current and forecast weather conditions",
      "Inspect aircraft, controller, propellers, and memory cards",
      "Charge and label all required batteries",
      "Confirm camera settings and shot requirements",
      "Establish a safe takeoff and landing area",
      "Complete final on-site risk assessment before launch",
    ],
    deliveryPlan: [
      "Back up all original media immediately after the assignment",
      "Select and edit the strongest client-facing assets",
      "Export files using clearly labeled delivery folders",
      `Deliver the completed package by ${deadline}`,
    ],
    followUpTasks: [
      "Send the client a project confirmation",
      "Confirm receipt of the finished deliverables",
      "Request feedback or a testimonial",
      "Prepare one approved portfolio or social-media example",
    ],
  };
}

function PlanSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <h3 className="font-semibold text-white">{title}</h3>

      <div className="mt-4 space-y-3">
        {items.map((item, index) => (
          <div key={item} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xs font-semibold text-blue-300">
              {index + 1}
            </span>

            <p className="text-sm leading-6 text-slate-300">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ClientIntake({
  open,
  onClose,
  onProjectGenerated,
}: ClientIntakeProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [plan, setPlan] = useState<DemoPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const generationTimeoutRef = useRef<number | null>(null);

  if (!open) {
    return null;
  }

  function updateField(
    field: keyof FormState,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPlan(null);
    setIsGenerating(true);

    generationTimeoutRef.current = window.setTimeout(() => {
      const generatedPlan = createDemoPlan(form);

      setPlan(generatedPlan);
      onProjectGenerated({
        ...form,
        plan: generatedPlan,
      });
      setIsGenerating(false);
      generationTimeoutRef.current = null;
    }, 900);
  }

  function closeIntake() {
    if (generationTimeoutRef.current !== null) {
      window.clearTimeout(generationTimeoutRef.current);
      generationTimeoutRef.current = null;
    }
    setIsGenerating(false);
    onClose();
  }

  function resetWorkspace() {
    setForm(initialForm);
    setPlan(null);
    setIsGenerating(false);
  }

  const formComplete =
    form.clientName.trim() &&
    form.projectType.trim() &&
    form.location.trim() &&
    form.deadline.trim();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="client-intake-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 px-4 py-6 backdrop-blur-sm sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest text-blue-400">
              CLIENT OPERATIONS
            </p>

            <h1 id="client-intake-title" className="mt-2 text-3xl font-bold">
              New Client Intake
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Convert a client request into a structured project package.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs font-medium text-amber-200">
              Demo mode · Generated locally
            </span>

            <button
              type="button"
              onClick={closeIntake}
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              Return to Mission Control
            </button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-12">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 lg:col-span-4"
          >
            <h2 className="text-xl font-bold">Project details</h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Enter the minimum information needed to prepare the
              assignment.
            </p>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-300">
                  Client name
                </span>

                <input
                  required
                  maxLength={100}
                  autoComplete="name"
                  value={form.clientName}
                  onChange={(event) =>
                    updateField("clientName", event.target.value)
                  }
                  placeholder="Demo Client"
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-300">
                  Project type
                </span>

                <select
                  required
                  value={form.projectType}
                  onChange={(event) =>
                    updateField("projectType", event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-400"
                >
                  <option value="">Select a service</option>
                  <option value="Residential Real Estate">
                    Residential Real Estate
                  </option>
                  <option value="Commercial Property">
                    Commercial Property
                  </option>
                  <option value="Ranch or Land">
                    Ranch or Land
                  </option>
                  <option value="Construction Progress">
                    Construction Progress
                  </option>
                  <option value="Custom Media Project">
                    Custom Media Project
                  </option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-300">
                  Location
                </span>

                <input
                  required
                  maxLength={150}
                  autoComplete="street-address"
                  value={form.location}
                  onChange={(event) =>
                    updateField("location", event.target.value)
                  }
                  placeholder="Lubbock, Texas"
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-300">
                  Delivery deadline
                </span>

                <input
                  required
                  type="date"
                  value={form.deadline}
                  onChange={(event) =>
                    updateField("deadline", event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-400"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-300">
                  Client notes
                </span>

                <textarea
                  value={form.notes}
                  maxLength={800}
                  onChange={(event) =>
                    updateField("notes", event.target.value)
                  }
                  placeholder="Five to ten aerial images and one smooth orbit video."
                  rows={4}
                  className="mt-2 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={!formComplete || isGenerating}
              className="mt-6 w-full rounded-xl bg-blue-500 px-5 py-3 font-semibold transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              {isGenerating
                ? "Building project package..."
                : "Generate Demo Project"}
            </button>

            <button
              type="button"
              onClick={resetWorkspace}
              className="mt-3 w-full rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              Clear Workspace
            </button>
          </form>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 lg:col-span-8">
            {!plan && !isGenerating && (
              <div className="flex min-h-[34rem] items-center justify-center">
                <div className="max-w-md text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-xl font-bold text-blue-300">
                    CT
                  </div>

                  <h2 className="mt-5 text-2xl font-bold">
                    Project package awaiting input
                  </h2>

                  <p className="mt-3 leading-7 text-slate-400">
                    Complete the client form to generate a project
                    scope, shot list, field checklist, delivery plan,
                    and follow-up workflow.
                  </p>
                </div>
              </div>
            )}

            {isGenerating && (
              <div className="flex min-h-[34rem] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-400" />

                  <h2 className="mt-5 text-xl font-semibold">
                    Organizing the assignment
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Building the scope, shot list, and operating
                    checklist.
                  </p>
                </div>
              </div>
            )}

            {plan && !isGenerating && (
              <div>
                <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-6">
                  <p className="text-xs font-semibold tracking-widest text-blue-300">
                    PROJECT PACKAGE READY
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    {plan.projectTitle}
                  </h2>

                  <p className="mt-3 leading-7 text-slate-300">
                    {plan.executiveSummary}
                  </p>

                  <div className="mt-5 inline-flex rounded-full border border-blue-400/20 bg-slate-950/40 px-4 py-2 text-sm text-blue-200">
                    Recommended: {plan.recommendedPackage}
                  </div>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <PlanSection
                    title="Project Scope"
                    items={plan.projectScope}
                  />

                  <PlanSection
                    title="Shot List"
                    items={plan.shotList}
                  />

                  <PlanSection
                    title="Field Checklist"
                    items={plan.checklist}
                  />

                  <PlanSection
                    title="Delivery Plan"
                    items={plan.deliveryPlan}
                  />
                </div>

                <div className="mt-5">
                  <PlanSection
                    title="Follow-Up Tasks"
                    items={plan.followUpTasks}
                  />
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
