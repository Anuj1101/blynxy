# Developer Contribution & Talent Platform
## Database Plan and Relationships

**Status:** Working design notes  
**Primary database:** MongoDB Atlas  
**Backend direction:** Node.js + Express + Mongoose   
**Purpose of this document:** Record the database decisions discussed so far. This is a starting design, not a final production schema.

---

## 1. Product idea

The platform lets developers submit projects, tools, and other technical contributions. Developers get a profile showing what they have built over time. Organizations—such as colleges, universities, coding clubs, institutes, or companies—can register and use a dashboard to show the technical work and skills of their members to recruiters.

The platform should not depend on students manually filling in long forms every day. Start with user-submitted project information, then add integrations such as GitHub activity and API/runtime telemetry later.

### Organization dashboard as the starting point

The organization dashboard helps solve the early adoption problem:

1. An organization or placement cell registers on the platform.
2. Developers create profiles and submit work.
3. The platform groups contributions attributed to that organization.
4. The organization can show companies evidence of the work its developers have done.
5. Companies can discover developers and their public work.

The dashboard should show evidence and transparent metrics—not claim that raw counts alone prove a person is a better developer.

---

## 2. Core design principles

1. **User means a person/account.** Do not make a user's identity depend on a college or employer.
2. **DeveloperProfile is optional.** A person can have an account without completing a developer profile.
3. **A person can have multiple roles/contexts.** For example, someone can be a PhD student and also teach or manage an organization.
4. **Organization is a canonical entity, not free text.** This avoids duplicate records such as `BIT`, `B.I.T.`, and `Buddha Institute of Technology`.
5. **Organization membership and submission attribution are different concepts.** Membership says who belongs to/manages an organization. Submission attribution says which organization a contribution is associated with.
6. **Organization attribution is optional.** A developer can submit independently with no organization.
7. **Contributions belong to the developer, not permanently to an organization.** If a developer changes colleges, their profile and overall contribution history remain intact.
8. **Public viewing does not require an account.** Anonymous visitors do not need a `User` document.
9. **Progress and performance are different.** Show objective progress first; do not create a simplistic quality score from commits, lines of code, views, or submission counts.
10. **Build in small completion-based phases.** Do not implement GitHub syncing, AI, or API telemetry before the core submission and profile flows work.

---

## 3. Relationship overview

```text
User
 ├── 0..1 DeveloperProfile
 ├── 0..N OrganizationMembership ── N..1 Organization
 └── 0..N Submissions (through DeveloperProfile or user ownership)

Submission
 ├── developerId ────────────────> DeveloperProfile/User
 ├── organizationId (optional) ──> Organization
 ├── type: PROJECT | TOOL | OTHER
 ├── 0..1 ProjectDetails
 ├── 0..1 ToolDetails
 └── 0..N Activities

Public/anonymous visitor
 └── can view public profiles/submissions without a User record

ProfileView
 ├── developerId ──> DeveloperProfile
 ├── viewerId (optional) ──> User
 └── timestamp and privacy-aware analytics fields
```

**Important:** The exact reference used by `Submission` should be finalized during implementation. A clean initial option is to reference `DeveloperProfile` if every contribution requires a developer profile. Another option is to reference `User` directly and allow a profile to be created later. Choose one approach and use it consistently. The product direction so far is that DeveloperProfile is optional, so referencing `User` directly is the simpler starting point.

---

## 4. Proposed collections

### 4.1 `users` — MVP

Stores account identity and authentication information only.

Suggested fields:

```js
{
  _id,
  name,
  email,
  passwordHash,
  createdAt,
  updatedAt
}
```

Notes:
- Make normalized email unique.
- Store a password hash, never the plain-text password.
- Do not put a single fixed `role: "student"` or `role: "faculty"` on the user. Roles may depend on context.
- Authentication/session fields can be added when the authentication approach is implemented.

### 4.2 `developerProfiles` — MVP

Optional public/professional developer identity linked to a user.

Suggested fields:

