# AI Career Compass

## Problem Statement
Career decisions often require several kinds of guidance at once. A single generic answer can miss the technical, hiring, academic, or business perspective that makes advice useful.

## Objective
AI Career Compass is a personalized browser-based career counsellor. Anyone can ask one question, choose one or more advisor personas, and receive clearly separated guidance from a single Gemini request.

## Personas Used
- **Technical Advisor:** Coding, AI, technical skills, and projects.
- **HR Advisor:** Resume, interviews, networking, and personal branding.
- **Academic Advisor:** MS preparation, research, university fit, and applications.
- **Startup Advisor:** Business ideas, customer discovery, MVPs, and validation.

## Prompt Card Explanation
Every persona is represented by a Prompt Card with six fields:

- **Role:** The advisor identity and expertise.
- **Audience:** The person asking the question, with advice personalized to their goals.
- **Context:** The career topics the advisor should prioritize.
- **Format:** How the response should be organized.
- **Constraints:** Guardrails that keep advice practical and honest.
- **Language:** The tone and language of the response.

The app combines the selected cards into one structured prompt. It makes exactly one call to Gemini and then separates the returned text into persona response cards.

## Technology Used
- HTML5
- Embedded CSS3
- Embedded vanilla JavaScript
- Gemini `generateContent` REST API

## How to Run
1. Open `index.html` in a modern browser.
2. Paste your Gemini API key into the **Gemini API key** field. The key is used in the browser for the request and is not saved by the app.
3. Select at least one advisor, enter a question, and choose **Get Advice**.

For a real deployed product, proxy Gemini requests through a server so the API key is never exposed to the browser or client-side source. This project does not include a real key.

## Sample Questions
- How can I build an AI project portfolio for an entry-level role?
- What should I improve in my resume before applying for software internships?
- How should I prepare for an MS in computer science and find a research direction?
- Which small business idea could I validate while learning AI?

## Screenshot
_Add a screenshot of the running application here._
