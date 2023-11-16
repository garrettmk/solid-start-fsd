import { useFindOneTenant } from "@/entities/tenant";
import { Code, Heading } from "@/shared/ui";
import { Page } from "@/widgets";
import { createMemo } from "solid-js";
import { useParams } from "solid-start";

export function Tenant() {
  const params = useParams();
  const query = useFindOneTenant(() => ({ id: params.id }));
  const breadcrumb = createMemo(() => ({
    path: `/tenants/${query.data?.id}`,
    title: query.data?.name
  }));

  return (
    <Page {...breadcrumb}>
      <Page.Header>
        <Page.Breadcrumbs/>
      </Page.Header>
      <Page.Content class="h-100">
        <Heading level="1" class="text-4xl">{query.data?.name ?? ''}</Heading>
        <Heading level="2" class="text-xl mb-4 text-slate-300 dark:text-slate-400">{query.data?.slug}</Heading>
        <Code>{JSON.stringify(query.data, null, 2)}</Code>
      </Page.Content>
    </Page>
  );
}

export default Tenant;