CREATE TABLE "todo" (
  --"column_name" datatype constraints
  "id" SERIAL PRIMARY KEY,
  "task" VARCHAR(500) NOT NULL,
  "complete" VARCHAR(1)
);

INSERT INTO "todo"
  ("task", "complete")
  VALUES
  ('Get PCR Test', 'N'),
  ('Clean Apartment', 'N'),
  ('Finish Weekend Code Challenge', 'N');