# ChrisTopher Command

**The AI operations center for solo operators.**

> Turn business chaos into organized execution.

ChrisTopher Command, or **CT**, helps independent professionals turn a basic client request into an organized project, identify the mission that matters most, and generate an actionable daily operations briefing.

CT is designed as a cockpit rather than another passive dashboard: it helps the operator determine what to do next.

## Live Demo

**Application:** https://christopher-command.vercel.app/

**Source Code:** https://github.com/chrishulse/christopher-command

## The Problem

Running a business alone means acting as the salesperson, project manager, scheduler, production team, and client-service department at the same time.

Important information becomes scattered across:

- Notes
- Messages
- Calendars
- Checklists
- Client files
- Project-management tools
- AI conversations

The operator still has to decide what matters, organize the work, and translate information into action.

## The Solution

ChrisTopher Command brings those decisions into one focused workflow:

```text
Client Request
      ↓
Structured Project Package
      ↓
Mission Control
      ↓
Live GPT-5.6 Operations Briefing
      ↓
Recommended Next Action
```

The current Build Week release demonstrates one complete journey from client intake to execution planning.

## Core Experience

### Mission Control

Mission Control gives the operator a clear view of:

- The current primary mission
- Priority actions
- Business activity
- Available operations tools
- The next workflow to launch

### Client Intake

The Client Intake workflow captures:

- Client name
- Project type
- Location
- Deadline
- Project notes

CT then converts that information into a structured project package containing:

- Executive summary
- Recommended service package
- Project scope
- Shot list
- Field checklist
- Delivery plan
- Follow-up tasks

### Live Operations Briefing

The active project is sent securely to a server-only API route.

GPT-5.6 returns a structured briefing containing:

- Primary objective
- Mission timeline
- Equipment plan
- Risk assessment
- Revenue opportunity
- Recommended first action

The generated briefing is tailored to the client, project type, location, deadline, and supplied notes.

### Resilient Local Fallback

CT does not become unusable when live AI is unavailable.

If the OpenAI request fails, the interface automatically switches to a deterministic local operations engine and clearly identifies the result as:

```text
Local fallback
```

This architecture makes AI an enhancement to the product rather than a single point of failure.

## GPT-5.6 Integration

CT uses the OpenAI **Responses API** with the `gpt-5.6` model.

The implementation:

- Runs exclusively through `app/api/briefing/route.ts`
- Keeps the OpenAI API key on the server
- Uses a strict JSON schema for predictable interface output
- Validates request data and generated JSON again at runtime before rendering
- Limits output size
- Disables response storage with `store: false`
- Treats project fields as data rather than executable instructions
- Avoids claiming access to live weather, airspace, traffic, or calendar information
- Returns a local fallback when live generation fails

The browser receives only the finished briefing. It never receives the OpenAI API key.

## Codex Development Workflow

Codex supported CT’s Build Week engineering workflow through:

- Repository inspection
- Implementation planning
- Code generation
- Debugging
- TypeScript and production-build validation
- Release review
- Documentation support

The required Codex `/feedback` session ID will be included with the final competition submission.

## Architecture

```text
Next.js Client Interface
          │
          ├── Mission Control
          ├── Client Intake
          └── Operations Briefing
                    │
                    ▼
        POST /api/briefing
                    │
                    ▼
       OpenAI Responses API
              GPT-5.6
                    │
                    ▼
     Strict Structured JSON
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
    Live Briefing       Local Fallback
```

## Technology

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- OpenAI JavaScript SDK
- OpenAI Responses API
- GPT-5.6
- JSON Schema Structured Outputs
- Git and GitHub
- Vercel

## Mobile Support

CT was designed and tested as a responsive web application.

The current interface supports:

- Desktop browsers
- Mobile Safari
- Mobile Chrome
- Tablet-sized layouts
- Touch-friendly controls
- Responsive forms, cards, and full-screen workflows

A future Progressive Web App release will allow CT to be installed from the browser while preserving one shared codebase.

## Security and Reliability

The current implementation includes:

