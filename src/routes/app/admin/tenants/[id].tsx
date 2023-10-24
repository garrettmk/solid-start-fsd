import { useFindOneTenant } from "@/entities/tenant";
import { BreadcrumbItem, Breadcrumbs, Code, Heading } from "@/shared/ui";
import { PageContainer, PageContent, PageHeader } from "@/widgets/page";
import { useParams } from "solid-start";

export function Tenant() {
  const params = useParams();
  const query = useFindOneTenant(() => ({ id: params.id }));

  return (
    <PageContainer>
      <PageHeader>
        <Breadcrumbs class="text-lg font-medium">
          <BreadcrumbItem href="/app">Home</BreadcrumbItem>
          <BreadcrumbItem>&gt;</BreadcrumbItem>
          <BreadcrumbItem href="/app/admin">Admin</BreadcrumbItem>
          <BreadcrumbItem>&gt;</BreadcrumbItem>
          <BreadcrumbItem href={`/app/admin/tenants`}>Tenants</BreadcrumbItem>
          <BreadcrumbItem>&gt;</BreadcrumbItem>
          <BreadcrumbItem>{query.data?.name ?? ''}</BreadcrumbItem>
        </Breadcrumbs>
      </PageHeader>
      <PageContent class="h-100">
        <Heading level="1" class="text-4xl">{query.data?.name ?? ''}</Heading>
        <Heading level="2" class="text-xl mb-4 text-slate-300 dark:text-slate-400">{query.data?.slug}</Heading>
        <Code>{JSON.stringify(query.data, null, 2)}</Code>
      </PageContent>
    </PageContainer>
  );
}

export default Tenant;