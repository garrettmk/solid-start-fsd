import { useFindManyTenants } from "@/entities/tenant";
import { useFindManyUsers } from "@/entities/user";
import { useFindManyUserProfiles } from "@/entities/user-profile";
import { KPI, Panel, VerticalDivider, usePaginatedResultFrom } from "@/shared/ui";
import { Page, PageContent } from "@/widgets/page";

export function AdminIndex() {
  const tenants = useFindManyTenants();
  const users = useFindManyUserProfiles();
  const paginatedTenants = usePaginatedResultFrom(tenants);
  const paginatedUsers = usePaginatedResultFrom(users);

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
            value={paginatedUsers().total}
            size="xl"
            loading={users.isLoading}
          />
        </Panel>
      </PageContent>
    </Page>
  );
}

export default AdminIndex;