```js
{
  _id,
  userId,             // ref: User; unique if one profile per user
  username,           // unique public slug
  bio,
  skills: [],
  githubUrl,
  portfolioUrl,
  avatarUrl,
  visibility,         // e.g. public/private
  createdAt,
  updatedAt
}
```

Notes:
- A profile can exist independently of an organization.
- Public profile routes might look like `/developer/anuj`.
- Public fields should be intentionally selected; do not expose private account information.
- A developer can retain their profile when changing organizations or graduating.

### 4.3 `organizations` — MVP

Represents a canonical organization: college, university, coding club, company, institute, research lab, or another relevant group.

Suggested fields:

```js
{
  _id,
  name,               // canonical name
  shortName,
  type,               // college, university, club, company, etc.
  location,
  website,
  aliases: [],        // search terms, not separate organizations
  verificationStatus, // pending, approved, verified, rejected
  createdBy,          // ref: User
  createdAt,
  updatedAt
}
```

Notes:
- Prefer organization registration by an organization head, placement cell, or authorized representative.
- A student searching for an organization should select an existing canonical record, not create a new record merely by typing a name.
- If an organization is missing, provide a request/registration path.
- Similar names should be checked before creating a new organization.
- `approved` and `verified` should have defined meanings. An existing record is not automatically proof that an organization officially owns its profile.
- Official ownership/verification can be a later feature; avoid making it a blocker for the first MVP.

### 4.4 `organizationMemberships` — MVP

Connects users to organizations and stores their role in that particular organization.

Suggested fields:

```js
{
  _id,
  userId,             // ref: User
  organizationId,     // ref: Organization
  role,               // OWNER, ADMIN, PLACEMENT_CELL, FACULTY, MENTOR, MEMBER, etc.
  status,             // pending, active, removed
  joinedAt,
  createdAt,
  updatedAt
}
```

Relationship:
- One user can have memberships in many organizations.
- One organization can have many members.
- A user may be a developer and an organization member at the same time.
- Membership roles are organization-specific, not global user roles.

Example:

```text
Rahul
 ├── ABC University → FACULTY
 └── XYZ Coding Club → MEMBER
```

### 4.5 `submissions` — MVP; central contribution record

Represents a contribution submitted by a developer. This is the central entity for contribution history and organization analytics.

Suggested fields:

```js
{
  _id,
  submittedBy,        // ref: User
  organizationId,     // optional ref: Organization; null for independent work
  type,               // PROJECT | TOOL | OTHER
  title,
  description,
  status,             // draft, published, archived, etc.
  visibility,         // public, organization-only, private
  createdAt,
  updatedAt
}
```

Important behavior:
- `submittedBy` identifies who created the contribution.
- `organizationId` records the organization context/attribution for that submission, not the developer's permanent affiliation.
- `organizationId: null` means the contribution was submitted independently.
- If a developer changes colleges, do not automatically move or rewrite their old submissions.
- Decide and document the rules for selecting an organization. For example, only allow attribution to an organization the developer is a member of, or require an explicit confirmation if that is not the case.
- If a submission is associated with multiple organizations in the future, replace the single `organizationId` with a carefully designed array/relationship collection. Do not add that complexity unless it is needed.

### 4.6 `projects` — MVP if project-specific fields need a separate document

Stores fields specific to a submission whose type is `PROJECT`.

Suggested fields:

```js
{
  _id,
  submissionId,       // ref: Submission; unique for one project detail record
  githubUrl,
  liveUrl,
  technologies: [],
  screenshots: [],    // URLs to object storage
  projectStatus
}
```

The general title, description, owner, organization attribution, visibility, and timestamps remain on `Submission`.

### 4.7 `tools` — MVP if tool-specific fields need a separate document

Stores fields specific to a submission whose type is `TOOL`.

Suggested fields:

```js
{
  _id,
  submissionId,       // ref: Submission; unique for one tool detail record
  githubUrl,
  packageUrl,
  documentationUrl,
  technologies: []
}
```

If project/tool-specific data is tiny at first, it is also reasonable to keep one `submissions` collection with type-specific optional fields. Decide based on actual field differences. Do not create separate collections just for the sake of having more collections.

