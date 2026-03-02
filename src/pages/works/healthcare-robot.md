---
layout: ../../layouts/Article.astro
title: "healthcare-robot"
pubDate: 2025-06-30
description: "A qualitative, privacy-aware study on when a (robot) assistant can appropriately intervene in doctor–patient conversations using multimodal cues."
author: "Adarsh"
---

# Identifying turn-taking moments in triadic healthcare conversations

`June 2025`
`design`
`robots`

As an Interaction Technology student at the University of Twente, I explored how a third party (e.g., a robot assistant) can **intervene** in doctor–patient conversations without disrupting trust or the flow of care.
The core question was not “what should an assistant say?”, but “*when is it socially acceptable to speak at all*?”

View the full report [here](https://storage.googleapis.com/zh-portfolio-bucket/triadic-robot/triadic-robot-report.pdf).

## What I did
In a team of 2, I designed and studied simulated triadic consultations (doctor, patient, assistant) to capture realistic conversational dynamics while keeping the setting controllable. 
We recorded six sessions across three primary-care scenarios: allergic reaction management, viral illness assessment, and musculoskeletal pain consultation.

## Approach (privacy-aware, multimodal)
Instead of full verbatim transcripts, we used a structured observation log with timecodes, short dialogue summaries/keywords, pause duration, gaze direction, and prosodic end cues (rising/falling pitch). 
This let us analyze turn-taking opportunities while explicitly considering privacy constraints that are typical for healthcare contexts.

## Key findings
Across 26 assistant interventions, timing strongly correlated with conversational “openness”: interventions after pauses of at least 2 seconds were judged appropriate 90% of the time (18/20), versus 33% (2/6) for shorter pauses.

Gaze mattered as a social permission signal: most appropriate interventions happened when doctor and patient gaze converged toward the assistant (13/18), while inappropriate ones often occurred during sustained doctor–patient mutual gaze (5/8).

Prosody reinforced this: interventions following falling-pitch completion cues were much more likely to be appropriate (15/17) than after rising pitch (2/9).

When all three cues aligned (pause ≥2s + gaze convergence + falling pitch), every intervention was appropriate (10/10).

![image](https://storage.googleapis.com/zh-portfolio-bucket/triadic-robot/triadic-stats.png)

## Design implications
This project translates conversation analysis into actionable interaction design constraints for socially intelligent assistants in sensitive settings: wait for longer pauses, treat gaze convergence as a “go/no-go” gate, and respect strict content boundaries (administrative/informational support rather than clinical opinions).
It also highlights a product-relevant insight: being able to *withhold* an intervention can be as important as speaking, especially when context is incomplete.
