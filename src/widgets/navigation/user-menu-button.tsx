import { useSessionProfile } from "@/entities/user-profile";
import { useDarkMode } from "@/features/appearance";
import { useSignOut } from "@/features/session/sign-out";
import { ArrowRightOnRectangleIcon, Avatar, ButtonMenu, ButtonMenuProps, MenuItem, MoonIcon, PencilIcon, SunIcon, UserIcon } from "@/shared/ui";
import { Match, Switch } from "solid-js";

export type UserMenuButtonProps = Omit<ButtonMenuProps, "content">;

export function UserMenuButton(props: UserMenuButtonProps) {
  const darkMode = useDarkMode();
  const signOut = useSignOut();
  const profile = useSessionProfile();

  return (
    <ButtonMenu content={<UserIcon/>} {...props}>
      <MenuItem class="flex flex-col items-center w-60 py-4" inactive>
        <Avatar
          src={profile()?.avatarUrl}
          initials={profile()?.avatarInitials}
        />
        <span class="text-lg font-bold mt-2">{profile()?.fullName}</span>
      </MenuItem>
      <MenuItem>
        <PencilIcon class="inline-block mr-4" size='xs'/>
        Edit profile
      </MenuItem>

      <Switch>
        <Match when={darkMode.isDarkMode}>
          <MenuItem onClick={darkMode.toggle}>
            <SunIcon class="inline-block mr-4" size="xs"/>
            Use light theme
          </MenuItem>
        </Match>
        <Match when={!darkMode.isDarkMode}>
          <MenuItem onClick={darkMode.toggle}>
            <MoonIcon class="inline-block mr-4" size="xs"/>
            Use dark theme
          </MenuItem>
        </Match>
      </Switch>

      <MenuItem onClick={signOut}>
        <ArrowRightOnRectangleIcon class="inline-block mr-4" size="xs"/>
        Logout
      </MenuItem>
    </ButtonMenu>
  );
}