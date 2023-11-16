import { SessionDebug } from "@/features/debug/session";
import { Heading, Panel, VerticalDivider } from "@/shared/ui";
import { Page } from "@/widgets/page";

export function App() {
  return (
    <Page title="Home">
      <Page.Header>
        <Page.Breadcrumbs/>
        <VerticalDivider class="mx-8"/>
        <Heading class="text-lg font-medium mr-auto">Welcome to the App</Heading>
      </Page.Header>
      <Page.Content>
        <Panel class="p-3">
          <Heading class="text-md mb-6">
            Session
          </Heading>
          <SessionDebug />
        </Panel>
      </Page.Content>
    </Page>
  );
}

export default App;
