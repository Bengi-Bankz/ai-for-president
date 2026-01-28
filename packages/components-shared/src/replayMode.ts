// replayMode.ts
// Utility to detect replay mode from URL for use in shared components

export function isReplayMode(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('replay') === 'true';
}
