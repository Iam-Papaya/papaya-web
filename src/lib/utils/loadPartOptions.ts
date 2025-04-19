export const loadPartOptions = () => {
    const files = import.meta.glob('/static/models/*/*.glb', { eager: true });
  
    const options: Record<string, string[]> = {};
  
    for (const path in files) {
      const match = path.match(/\/models\/([^/]+)\/([^/]+)\.glb$/);
      if (!match) continue;
  
      const [, part, filename] = match;
      if (!options[part]) options[part] = [];
      options[part].push(filename);
    }
  
    return options;
  };
  