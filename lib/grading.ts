export const DEFAULT_GPA_SCALE: Record<string, number> = {
  "A": 4.0, "A-": 3.67, "B+": 3.33, "B": 3.0,
  "B-": 2.67, "C+": 2.33, "C": 2.0, "C-": 1.67,
  "D+": 1.33, "D": 1.0, "F": 0.0,
};

export const getGPAColor = (gpa: number) => {
  if (gpa >= 3.5) return "#00FFC2";
  if (gpa >= 3.0) return "#4A90E2";
  if (gpa >= 2.0) return "#FFDF00";
  if (gpa >= 1.0) return "#FF90E8";
  return "#FF4911";
};

export const getGPAStatus = (gpa: number) => {
  if (gpa >= 3.5) return "DISTINCTION 🏆";
  if (gpa >= 3.0) return "GOOD STANDING 👍";
  if (gpa >= 2.0) return "PASSING ✅";
  if (gpa > 0) return "AT RISK ⚠️";
  return "ADD DATA";
};

export const getLetterGradeFromGPA = (gpa: number, scale: Record<string, number> = DEFAULT_GPA_SCALE) => {
  const sorted = Object.entries(scale).sort((a, b) => b[1] - a[1]);
  for (const [grade, pts] of sorted) {
    if (gpa >= pts) return grade;
  }
  return "F";
};

export const getGradeColor = (grade: string, scale: Record<string, number> = DEFAULT_GPA_SCALE) => {
  const pts = scale[grade] ?? 0;
  return getGPAColor(pts);
};

export const getGradeTextColor = (grade: string, scale: Record<string, number> = DEFAULT_GPA_SCALE) => {
  const pts = scale[grade] ?? 0;
  if (pts >= 3.0 && pts < 3.5) return "#fff"; // Blue background
  if (pts < 1.0) return "#fff"; // Red background
  return "#000";
};
