export const productosDBKeys = {
  all: () => ["productos"] as const,
  list: () => [...productosDBKeys.all(), "list"] as const,
  detail: (id: string) => [...productosDBKeys.all(), "detail", id] as const,
  profilter: () => [...productosDBKeys.all(), "pro"] as const,
  proFilterById: (params: number) =>
    [...productosDBKeys.profilter(), params] as const,
};
