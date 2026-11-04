# Product Audit — Bangladesh Job-Prep Platforms vs Tech Buddy

Date: Nov 2026. This compares publicly described features of popular Bangladeshi preparation apps and job-circular apps. The information comes from app-store listings and press coverage, so features may have changed.

## Comparable products

| Product                     | Positioning                        | Notable features (as advertised)                                                                                                      |
| --------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Chorcha**                 | Exam practice (BCS, bank, primary) | Job-exam tests, digital question-bank archive, leaderboard for special model tests                                                    |
| **Live MCQ / Live Written** | BCS-focused live exams             | Live model tests against other candidates, subject-wise result analysis, old-question bank; peer and expert review of written answers |
| **Medha BCS Trainer**       | Large question bank                | 500k+ questions with explanations, weekly 200-mark model test, **tests that focus on your mistakes**                                  |
| **BCS Prostuti**            | Model tests                        | Detailed explanations, **live merit list**, unlimited personalised tests by category, subcategory or chapter                          |
| **Bdjobs app**              | Job board                          | **Shortlist jobs**, notification when an application deadline approaches                                                              |
| **"Job Circular" apps**     | Circular aggregators               | Newspaper aggregation, category notifications, **reminders before deadlines**                                                         |

## Where Tech Buddy already leads

- Circulars, structured study notes, daily exams and analytics in **one** product (competitors are either prep apps _or_ job boards).
- Server-authoritative exams with immutable result snapshots, plus weak-topic detection linked to the exact notes to revise.
- Bangla and English content side by side; transparent, affordable premium.

## Gaps (prioritised by impact on the core journey)

| #   | Gap                                                                | Seen in                         | Impact                                                               | Decision                                                                   |
| --- | ------------------------------------------------------------------ | ------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 1   | **Practise my mistakes / custom practice** by subject or topic     | Medha, BCS Prostuti             | Directly closes the loop "find weak topic → fix it"                  | ✅ Implemented                                                             |
| 2   | **Merit list / rank** for daily exams                              | Live MCQ, Chorcha, BCS Prostuti | Motivation and return visits; percentile is a strong progress signal | ✅ Implemented                                                             |
| 3   | **Saved circulars + closing-soon tracking**                        | Bdjobs, Job Circular apps       | Candidates track several applications; missing a deadline is costly  | ✅ Implemented (in-app); push and email reminders come with the mobile app |
| 4   | Push notifications (new circulars, deadlines, daily-exam reminder) | Job Circular apps               | Retention                                                            | ➡️ Mobile app (FCM) — next phase                                           |
| 5   | Previous-year question bank browsing                               | Chorcha, Live MCQ               | Content depth                                                        | ➡️ Planned: filter questions by `reference`                                |
| 6   | Weekly long model test (100–200 marks)                             | Medha                           | Exam realism                                                         | ✅ Already supported (`MODEL` exam type, configurable size and duration)   |
| 7   | Written-answer evaluation                                          | Live Written                    | Niche, operationally heavy                                           | ❌ Out of scope                                                            |

## What was built from this audit

1. **Practice mode:** `POST /practice` creates a private exam owned by the user.
   - Two modes: _random_ (optional subject/topic) or _my mistakes_ (questions answered wrong before).
   - Free users draw free questions; premium users draw the whole bank.
   - It uses the same exam engine, so you still get the timer, snapshots and server scoring.
2. **Leaderboard & rank:** `GET /exams/:id/leaderboard` returns the top scorers on first attempts (privacy-friendly display names), plus your own rank, the participant count and your percentile. These are shown on the result page.
3. **Saved circulars:** a save toggle on circulars, a "Saved circulars" page, and a dashboard reminder that highlights saved circulars closing within 7 days.
