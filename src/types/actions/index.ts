export interface ActionParameter {
  name: string;
  label: string;
  required: boolean;
  type?: 'text' | 'number' | 'select';
  options?: { label: string; value: string }[];
}

export interface ActionSpec {
  icon: string;
  title: string;
  description: string;
  label: string;
  href: string;
  parameters?: ActionParameter[];
}

export interface BlinkActionResponse {
  icon: string;
  title: string;
  description: string;
  label: string;
  disabled?: boolean;
  links?: {
    actions: ActionSpec[];
  };
  error?: {
    message: string;
  };
}
