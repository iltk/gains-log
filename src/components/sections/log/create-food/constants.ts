export const UNITS = ["g", "ml", "oz", "fl oz", "cup"] as const;

export const NUTRITION_ROWS = [
  { label: "Energy", unit: "kcal", bold: true, hint: "recommended" },
  { label: "Total Fat", unit: "g", bold: true, hint: "recommended" },
  { label: "Saturated Fat", unit: "g", bold: false, hint: "optional" },
  { label: "Total Carbohydrate", unit: "g", bold: true, hint: "recommended" },
  { label: "Fiber", unit: "g", bold: false, hint: "optional" },
  { label: "Sugars", unit: "g", bold: false, hint: "optional" },
  { label: "Protein", unit: "g", bold: true, hint: "recommended" },
  { label: "Sodium", unit: "mg", bold: true, hint: "recommended" },
] as const;
