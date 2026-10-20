# COMPLETION-FIRST ROADMAP
=========================

Purpose
-------
Build the project in very small, finishable phases. Each phase should take
roughly 30 minutes to 2 hours and end with something that can be run, tested,
or demonstrated.

Core rule: every PHASE ends with a working result. “I made the schema” is not
complete on its own; the feature should be usable or testable.


# PHASE 0 — PROJECT SETUP
-----------------------
*0.1  Create the project folder
*0.2  Initialize the Git repository
*0.3  Initialize the backend
*0.4  Install Express
*0.5  Run a basic server
*0.6  Add a /health route
*0.7  Initialize the frontend
*0.8  Run the frontend
*0.9  Test frontend-to-backend communication
*0.10 Create MongoDB Atlas database
*0.11 Connect MongoDB to the backend
*0.12 Configure environment variables (.env)

Completion milestone: Frontend, backend, and MongoDB are connected.


# PHASE 1 — AUTHENTICATION
------------------------
*1.1  Create the User schema
*1.2  Create the User model
*1.3  Create the register controller
*1.4  Add the register route
*1.5  Test registration in Postman
*1.6  Add password hashing
*1.7  Create the login controller
*1.8  Add the login route
*1.9  Generate JWT on login
*1.10 Create authentication middleware
*1.11 Add protected /me route
-1.12 Add logout

Completion milestone: A user can register, log in, and access protected data.


# PHASE 2 — DEVELOPER PROFILE
---------------------------
2.1  Create DeveloperProfile schema
2.2  Create profile API
2.3  Get profile API
2.4  Update profile API
2.5  Add skills field
2.6  Add GitHub URL
2.7  Add portfolio URL
2.8  Create developer profile frontend
2.9  Create edit-profile UI
2.10 Add public profile route

Completion milestone: A public URL such as /developer/anuj works.


# PHASE 3 — ORGANIZATION
----------------------
3.1  Create Organization schema
3.2  Create Organization model
3.3  Create organization API
3.4  Get organization API
3.5  Update organization API
3.6  Create organization registration UI
3.7  Create organization profile UI
3.8  Add public organization page

Completion milestone: An organization can create and manage its basic profile.


# PHASE 4 — ORGANIZATION MEMBERSHIP
---------------------------------
4.1  Create Membership schema
4.2  Create membership model
4.3  Add a member to an organization
4.4  List organization members
4.5  Add member roles (owner, admin, member)
4.6  Check role permissions
4.7  Remove a member
4.8  Show members in organization dashboard
4.9  Support one user in multiple organizations

Completion milestone: A user can belong to multiple organizations with roles.


# PHASE 5 — SUBMISSION FOUNDATION
--------------------------------
5.1  Create Submission schema
5.2  Create Submission model
5.3  Add title and description fields
5.4  Add submission type field
5.5  Create submission API
5.6  Get one submission API
5.7  Update submission API
5.8  Delete submission API
5.9  Test all submission APIs

Completion milestone: A developer can create, view, edit, and delete a basic
submission.


# PHASE 6 — PROJECT SUBMISSIONS
-----------------------------
6.1  Add project type to submission
6.2  Add project repository URL
6.3  Add live demo URL
6.4  Add tech-stack field
6.5  Add project screenshots/cover image field
6.6  Create project submission form
6.7  Display project submission detail page
6.8  Validate required project fields

Completion milestone: A developer can publish a complete project submission.


# PHASE 7 — TOOL AND INDEPENDENT SUBMISSIONS
-------------------------------------------
7.1  Add tool type to submission
7.2  Add independent type to submission
7.3  Add tool-specific fields
7.4  Add independent-work-specific fields
7.5  Show appropriate form fields by submission type
7.6  Render each type correctly on the detail page
7.7  Test all submission types

Completion milestone: Project, tool, and independent submissions all work.


# PHASE 8 — ORGANIZATION ATTRIBUTION
-----------------------------------
8.1  Add optional organization field to Submission
8.2  Allow author to choose an organization
8.3  Show organization on a submission
8.4  List organization submissions
8.5  Verify user belongs to selected organization
8.6  Allow personal submissions with no organization

Completion milestone: Submissions can be personal or associated with an
organization.


# PHASE 9 — SUBMISSION FEED
-------------------------
9.1  Create API to list submissions
9.2  Add newest-first sorting
9.3  Add pagination
9.4  Create feed page
9.5  Create submission cards
9.6  Link cards to detail pages
9.7  Add loading, empty, and error states

Completion milestone: Visitors can browse published submissions in a feed.


# PHASE 10 — SEARCH AND FILTERS
-----------------------------
10.1 Add search by title
10.2 Add search by skills/tech stack
10.3 Filter by submission type
10.4 Filter by organization
10.5 Add filters to frontend
10.6 Preserve filters in the URL
10.7 Add clear-filters action

