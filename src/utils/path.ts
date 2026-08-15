/**
 * Checks if a path is the same as or nested within another path.
 * @param pathname - The path to check.
 * @param base - The base path to compare against.
 * @returns True if the path is the same as or nested within the base path, false otherwise.
 */
export function isSameOrNestedPath(
  pathname: string,
  base: string
) {
  const path = pathname.replace(/\/$/, "");
  const prefix = base.replace(/\/$/, "");
  return path === prefix || path.startsWith(`${prefix}/`);
}

/**
 * Extracts breadcrumbs from a list of matches.
 * @param matches - The list of matches to extract breadcrumbs from.
 * @returns A list of breadcrumbs.
 */
export function getCrumbsFromMatches(
  matches: {
    staticData: {
      breadcrumb:
        | string
        | ((match: {
            params: Record<string, string>;
            loaderData?: unknown;
          }) => string);
    };
    params: Record<string, string>;
    loaderData?: unknown;
    pathname: string;
  }[]
) {
  return matches
    .filter((match) => match.staticData.breadcrumb)
    .map((match) => ({
      title:
        typeof match.staticData.breadcrumb === "function"
          ? match.staticData.breadcrumb({
              params: match.params,
              loaderData: match.loaderData,
            })
          : match.staticData.breadcrumb,
      path: match.pathname,
    }))
    .filter((crumb) => crumb.title);
}
