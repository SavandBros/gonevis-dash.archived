2019.3.1
========

**Features:**
- Added #1119: Add Vimeo video URL support.

**Bug Fixes:**
- Fixed #1122: Only embed url when ever user pastes an URL.
- Fixed #1126: Change blue to project's primary color at 'header' option at editor buttons.
- Fixed #1130: Remove post/page from draft when published.
- Fixed #1132: Remove branding and Google Analytics are always shown at blog settings.


2019.2.1
========

**Features:**
- Added #1087: Show 2019 year on navbar.
- Added #1090: Add a link on navbar to visit current blog.
- Added #1095: Make post/page preview full screen.
- Added #1108: Update angular and other packages.

**Bug Fixes:**
- Fixed #1091: Fix blog settings address not opening.
- Fixed #1097: Fix media download does not open in new tab.
- Fixed #965: Post Preview windows make navigation link to be like mobile.
- Fixed #1099: Make media modal bigger.
- Fixed #1085: Set the correct JWT expiration date in Cookies.
- Fixed #1105: Fix dependency (webpack-dev-server) vulnerability.
- Fixed #1117: Fix blog custom domain list doesn't show up.
- Fixed #1224: Fix bad UX for 2 settings that require different save buttons.

**Improvements:**
- Closes #1113: Add details to incomplete-profile alert.

**Tasks:**
- Closed #1111: Hide new year message.


2019.1.1
========

**Features:**
- Added #1045: Add comments and commenting to Reader detail.
- Added #1050: Add load more button to comment list on Reader detail page.
- Added #1033: Add a method to embed Github Gists.
- Added #943: Embed Instagram on text Editor.
- Added #942: Embed Twitter on text Editor.
- Added #1063: Divide post/page list by their statuses.
- Added #1034: Embed Pastebin on text Editor.
- Added #944: Embed Soundcloud on text Editor.

**Bug Fixes:**
- Fixed #1044: Fix Storage metrics on main page.
- Fixed #1061: Fix navbar text colors when collapsed and remove primary color.
- Fixed #1069: Fix YouTube embed getting smaller on page/post update.
- Fixed #1072: Fix editor being wrapped in code-block.
- Fixed #1075: Editor on paste error: "Uncaught TypeError: n.appendChild is not a function".
- Fixed #1078: Fix payment public ID to production.
- Fixed #1081: Fix design of FAQ section in upgrade section in site settings.
- Fixed #1083: Show needed errors on team invitation.


2018.12.1
========

**Bug Fixes:**
- Resolved #993: Rename "Files" to "Media".
- Fixed #991: Fix pressing CTRL + Z (undo) will fully clear editor's content.
- Resolved #998: Rename "Files" to "Images" at image selection modal.
- Resolved #989: Change blog settings layout.
- Resolved #1003: Add a method to cancel blog's current subscription.
- Resolved #1002: Add upgrade plans to blog settings view.
- Resolved #1001: Add transactions list to blog settings view.
- Resolved #1000: Add a method to multi select and delete selected items.
- Fixed #1005: Cancel item deletion timeout on undo.
- Resolved #1008: Filter comments based on post/page.
- Resolved #1009: Update new navbar color and remove it's animation.
- Resolved #1013: Update plans to have equal heights.
- Resolved #1015: Remove button "Selected" in "Lite" plan.
- Resolved #1018: Add a method to update blog footer text.
- Fixed #1022: Fix editor error related to pasting video URLs.
- Resolved #1025: Ability to show views counter on posts.
- Resolved #1020: Google Analytics is now plan based.
- Resolved #1029: New Payment Flow.
- Added #1027: Ability to select desired code highlight syntax theme.
- Fixed #1017: Comment texts is not wrapped properly.
- Added #978: Add voting to Reader.
- Added #1032: Change Reader design UI.
- Added #1036: Add a "Back" button to Reader detail.
- Added #1040: Add custom branding to Personal plan.
- Fixed #1041: Remove email and live support from plans.


2018.10.1
========

**Bug Fixes:**
- Fixed #983: Change sidebar and navbar UI design.


2018.9.4
========

**Bug Fixes:**
- Fixed #973: Remove "lead" from editor for both pages and posts.


2018.9.1
========

**Bug Fixes:**
- Fixed #958: Do not autosave page/post when its title is being written in the editor.
- Fixed #962: Use preview parameters when previewing posts at editor.
- Fixed #969: Rename the word "site" to "blog".
- Fixed #968: Fix long file labels visibility.
- Fixed #970: Remove theme config section when no configs.
- Fixed #455: Add feedback form.


2018.8.1
========

**Features:**
- Added #922: Change to a new editor.
- Resolved #919: Add color picker for navigation color field.

**Bug Fixes:**
- Fixed #877: Fix uploading images in editor via Firefox.
- Fixed #399: Filter image selection for images only via backend.
- Fixed #934: Install `rsync` and check for its binary in CI.
- Fixed #907: Handle user role permission.
- Fixed #937: Bigger editor font size.
- Fixed #915: Add live post preview from dashboard editor.
- Fixed #953: Fix when pasting content to editor the page scrolls to the top.


2018.7.9
========

**Features:**
- Added #910: Remember last site user visited.
- Added #851: Add Auto-Save mode for posts.

**Bug Fixes**:
- Fixed #918: Fix commenting enabled checkbox default state.
- Resolved #924: Close comment modal after reply
- Resolved #928: Fix loadmore button for file selection modal.


2018.7.2
=========

**Featutes:**
- Added #727: Add skip button to tour.
- Added #742: Add Drag/Drop feature for uploading files.
- Added #714: Upgrade CircleCI to use version 2.
- Added #879: Linting and Code Quality.
- Added #906: Improve followers layout.
- Added #442: Improve file manager layout.


2018.6.25
=========

**Features**:
- Added #893: Add translation to all parts of the project.
- Added #242: Add a filter to order tags based on how many times they have been used.
- Added #787: Display updated by 'user' at Entry grid view.
- Added #886: Display blog followers in the main view.

**Bug Fixes**
- Fixed #892: Fix browser's tab title when page successfuly changes.
