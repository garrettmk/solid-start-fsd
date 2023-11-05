import { BreadcrumbItem, Breadcrumbs, Divider, HStack, KPI, Panel } from "@/shared/ui";
import { PageContainer, PageContent, PageHeader } from "@/widgets/page";

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
        <Panel class="p-4 inline-grid grid-cols-[1fr_auto_1fr] gap-4">
            <KPI label="Tenants" value={100} size="xl"/>
            <div class="border-r border-slate-100 dark:border-slate-700" />
            <KPI label="Users" value={100} size="xl"/>
        </Panel>
      </PageContent>
    </PageContainer>
  );
}

export default AdminIndex;
