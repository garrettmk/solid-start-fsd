import { useFindManyTenantsAPI } from "@/entities/tenant";
import { BreadcrumbItem, Breadcrumbs, Code } from "@/shared/ui";
import { PageContent, PageHeader } from "@/widgets/page";

export function AdminIndex() {
  const [data] = useFindManyTenantsAPI(() => ({}));

  return (
    <>
      <PageHeader>
        <Breadcrumbs class="text-lg font-medium">
          <BreadcrumbItem href="/app">Home</BreadcrumbItem>
          <BreadcrumbItem>&gt;</BreadcrumbItem>
          <BreadcrumbItem href="/app/admin">Admin</BreadcrumbItem>
        </Breadcrumbs>
      </PageHeader>
      <PageContent class="flex justify-center align-center h-100">
        <Code>
          {JSON.stringify(data(), null, 2)}
        </Code>
      </PageContent>
    </>
  );
}

export default AdminIndex;