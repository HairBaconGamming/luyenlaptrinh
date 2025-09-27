# TODO: Adding Quiz System, Progress Tracking, and More Input Types

## Overall Plan Breakdown
1. **Install Dependencies**: Add express-session for progress tracking.
2. **Update package.json**: Include new dependency.
3. **Update server.js**: Add session middleware, POST route for topic completion, pass progress to views.
4. **Update Data Files**: Add 'quiz' array to topics in data/[category].js files (e.g., recursion.js first, then others).
5. **Update views/topic.ejs**: Add quiz rendering and submission logic.
6. **Update views/index.ejs**: Add progress summary on home page.
7. **Update views/practice.ejs**: Add progress stats and quiz links.
8. **Update views/partials/sidebar.ejs**: Add progress indicators (checkmarks) for topics.
9. **Update views/visualize.ejs**: Add input sections for trees (JSON textarea) and strings (text fields).
10. **Update public/js/visualizer.js**: Extend input parsing and add basic renderers for trees/strings.
11. **Update CSS (if needed)**: Add styles for quiz, progress, tree/string visuals in public/css/visualizer.css or base.css.
12. **Testing**: Run server, test quiz completion, progress display, new inputs in visualizer.

## Progress
- [x] Step 1: Install Dependencies
- [x] Step 2: Update package.json
- [x] Step 3: Update server.js
- [x] Step 4: Update Data Files
- [ ] Step 5: Update views/topic.ejs
- [ ] Step 6: Update views/index.ejs
- [ ] Step 7: Update views/practice.ejs
- [ ] Step 8: Update views/partials/sidebar.ejs
- [ ] Step 9: Update views/visualize.ejs
- [ ] Step 10: Update public/js/visualizer.js
- [ ] Step 11: Update CSS
- [ ] Step 12: Testing

Next: Proceed with Step 1 and 2.
