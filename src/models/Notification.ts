export interface Notification {
  id: string;
  date: string;
  type: string;
  message: string;
  read: boolean;
  removed: boolean;
  userId: string;
  externalId: string;
}