### 4.8 `activities` — MVP for an activity timeline; can be phased in

Stores meaningful events that happen on the platform.

Suggested fields:

```js
{
  _id,
  userId,             // ref: User
  submissionId,       // optional ref: Submission
  organizationId,     // optional context
  type,               // PROJECT_CREATED, PROJECT_UPDATED, TOOL_CREATED, etc.
  source,             // platform, github, sdk
  metadata,           // small structured event details
  occurredAt,
  createdAt
}
```

Examples:
- `PROJECT_CREATED`
- `PROJECT_UPDATED`
- `TOOL_CREATED`
- `VERSION_RELEASED`
- `DOCUMENTATION_UPDATED`

Notes:
- Only record events the platform can reliably observe.
- Avoid treating every tiny edit as meaningful progress.
- Later, GitHub webhooks/sync can create activity records.
- Progress summaries should be derived from submissions and activities rather than manually entered by the developer.

### 4.9 `profileViews` — add when public-view analytics are implemented

Tracks aggregated/limited profile-view events. Anonymous visitors do not need to become `User` records.

Suggested fields:

```js
{
  _id,
  developerProfileId,
  viewerId,           // optional ref: User, if viewer is signed in
  viewedAt,
  referrerDomain,     // optional
  anonymousSessionKey // optional, short-lived/pseudonymous if needed
}
```

Privacy notes:
- Do not attempt to secretly identify anonymous visitors.
- Avoid collecting more personal/device/location data than needed.
- Consider storing daily aggregates instead of every raw view as traffic grows.
- Only reveal viewer identity when the viewer has consented and the product has a clear reason to do so.
- Follow applicable privacy and consent requirements.

### 4.10 `apiMetrics` — future, not MVP

Only needed if the platform later tracks runtime usage of APIs built by developers.

Possible aggregated fields:

```js
{
  _id,
  apiId,
  dateBucket,
  totalRequests,
  successfulRequests,
  failedRequests,
  uniqueUsers,
  averageResponseTime
}
```

Important:
- GitHub does not provide runtime API request counts or response times.
- Those require telemetry in the deployed application, such as an SDK/middleware installed by the developer.
- Aggregate metrics instead of inserting one permanent MongoDB document for every API call.
- Endpoint detection from source code may be possible for supported frameworks, but it will not be perfectly reliable for every language/framework.

---

## 5. Anonymous / guest visitors

A guest can visit a public URL such as:

```text
/developer/anuj
```

without registering.

Model this as **public read access**, not a fake/ghost account:
- No `User` document is required.
- Only public profile fields and public submissions are returned.
- Private and organization-only information remains protected.
- If view analytics are enabled, record a privacy-aware event in `profileViews`.

---

## 6. Progress versus performance

Keep these concepts separate.

### Progress: what the developer has done over time

Can be derived from:
- number of published submissions
- project/tool history
- meaningful activity events
- releases and updates
- GitHub activity, after integration
- active days or monthly contribution counts

### Performance: how good the work is

This is harder to measure. Do not assume:
- more commits = better developer
- more lines of code = more effort
- more profile views = more skill
- more submissions = higher quality

For the first version, display transparent metrics and let viewers inspect the work. Any future score should explain its inputs and limitations.

---

## 7. GitHub integration: later phase

GitHub APIs/webhooks can provide repository-related information such as:
- repositories the user authorizes the app to access
- commits and commit metadata
- branches
- pull requests
- issues
- releases
- languages
- contributors and repository activity

GitHub does **not** tell the platform how many times a deployed API was called, its live response time, or how many real users used it.

Use GitHub integration to enrich the developer activity timeline, with clear authorization and repository-access permissions. Do not assume all commit activity proves individual effort or quality.

---

## 8. File storage

Use MongoDB for structured metadata and references, not as the default place to store large screenshots, archives, or project files.

