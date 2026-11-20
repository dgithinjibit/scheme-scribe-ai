# Architecture Rules

- Keep direct exam-table reads limited to each exam's creator; shared exam links must fetch one validated exam through an authenticated edge function so sharing does not grant broad table access.