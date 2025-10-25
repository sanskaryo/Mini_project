# Project Analysis & Next Steps

This document analyzes the project's current state against the vision outlined in `inspiration.md` and proposes a strategic roadmap for future development.

## 1. The Vision from `inspiration.md`

The inspiration document lays out a multi-phased plan to build a "Personalized AI Study Platform" using a modern "FReS" stack (FastAPI, React, Supabase).

The core vision is to create an application that goes beyond a simple flashcard tool by integrating:
- **Core Study Tools:** User authentication, decks, and flashcards.
- **AI-Powered Features:** AI-driven quiz generation and personalized SWOT analysis of a user's learning patterns.
- **Scientific Learning Methods:** A Spaced Repetition System (SRS) based on the SM-2 algorithm to optimize memorization.
- **Enhanced User Experience:** Multimodal interactions (Text-to-Speech, Speech-to-Text) and gamification (points, streaks, badges) to boost engagement.
- **Advanced Adaptation:** A long-term goal of using Reinforcement Learning (RL) to create a truly adaptive learning experience that changes content, not just review timing.

## 2. Current Project Status: What's Done

The project has made excellent progress and has successfully implemented a significant portion of the initial vision, and in some cases, has even exceeded the initial plan.

**Alignment with the Plan:**
- **Technology Stack:** The project correctly implements the **FastAPI, React, and Supabase** stack as planned.
- **Architecture:** A **monorepo** structure is in place, cleanly separating the `frontend` and `backend_py` concerns.
- **User Authentication:** A complete and secure authentication system is functional, with JWT handling, protected routes, and a global state store on the frontend.
- **Core Features Implemented:**
    - **Backend:** Endpoints for `auth`, `notes`, `planner`, `progress`, `resources`, `flashcards`, `pyq`, `gamification`, `ocr`, and `audio` are all present.
    - **Frontend:** UI pages for nearly all corresponding backend features exist, including `Login`, `Dashboard`, `Notes`, `Planner`, `Flashcards`, etc.
- **AI Integration:** The project has already integrated AI for general chat (`Chat.jsx`) and PDF-based Q&A (`PDFChat.jsx`), which aligns perfectly with the "AI Core" phase.

## 3. Gap Analysis: What's Planned vs. What's Implemented

While the breadth of features is impressive, there is a depth gap between the backend logic and the frontend implementation for several of the more advanced features.

| Feature | Plan | Current Status | Gap & Recommendation |
| :--- | :--- | :--- | :--- |
| **Spaced Repetition (SRS)** | Implement SM-2 algorithm on the backend to calculate `next_review_date`. | The `flashcards` table in `database_schema.sql` **includes all necessary SRS fields** (`next_review_date`, `interval`, `ease_factor`, `repetitions`). However, the backend logic to update these fields and the frontend UI to study "due" cards are missing. | **This is the highest-priority feature to implement.** It is the core of an intelligent study tool. The backend needs a `/review` endpoint, and the frontend needs a dedicated "Study Session" mode. |
| **Gamification** | Award points, streaks, and badges based on user actions. | The backend has a `gamification.py` router and the database has a `user_points` table. | The logic for *when* to award points is not implemented, and the frontend has no UI to display points, streaks, or badges. **This is a high-impact feature for user engagement.** |
| **AI SWOT Analysis** | Generate a SWOT analysis of user performance on a deck. | The backend has no endpoint for this. The necessary data (`repetitions`, `lapses` in the `flashcards` table) is being stored. | This feature requires a new backend endpoint that queries performance data, formats it for an LLM prompt, and returns the analysis. The frontend would need a button to trigger this. |
| **AI Quiz Generation** | Generate a quiz from user notes. | The backend has no endpoint for this. | This requires a new backend endpoint and a new UI on the frontend, likely on the `Notes` page, to allow users to generate a quiz from their text. |
| **Audio Features (TTS/STT)** | Use the browser's Web Speech API for text-to-speech and speech-to-text. | The backend has an `audio.py` router, but the plan suggests a frontend-only implementation. | The `audio.py` backend might be for a different purpose. The planned TTS/STT can be implemented directly in the frontend on the `Flashcards` or `Notes` pages. |
| **OCR (Image to Text)** | Allow users to extract text from images. | The backend has an `ocr.py` router and the frontend has a placeholder `OCR.jsx` page. | The feature needs to be fully built out. The frontend needs an upload component, and the backend needs to process the image and return the text. |

## 4. Recommended Roadmap

To transform the project into the envisioned personalized AI study assistant, the focus should shift from building *new* features to adding *depth and intelligence* to the existing ones.

### **Phase 1: Implement the Core Learning Loop (Highest Priority)**
1.  **Backend: Build the SRS Engine.**
    - Create a new endpoint: `POST /flashcards/{flashcard_id}/review`.
    - This endpoint will take a user's performance rating (e.g., "Easy," "Hard," "Forgot").
    - It will implement the SM-2 algorithm to update the flashcard's `interval`, `ease_factor`, `repetitions`, and calculate the `next_review_date`.
2.  **Frontend: Create the "Study Session" UI.**
    - Add a "Study" button to each deck on the `Dashboard`.
    - This button should lead to a new "Study Session" page that fetches only the cards that are "due" for review (`next_review_date` is in the past).
    - After a card is flipped, show the performance rating buttons ("Easy," "Hard," etc.) which call the new backend endpoint.

### **Phase 2: Enhance Engagement & Intelligence**
1.  **Integrate Gamification.**
    - **Backend:** Update the `/review` endpoint to also award points to the user for each card studied. Implement logic to track daily streaks.
    - **Frontend:** Display the user's points and streak count in the `Header` or `Sidebar`. Create a section in the `Profile` page to show earned badges.
2.  **Implement AI SWOT Analysis.**
    - **Backend:** Create a `GET /decks/{deck_id}/swot` endpoint that analyzes the performance data for that deck and returns an AI-generated SWOT analysis.
    - **Frontend:** Add a "Get Performance Analysis" button on the `Dashboard` or `Progress` page.

### **Phase 3: Add Advanced Tools**
1.  **Build out the OCR feature.**
    - Create the UI in `OCR.jsx` to allow image uploads.
    - Implement the backend logic in `ocr.py` to process the image and return text.
2.  **Implement Text-to-Speech (TTS).**
    - On the frontend, add a "Read Aloud" button to flashcards and notes using the browser's Web Speech API.

By following this roadmap, you will systematically add the intelligent and engaging features that are at the heart of the `inspiration.md` vision, building upon the excellent foundation you have already created.
