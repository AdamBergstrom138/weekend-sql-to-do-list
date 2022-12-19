CREATE TABLE "todo" (
  --"column_name" datatype constraints
  "id" SERIAL PRIMARY KEY,
  "task" VARCHAR(500) NOT NULL,
  "edit" VARCHAR(50),
  "complete" VARCHAR(1)
);

INSERT INTO "todo"
  ("task", "edit", "complete")
  VALUES
  ('Get PCR Test', 'none', 'N'),
  ('Clean Apartment', 'none', 'N'),
  ('Finish Weekend Code Challenge', 'none', 'N');