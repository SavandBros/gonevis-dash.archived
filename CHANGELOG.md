2019.8.1
========

**Bug Fixes:**

- Fixed #1213: Fix profile completion conditions.
- Fixed #1212: Remove sidebar page indicator.
- Fixed #1211: Fix sidebar not closing on new blog page.
- Fixed #1210: Fix user settings not updating.
- Fixed #1204: Fix remove branding does not work.
- Fixed #1206: Cannot read property 'get' of undefined.
- Fixed #1208: Fix editor indent getting bleached.

**Improvements:**

- Closed #1215: Update pricing plans (Add google AdSense).

**Features:**

- Added #1185: Bookmarking for Reader.


2019.7.1
========

**Bug Fixes:**

- Fixed #1197: Fix potential security vulnerabilities.
- Fixed #1200: Fix user settings page.

2019.6.1
========

**Bug Fixes:**

- Fixed #1187: Update dark mode colors of Reader.
- Fixed #1189: Fix jQuery security vulnerability error.
- Fixed #1192: Fix toaster for permission error at settings page.
- Fixed #1194: Remove discord link from main page (it's still in help page).


2019.5.1
========

**Features:**
- Added #1171: Show start writing message when no posts.
- Added #1173: Discord link to dashboard.

**Bug Fixes:**
- Fixed #1155: Fix top margin on main wrapper.
- Fixed #1153: Fix dark mode on reader and post/page edition.
- Fixed #1129: Sidebar link is still active when in account state.
- Fixed #1180: Hide sidebar when navigating through 'site-new' state.
- Fixed #1182: Add comment support to Reader.

**Improvement:**
- Closes #1158: Google AdService Conversion.
- Closes #1162: Move post status tabs next to search bar to save space.


2019.4.1
========

**Features:**
- Added #1138: Add Google AdSense to site settings.
- Added #1106: Add help page (and make navbar full size).
- Added #1159: Add an ability to change theme's primary color.

**Improvement:**
- Closed #1142: Update NPM packages.
- Closed #1163: Change account setting inputs style.

**Bug Fixes:**
- Fixed #1136: Same style for both "Remove Branding" and "Google Analytics" in blog settings.
- Fixed #1143: 2 UI Router packages (1 of them should be removed).
- Fixed #1141: Fix vulnerability alert related to bootstrap.
- Fixed #1148: Fix JSHint issue.
- Fixed #1140: Bring back excerpt.
- Fixed #1165: Fix top space of login and sign up panels.


2019.3.1
========

**Features:**
- Added #1119: Add Vimeo video URL support.

**Bug Fixes:**
- Fixed #1122: Only embed url when ever user pastes an URL.
- Fixed #1126: Change blue to project's primary color at 'header' option at editor buttons.
- Fixed #1130: Remove post/page from draft when published.
- Fixed #1132: Remove "Remove branding" and "Google Analytics" sections and from other setting tabs.


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