Possible split:
- **MongoDB Atlas:** users, profiles, organizations, submissions, activity metadata, metrics
- **Object storage (e.g. S3 or Cloudinary):** screenshots and uploaded files
- **GitHub:** source repositories when the developer chooses to link them

Store file URLs and relevant metadata in MongoDB.

---

## 9. MVP collections versus later collections

### Start with these

1. `users`
2. `developerProfiles`
3. `organizations`
4. `organizationMemberships`
5. `submissions`
6. `activities` (can follow immediately after basic submissions)

### Add if the data model needs them

7. `projects`
8. `tools`

If project/tool-specific fields are simple, these details can initially live in `submissions`. Avoid over-engineering the schema before the first working flow exists.

### Add later

9. `profileViews`
10. `apiMetrics`
11. GitHub integration records/sync state, if required
12. Organization requests/verification workflow, if required by the registration flow

---

## 10. Example flows

### A. Independent developer submits a project

```text
User signs in
  -> creates DeveloperProfile
  -> creates Submission(type = PROJECT)
  -> organizationId = null
  -> project details saved
  -> public profile shows the project if visibility = public
```

### B. Developer submits work in an organization's context

```text
Developer is a member of Organization A
  -> submits a project
  -> selects Organization A
  -> Submission.organizationId = Organization A._id
  -> Organization A dashboard aggregates that submission
```

### C. Developer changes college

```text
Old submission -> Organization A
New submission -> Organization B
Independent work -> organizationId = null
```

The developer keeps one user account and one contribution history. Old submissions are not automatically reassigned.

### D. A placement cell manages its organization

```text
Organization representative creates an account
  -> organization is registered
  -> authorized user receives an OrganizationMembership role
  -> organization dashboard shows allowed, attributed contributions
```

Organization membership alone should not silently expose all private developer data. Visibility and consent rules still apply.

### E. A recruiter views a developer

```text
Recruiter opens public developer URL
  -> no login required
  -> public profile and public submissions are shown
  -> optional privacy-aware profile view is recorded
```

---

## 11. Indexes and data integrity to consider

Add indexes as the query patterns become clear. Likely useful:
- `users.email`: unique, normalized
- `developerProfiles.userId`: unique
- `developerProfiles.username`: unique
- `organizationMemberships`: compound index on `{ userId, organizationId }` to avoid duplicate active memberships
- `submissions`: index on `{ submittedBy, createdAt }`
- `submissions`: index on `{ organizationId, createdAt }`
- `submissions`: index on `{ visibility, createdAt }`
- `activities`: index on `{ userId, occurredAt }`
- `profileViews`: index on `{ developerProfileId, viewedAt }`

Use schema validation, authorization checks, pagination, and rate limiting. Never trust a client-supplied `submittedBy` or organization role without checking the authenticated user and permissions on the server.

---

## 12. Decisions still to finalize

These items are open and should be decided before implementing the relevant phase:

- Does every submission require a DeveloperProfile, or can a User submit before creating one? Current recommendation: store `submittedBy` as a User reference.
- Are project/tool details separate collections, or type-specific fields in `submissions`? Start simple and separate only when useful.
- Can a submission be attributed to multiple organizations? Current recommendation: one optional organization per submission for MVP.
- Can any developer attribute a submission to any organization, or must they be a member / receive confirmation? Define a clear rule.
- Which organization registration details and verification steps are required for the first release?
- What is public, organization-only, or private? Define this before exposing dashboards.
- Which activity events count as meaningful progress?
- How long should raw profile-view events be retained, and what aggregate analytics are sufficient?

---

## 13. Recommended implementation order

1. `users` and authentication
2. optional `developerProfiles`
3. `organizations`
4. `organizationMemberships`
5. `submissions` with public/private visibility
6. public developer profile and submission pages
7. basic organization dashboard using attributed submissions
8. `activities` and progress timeline
9. `profileViews` analytics
10. GitHub integration
11. runtime API telemetry / `apiMetrics`

**Build one complete, tested flow at a time.** For the first usable release, prioritize: register/login → create developer profile → submit a project → view it publicly → show attributed submissions on an organization dashboard.
