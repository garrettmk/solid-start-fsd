import { BreadcrumbItem, Breadcrumbs } from "@/shared/ui";
import { PageContainer, PageContent, PageHeader } from "@/widgets/page";
import { FindManyTenantsTable } from "@/entities/tenant";

export function AdminIndex() {
  return (
    <PageContainer>
      <PageHeader>
        <Breadcrumbs class="text-lg font-medium">
          <BreadcrumbItem href="/app">Home</BreadcrumbItem>
          <BreadcrumbItem>&gt;</BreadcrumbItem>
          <BreadcrumbItem href="/app/admin">Admin</BreadcrumbItem>
        </Breadcrumbs>
      </PageHeader>
      <PageContent class="h-100">
        <FindManyTenantsTable />
      </PageContent>
    </PageContainer>
  );
}

export default AdminIndex;
