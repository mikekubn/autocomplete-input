const fetcher = (args: string) => fetch(args).then((res) => res.json());

export { fetcher };
