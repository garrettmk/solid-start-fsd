import { useFindManyTenants } from "@/entities/tenant";
import { BreadcrumbItem, Breadcrumbs, KPI, Panel, VerticalDivider, usePaginatedResultFrom } from "@/shared/ui";
import { Page, PageContent, PageHeader } from "@/widgets/page";

export function AdminIndex() {
  const tenants = useFindManyTenants();
  const paginatedTenants = usePaginatedResultFrom(tenants);

  return (
    <Page title="Admin Tools">
      <Page.Header>
        <Page.Breadcrumbs/>
      </Page.Header>
      <PageContent class="h-100">
        <Panel class="p-4 inline-grid grid-cols-[1fr_auto_1fr] gap-4">
          <KPI
            label="Tenants"
            value={paginatedTenants().total}
            size="xl"
            loading={tenants.isLoading}
          />
          <VerticalDivider />
          <KPI
            label="Users"
            value={100}
            size="xl"
          />
        </Panel>
      </PageContent>
    </Page>
  );
}

export default AdminIndex;
