import { useSessionProfile } from "@/entities/session";
import { UpdateUserProfileForm, useUserProfileUpdate } from "@/features/user-profiles/update";
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, HStack, Heading, Panel, Spinner, VStack } from "@/shared/ui";
import { Page, PageContent, PageDivider, PageHeader } from "@/widgets/page";
import { Show, createEffect } from "solid-js";

export function ProfilePage() {
  const [profile, { refetch: refetchProfile }] = useSessionProfile();
  const [updating, updateProfile] = useUserProfileUpdate();

  createEffect(() => {
    if (updating.result)
      refetchProfile();
  });

  const formattedCreatedDate = () => {
    const createdAt = profile()?.createdAt;
    
    return createdAt
      ? new Date(createdAt).toLocaleDateString()
      : 'n/a';
  }

  return (
    <Page>
      <PageHeader>
        <Breadcrumbs class="text-lg font-medium">
          <BreadcrumbItem href="/app">Home</BreadcrumbItem>
          <BreadcrumbItem>&gt;</BreadcrumbItem>
          <BreadcrumbItem href="/app/account">Account</BreadcrumbItem>
          <BreadcrumbItem>&gt;</BreadcrumbItem>
          <BreadcrumbItem>Profile</BreadcrumbItem>
        </Breadcrumbs>
      </PageHeader>
      <PageContent>
        <HStack class="mb-12" align="center">
          <Avatar
            size="4xl"
            class="mr-6"
            src={ profile()?.avatarUrl }
            initials={ profile()?.avatarInitials }
          />
          <VStack>
            <Heading level="1" class="text-6xl font-bold">
              { profile()?.fullName }
            </Heading>
            <span class="text-md font-medium ml-1.5">
              User since { formattedCreatedDate() }
            </span>
          </VStack>
        </HStack>
        <PageDivider class="mb-12"/>
        <Panel class="p-3 inline-block">
          <Heading class="text-2xl mb-6">
            Edit Your Profile
          </Heading>
          <Show when={profile()}>
            <UpdateUserProfileForm
              initialValues={profile()}
              onSubmit={updateProfile}
              disabled={updating.pending}
            >
              <Button type="submit" class="w-full" disabled={updating.pending}>
                <Show when={updating.pending}>
                  <Spinner class="mr-2" size="sm" color="white"/>
                </Show>
                Save
              </Button>
            </UpdateUserProfileForm>
          </Show>
        </Panel>
      </PageContent>
    </Page>
  );
}

export default ProfilePage;