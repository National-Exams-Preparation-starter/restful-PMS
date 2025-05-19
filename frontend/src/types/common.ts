export interface apiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export type NavItem = {
  name: string;
  href?: string;
  icon?: string;
};