Completion milestone: Users can find relevant submissions quickly.


# PHASE 11 — LIKES AND BOOKMARKS
------------------------------
11.1 Create Like schema or submission likes field
11.2 Add like API
11.3 Add unlike API
11.4 Show like count
11.5 Add like button in UI
11.6 Create Bookmark schema or saved-submissions field
11.7 Add save/unsave API
11.8 Create saved-submissions page

Completion milestone: Logged-in users can like and save submissions.


# PHASE 12 — COMMENTS
-------------------
12.1 Create Comment schema
12.2 Create comment API
12.3 List comments for a submission
12.4 Add comment form
12.5 Display comment author and date
12.6 Edit own comment
12.7 Delete own comment
12.8 Add basic comment validation

Completion milestone: Users can discuss submissions through comments.


# PHASE 13 — DASHBOARD
--------------------
13.1 Create developer dashboard page
13.2 Show user profile summary
13.3 Show user's submissions
13.4 Add create-submission button
13.5 Add edit/delete submission actions
13.6 Show saved submissions
13.7 Create organization dashboard page
13.8 Show organization members and submissions

Completion milestone: Users and organizations can manage their core content
from dashboards.


# PHASE 14 — NOTIFICATIONS
------------------------
14.1 Create Notification schema
14.2 Create notification when a submission gets liked
14.3 Create notification when a comment is added
14.4 Create notification for organization invite/member event
14.5 List user notifications
14.6 Mark one notification as read
14.7 Mark all notifications as read
14.8 Add notification UI

Completion milestone: Important activity is visible to users.


# PHASE 15 — MODERATION AND REPORTING
------------------------------------
15.1 Add report action for a submission
15.2 Create Report schema
15.3 Create report API
15.4 Add admin role/flag
15.5 Create admin report list
15.6 Add hide/remove submission action
15.7 Add delete-comment moderation action
15.8 Record moderation reason

Completion milestone: Reported content can be reviewed and moderated.


# PHASE 16 — POLISH AND VALIDATION
---------------------------------
16.1 Add backend validation to all input routes
16.2 Add frontend form validation
16.3 Improve API error messages
16.4 Add success/error toast messages
16.5 Add responsive mobile layout
16.6 Add basic accessibility labels
16.7 Add empty states across pages
16.8 Check protected-route behavior

Completion milestone: The main user journey feels stable and understandable.


# PHASE 17 — TESTING AND SECURITY CHECK
--------------------------------------
17.1 Test registration and login
17.2 Test protected APIs without a token
17.3 Test authorization for editing/deleting content
17.4 Test membership role permissions
17.5 Test all submission types
17.6 Test search, filters, likes, bookmarks, and comments
17.7 Check environment variables are not committed
17.8 Add basic rate limiting/security middleware if needed

Completion milestone: Core flows are tested and unauthorized actions are
blocked.


# PHASE 18 — DEPLOYMENT
---------------------
18.1 Prepare production environment variables
18.2 Deploy backend
18.3 Deploy frontend
18.4 Configure production database connection
18.5 Configure frontend API URL
18.6 Test production registration/login
18.7 Test a full production submission flow
18.8 Add a simple landing page and project README

Completion milestone: The live application can be used end-to-end.


SCOPE RULE — MUST HAVE / NICE TO HAVE / LATER
----------------------------------------------
For every # PHASE, classify work before starting:

MUST HAVE
- Required for the current phase's completion milestone.
- Build it now.

NICE TO HAVE
- Improves the feature but does not block the milestone.
- Only do it if the Must Have work is complete and time/energy remains.

LATER
- A good idea, but not required for the current phase or MVP.
- Add it to a backlog; do not let it delay completion.

Rule: never start a Nice to Have while a Must Have is incomplete. If a task
starts growing too large, move the extra part to Later and finish the smallest
working version first.


FINAL COMPLETION CHECKLIST
--------------------------
[ ] Frontend, backend, and database are connected
[ ] Users can register, log in, log out, and use protected routes
[ ] Developers have editable public profiles
[ ] Organizations can be created and have public profiles
[ ] Users can join multiple organizations with roles
[ ] Users can create, edit, delete, and view submissions
[ ] Project, tool, and independent submission types work
[ ] Submissions can be personal or organization-attributed
[ ] A public feed, submission page, search, and filters work
[ ] Users can like, bookmark, and comment on submissions
[ ] Developer and organization dashboards work
[ ] Notifications work for important activity
[ ] Reporting/moderation basics work
[ ] Forms, errors, empty states, and mobile layout are polished
[ ] Core authentication and authorization flows are tested
[ ] Secrets are kept out of source control
[ ] The app is deployed and the end-to-end production flow is tested
[ ] README explains how to run the project and what it does

Definition of done: all Must Have items for the current phase are complete,
the phase's completion milestone can be demonstrated, and the next phase can
begin without unfinished work blocking it.
