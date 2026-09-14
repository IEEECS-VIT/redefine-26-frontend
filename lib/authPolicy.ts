export type StudentType = "internal" | "external";

export function isEmailAllowedForStudentType(email: string, type: StudentType): boolean {
  if (type === "external") return Boolean(email);
  return email.toLowerCase().endsWith("@vitstudent.ac.in");
}
