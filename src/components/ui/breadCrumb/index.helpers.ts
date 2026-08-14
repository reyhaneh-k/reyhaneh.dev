function getCrumbsFromMatches(
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

export { getCrumbsFromMatches };
