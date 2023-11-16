import { FindManyTenantsTable } from "@/entities/tenant";
import { Page, PageBreadcrumbs, PageContent, PageHeader } from "@/widgets";

export function TenantsIndex() {
  return (
    <Page title="Tenants">
      <Page.Header>
        <Page.Breadcrumbs/>
      </Page.Header>
      <Page.Content class="h-100">
        <FindManyTenantsTable/>
      </Page.Content>
    </Page>
  );
}


export default TenantsIndex;