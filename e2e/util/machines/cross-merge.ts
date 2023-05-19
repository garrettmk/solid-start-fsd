export function crossMerge<TLeft extends object, TRight extends object = object>(itemsLeft: any[], itemsRight: any[]): (TRight & TLeft)[] {
  const result: any[] = [];

  for (const itemLeft of itemsLeft) {
    for (const itemRight of itemsRight) {
      result.push({ ...itemLeft, ...itemRight });
    }
  }

  const set = new Set(result.map(item => JSON.stringify(item)));
  return Array.from(set).map(item => JSON.parse(item));
}