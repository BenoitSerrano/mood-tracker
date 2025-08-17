const get = (obj: Record<string, any>, path: string): Record<string, any> | string | undefined =>
    path.split('.').reduce((acc, key) => (acc[key] ? acc[key] : undefined), obj);

export { get };
