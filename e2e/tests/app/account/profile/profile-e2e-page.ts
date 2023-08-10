import { UserProfile } from "@/entities/user-profile/schemas/user-profile-schema.js";
import { Locator, Page, Response } from "playwright";

export class ProfilePage {
  public fullName: Locator;
  public avatar: Locator;
  public createdDate: Locator;
  public updateProfileForm: UpdateProfileForm;

  public constructor(
    public readonly page: Page,
    public readonly userProfile: UserProfile
  ) {
    this.fullName = page.getByRole('heading', { name: userProfile.fullName });
    this.avatar = page.getByRole('main').locator('div').filter({ hasText: new RegExp(`^${userProfile.avatarInitials}$`) });
    this.createdDate = page.getByText(`User since ${(new Date(userProfile.createdAt)).toLocaleDateString()}`);
    this.updateProfileForm = new UpdateProfileForm(page);
  }

  public goto() {
    return this.page.goto('/app/account/profile');
  }
}

export class UpdateProfileForm {
  public fullNameInput: Locator;
  public fullNameError: Locator;
  public preferredNameInput: Locator;
  public preferredNameError: Locator;
  public avatarInitialsInput: Locator;
  public avatarInitialsError: Locator;
  public avatarImageInput: Locator;
  public submitButton: Locator;
  public submitResponse?: Response;

  public constructor(
    public readonly page: Page,
  ) {
    this.fullNameInput = page.getByLabel('Full Name');
    this.fullNameError = page.locator('#fullName-error');
    this.preferredNameInput = page.getByLabel('Preferred Name');
    this.preferredNameError = page.locator('#preferredName-error');
    this.avatarInitialsInput = page.getByLabel('Avatar Initials');
    this.avatarInitialsError = page.locator('#avatarInitials-error');
    this.avatarImageInput = page.getByLabel('Avatar Image');
    this.submitButton = page.getByRole('button', { name: /save/i });
  }

  public async fill(userProfile: Partial<UserProfile>) {
    if (userProfile.fullName !== undefined)
      await this.fillFullName(userProfile.fullName);

    if (userProfile.preferredName !== undefined)
      await this.fillPreferredName(userProfile.preferredName);

    if (userProfile.avatarInitials !== undefined)
      await this.fillAvatarInitials(userProfile.avatarInitials);
  }

  public async submitInvalid() {
    await this.submitButton.click();
  }

  public async submitValid() {
    const submitPromise = this.page.waitForResponse(/api\/userProfiles.updateProfile/);
    await this.submitButton.click();
    this.submitResponse = await submitPromise;
  }

  public async fillFullName(fullName: string) {
    await this.fullNameInput.fill(fullName);
  }

  public async fillPreferredName(preferredName: string) {
    await this.preferredNameInput.fill(preferredName);
  }

  public async fillAvatarInitials(avatarInitials: string) {
    await this.avatarInitialsInput.fill(avatarInitials);
  }

  public async hasErrors() {
    return (await Promise.all([
      this.fullNameError.isVisible(),
      this.preferredNameError.isVisible(),
      this.avatarInitialsError.isVisible(),
    ])).some(Boolean);
  }
}