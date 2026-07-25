import React from 'react';

export interface AIProviderLogoProps {
  provider: 'google' | 'gemini' | 'openai' | 'anthropic' | 'claude' | 'deepseek' | 'meta' | 'llama' | 'xai' | 'grok' | 'powerchain';
  className?: string;
  size?: number;
}

export const GeminiLogo: React.FC<{ className?: string; size?: number }> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path
      d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
      fill="url(#gemini_grad)"
    />
    <defs>
      <linearGradient id="gemini_grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1A73E8" />
        <stop offset="0.35" stopColor="#8AB4F8" />
        <stop offset="0.7" stopColor="#A142F4" />
        <stop offset="1" stopColor="#E37400" />
      </linearGradient>
    </defs>
  </svg>
);

export const OpenAILogo: React.FC<{ className?: string; size?: number }> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 10.308 0a6.008 6.008 0 0 0-5.7831 4.14 6.0651 6.0651 0 0 0-4.043 2.87 6.02 6.02 0 0 0 .736 6.94 5.9847 5.9847 0 0 0 .5156 4.9108 6.0462 6.0462 0 0 0 6.5099 2.9 6.0651 6.0651 0 0 0 4.9482 2.24 6.008 6.008 0 0 0 5.7832-4.14 6.0651 6.0651 0 0 0 4.043-2.87 6.0152 6.0152 0 0 0-.736-6.94ZM13.698 22.0336a4.512 4.512 0 0 1-2.906-1.054l.1428-.082 4.8385-2.7935a.7745.7745 0 0 0 .3872-.671v-6.8175l2.0537 1.1857a.1503.1503 0 0 1 .0753.1162v5.6027a4.5292 4.5292 0 0 1-4.5915 4.5134ZM3.1252 17.8182a4.512 4.512 0 0 1-.5367-3.048l.1428.0863 4.8385 2.7935a.7745.7745 0 0 0 .7745 0l5.9038-3.4087v2.3715a.1503.1503 0 0 1-.0628.1235l-4.8517 2.8003a4.5292 4.5292 0 0 1-6.2084-1.6384ZM1.9161 8.2862a4.512 4.512 0 0 1 2.3693-1.994l-.0001.1646v5.587a.7745.7745 0 0 0 .3873.671l5.9038 3.4087-2.0537 1.1857a.1503.1503 0 0 1-.1381.0073l-4.8517-2.8003A4.5292 4.5292 0 0 1 1.9161 8.2862ZM10.302 1.9664a4.512 4.512 0 0 1 2.906 1.054l-.1428.082L8.2267 5.8959a.7745.7745 0 0 0-.3872.671v6.8175l-2.0537-1.1857a.1503.1503 0 0 1-.0753-.1162V6.48a4.5292 4.5292 0 0 1 4.5915-4.5136ZM20.8748 6.1818a4.512 4.512 0 0 1 .5367 3.048l-.1428-.0863-4.8385-2.7935a.7745.7745 0 0 0-.7745 0l-5.9038 3.4087V7.3872a.1503.1503 0 0 1 .0628-.1235l4.8517-2.8003a4.5292 4.5292 0 0 1 6.2084 1.6384ZM22.0839 15.7138a4.512 4.512 0 0 1-2.3693 1.994v-.1646v-5.587a.7745.7745 0 0 0-.3873-.671l-5.9038-3.4087 2.0537-1.1857a.1503.1503 0 0 1 .1381-.0073l4.8517 2.8003a4.5292 4.5292 0 0 1 1.6169 6.2238ZM12 15.228a3.228 3.228 0 1 1 3.228-3.228A3.2317 3.2317 0 0 1 12 15.228Z" />
  </svg>
);

export const AnthropicLogo: React.FC<{ className?: string; size?: number }> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M17.3 3H21L12.7 21H9L17.3 3ZM6.7 3H3L11.3 21H15L6.7 3Z" />
  </svg>
);

export const DeepSeekLogo: React.FC<{ className?: string; size?: number }> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path
      d="M12 2L14.85 8.15L21.5 9.1L16.75 13.73L17.87 20.35L12 17.27L6.13 20.35L7.25 13.73L2.5 9.1L9.15 8.15L12 2Z"
      fill="#0066FF"
    />
    <circle cx="12" cy="12" r="3" fill="#00D2FF" />
  </svg>
);

export const MetaLlamaLogo: React.FC<{ className?: string; size?: number }> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M12 15.5C10.5 15.5 8.5 13 8.5 10.5C8.5 8 10 6.5 12 6.5C14 6.5 15.5 8 15.5 10.5C15.5 13 13.5 15.5 12 15.5ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM18.5 12C18.5 15.59 15.59 18.5 12 18.5C8.41 18.5 5.5 15.59 5.5 12C5.5 8.41 8.41 5.5 12 5.5C15.59 5.5 18.5 8.41 18.5 12Z" />
  </svg>
);

export const XAiGrokLogo: React.FC<{ className?: string; size?: number }> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const PowerChainAILogo: React.FC<{ className?: string; size?: number }> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
      fill="#10B981"
      stroke="#059669"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const AIProviderIcon: React.FC<AIProviderLogoProps> = ({ provider, className = 'w-5 h-5', size }) => {
  switch (provider.toLowerCase()) {
    case 'google':
    case 'gemini':
      return <GeminiLogo className={className} size={size} />;
    case 'openai':
      return <OpenAILogo className={className} size={size} />;
    case 'anthropic':
    case 'claude':
      return <AnthropicLogo className={className} size={size} />;
    case 'deepseek':
      return <DeepSeekLogo className={className} size={size} />;
    case 'meta':
    case 'llama':
      return <MetaLlamaLogo className={className} size={size} />;
    case 'xai':
    case 'grok':
      return <XAiGrokLogo className={className} size={size} />;
    case 'powerchain':
    default:
      return <PowerChainAILogo className={className} size={size} />;
  }
};
