export const yearlyTutorAI = 1199;
export const yearlyTraditional = (hours:number, subjects:number, rate:number) => {
  return hours * subjects * rate * 40; // 40 settimane utili
};
export const savings = (h:number, s:number, r:number) => {
  const trad = yearlyTraditional(h, s, r);
  const save = Math.max(0, trad - yearlyTutorAI);
  return { trad, save, pct: trad > 0 ? (save / trad) * 100 : 0 };
};
