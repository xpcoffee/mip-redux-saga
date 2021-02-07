// Functions pertaining to calling against APIs

export function fetchJson(fetchArgs) {
    return fetch(fetchArgs).then((result) => result.json());
}
