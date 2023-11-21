import { FindManyUserProfilesTable } from "@/entities/user-profile";
import { Page } from "@/widgets";

export function UsersIndex() {
  return (
    <Page title="Users">
      <Page.Header>
        <Page.Breadcrumbs/>
      </Page.Header>
      <Page.Content class="h-100">
        <FindManyUserProfilesTable/>
      </Page.Content>
    </Page>
  );
}

export default UsersIndex;