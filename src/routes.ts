import type { RouteConfig } from "@react-router/dev/routes";
import { route, index, layout } from "@react-router/dev/routes";

export default [
  layout("routes/root.tsx", [
    index("routes/home.tsx"),
    route("posts", "routes/posts.tsx"),
    route("about", "routes/about.tsx"),
    route("projects", "routes/projects.tsx"),
  ]),
] satisfies RouteConfig;
