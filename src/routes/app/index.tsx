import { SessionDebug } from "@/features/debug/session";
import { Heading, Panel } from "@/shared/ui";
import { PageContent, PageHeader } from "@/widgets/page";

export function App() {
  return (
    <>
      <PageHeader>
        <Heading class="text-lg font-medium">Welcome to the App</Heading>
      </PageHeader>
      <PageContent>
        <Panel class="p-3">
          <Heading class="text-md mb-6">
            Session
          </Heading>
          <SessionDebug />
        </Panel>
      </PageContent>
    </>
  );
}

export default App;
