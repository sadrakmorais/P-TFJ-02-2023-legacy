export type TaskProps = {
  id: string;
  title: string;
  description: string;
  created_by: string | null | undefined;
  status: "not-started" | "in-progress" | "finished";
};