- Server-only API access
- Environment-based secret management
- No API key exposure in client code
- Restricted request fields
- Input trimming and length limits
- Same-origin request checks and a small request-body limit
- Strict JSON Schema and runtime structured-output validation
- API timeout and retry limits
- Browser request cancellation and timeout handling
- Local fallback behavior
- Clear live-versus-fallback status labels
- Production build and TypeScript validation

## Run Locally

### Requirements

- Node.js 22 or newer
- npm
- An OpenAI API key with access to GPT-5.6

### Installation

```bash
git clone https://github.com/chrishulse/christopher-command.git
cd christopher-command
npm install
```

Create a file named `.env.local`:

```text
OPENAI_API_KEY=your_openai_api_key
```

Never commit `.env.local` or expose the key in client-side code.

### Deploy to Vercel

Set `OPENAI_API_KEY` in the Vercel project environment for each deployed
environment, then deploy normally. The briefing route returns `503` and the
browser uses its local fallback when the key is absent or live generation is
unavailable. Configure rate limiting or WAF controls at the deployment edge
before opening the unauthenticated demo to broad public traffic.

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Validation

```bash
npm run lint
npm run build
```

## Demonstration Workflow

1. Open CT and select **Start My Day**.
2. Enter Mission Control.
3. Open the gold **New Client Intake** tool.
4. Enter a client, project type, location, deadline, and notes.
5. Generate the structured project package.
6. Return to Mission Control.
7. Confirm the active mission reflects the new project.
8. Open the green **Operations Briefing** tool.
9. Select **Generate Live Briefing**.
10. Review the GPT-5.6-generated objective, timeline, equipment, risks, revenue opportunity, and recommended first action.

## What Makes CT Different

CT is not designed as a general-purpose chatbot.

A chatbot waits for another question.

CT is designed to understand the active operation and move the user toward the next concrete action.

Its central promise is:

> Open CT and immediately understand what needs to happen next.

## Current Limitations

This Build Week release is an intentionally focused MVP.

- The client project package is generated locally.
- GPT-5.6 currently powers the Operations Briefing.
- Account creation and authentication are not yet implemented.
- Project state is currently session-based and resets after a page refresh.
- CT does not yet retrieve live weather, FAA airspace, traffic, email, or calendar data.
- The current workspace is single-user.
- Billing and subscription enforcement are not implemented.
- The unauthenticated demo has no application-level rate limiter; production
  traffic controls should be configured at the hosting edge.
- Local fallback content is intentionally more general than the live GPT-5.6 result.

These limitations are visible product boundaries, not hidden claims.

## Product Roadmap

### CT Free

- Mission Control
- Basic client projects
- Limited operations briefings
- Core planning tools

### CT Pro

- Expanded GPT-5.6 usage
- Persistent cloud projects
- CRM functionality
- Calendar and email connections
- Smart prioritization
- Advanced operating plans

### CT Studio

- Shared workspaces
- Team members
- Approval workflows
- Client portals
- Asset management
- Brand templates
- Creative-production tools

### CT Enterprise

- Organization administration
- Security and access controls
- Custom integrations
- Usage analytics
- Dedicated operational agents
- Enterprise support

## Long-Term Vision

ChrisTopher Command begins with solo operators because they experience the operational problem most directly.

The larger vision is a globally accessible operations platform that helps independent professionals and small teams plan, execute, and grow without requiring a collection of disconnected systems.

> One CT account. Your entire operation. Available anywhere.

## Founder

ChrisTopher Command was created by **Chris Hulse**, a veteran, FAA-certified drone operator, cinematography student, and founder of C.H. Aerial Imaging.

CT grew from a real need: managing client work, field operations, creative production, education, business development, and daily priorities without losing momentum between disconnected tools.

## Build Week Status

- Public application deployed
- Responsive desktop and mobile interface
- Dynamic client-to-mission workflow
- Live GPT-5.6 integration
- Strict structured briefing output
- Secure server-side API route
- Resilient local fallback
- GitHub and Vercel deployment pipeline
