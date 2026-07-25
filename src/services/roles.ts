import { DEMO_USERS, PowerChainUserProfile } from '../data/users';

export class UserRolesService {
  private static currentUser: PowerChainUserProfile = DEMO_USERS[0];
  private static listeners: Set<() => void> = new Set();

  public static getCurrentUser(): PowerChainUserProfile {
    return this.currentUser;
  }

  public static switchUser(userId: string): PowerChainUserProfile {
    const found = DEMO_USERS.find((u) => u.id === userId);
    if (found) {
      this.currentUser = found;
      this.notify();
    }
    return this.currentUser;
  }

  public static hasPermission(permission: string): boolean {
    return this.currentUser.permissions.includes(permission) || this.currentUser.role === 'Vault Admin';
  }

  public static subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private static notify(): void {
    this.listeners.forEach((l) => l());
  }
}
