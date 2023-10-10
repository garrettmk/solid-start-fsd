import { BreadcrumbItem, Breadcrumbs, Button, useModal } from "@/shared/ui";
import { PageContainer, PageContent, PageHeader } from "@/widgets/page";
import { CreateTenantDrawer, FindManyTenantsTable } from "@/widgets/tenants";

export function AdminIndex() {
  const createTenantDrawer = useModal(CreateTenantDrawer);

  return (
    <PageContainer>
      <PageHeader>
        <Breadcrumbs class="text-lg font-medium">
          <BreadcrumbItem href="/app">Home</BreadcrumbItem>
          <BreadcrumbItem>&gt;</BreadcrumbItem>
          <BreadcrumbItem href="/app/admin">Admin</BreadcrumbItem>
        </Breadcrumbs>
        <Button size="sm" onClick={createTenantDrawer.open}>
          Create Tenant
        </Button>
      </PageHeader>
      <PageContent class="h-100">
        <FindManyTenantsTable />
      </PageContent>
    </PageContainer>
  );
}

export default AdminIndex;
