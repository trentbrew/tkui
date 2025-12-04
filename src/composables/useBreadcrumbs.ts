import type { BreadcrumbItem } from "~/components/Ui/Breadcrumbs.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

export function useBreadcrumbs() {
  const route = useRoute();

  const breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const items: BreadcrumbItem[] = [
      {
        label: "Home",
        icon: "lucide:home",
        link: "/",
      },
    ];

    const pathSegments = route.path.split("/").filter(Boolean);

    if (pathSegments.length === 0) {
      return items;
    }

    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      // Capitalize and format the segment
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      items.push({
        label,
        link: isLast ? undefined : currentPath,
        disabled: isLast,
      });
    });

    return items;
  });

  return {
    breadcrumbs,
  };
}
