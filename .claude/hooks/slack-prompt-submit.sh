#!/usr/bin/env bash
# UserPromptSubmit hook
# turn 시작 시각을 파일에 기록 → Stop hook이 경과 시간 계산에 사용
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/slack-common.sh
source "${SCRIPT_DIR}/lib/slack-common.sh"

INPUT=$(cat)
SESSION_ID=$(printf '%s' "$INPUT" | jq -r '.session_id // ""')
[ -z "$SESSION_ID" ] && exit 0

printf '%s' "$(date +%s)" > "${SLACK_STATE_DIR}/start-${SESSION_ID}"
exit 0
