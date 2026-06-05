export const toPascalCase = (str: string): string =>
  str.split("_").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("");

export const isEvent = (payload: unknown, event: string): boolean =>
  payload instanceof Object && "event" in payload && (payload as Record<string, unknown>).event === event;
