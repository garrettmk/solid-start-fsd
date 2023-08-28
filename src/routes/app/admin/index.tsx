import { BreadcrumbItem, Breadcrumbs } from "@/shared/ui";
import { PageContent, PageHeader } from "@/widgets/page";

export function AdminIndex() {
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
        <p>Admin tools</p>
      </PageContent>
    </>
  );
}

export default AdminIndex;