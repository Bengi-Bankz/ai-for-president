// utils-replay.ts
// Utility for detecting replay mode and parsing replay query parameters

export type ReplayParams = {
  isReplayMode: boolean;
  game?: string;
  version?: string;
  mode?: string;
  event?: string;
  rgs_url?: string;
  currency?: string;
  amount?: string;
  lang?: string;
  device?: string;
  social?: string;
};

export function getReplayParams(): ReplayParams {
  const params = new URLSearchParams(window.location.search);
  const isReplayMode = params.get('replay') === 'true';
  return {
    isReplayMode,
    game: params.get('game') || undefined,
    version: params.get('version') || undefined,
    mode: params.get('mode') || undefined,
    event: params.get('event') || undefined,
    rgs_url: params.get('rgs_url') || undefined,
    currency: params.get('currency') || undefined,
    amount: params.get('amount') || undefined,
    lang: params.get('lang') || undefined,
    device: params.get('device') || undefined,
    social: params.get('social') || undefined,
  };
}
