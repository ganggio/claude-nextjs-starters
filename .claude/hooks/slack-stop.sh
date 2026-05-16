#!/usr/bin/env bash
# Stop hook
# turn 종료 시 알림. 무한루프 가드 + 10초 임계 적용.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/slack-common.sh
source "${SCRIPT_DIR}/lib/slack-common.sh"

slack_enabled || exit 0

INPUT=$(cat)

# 1) 무한루프 가드 (최우선)
STOP_HOOK_ACTIVE=$(printf '%s' "$INPUT" | jq -r '.stop_hook_active // false')
[ "$STOP_HOOK_ACTIVE" = "true" ] && exit 0

SESSION_ID=$(printf '%s' "$INPUT"  | jq -r '.session_id // ""')
CWD=$(printf '%s' "$INPUT"         | jq -r '.cwd // empty')
STOP_REASON=$(printf '%s' "$INPUT" | jq -r '.stop_reason // ""')
[ -z "$CWD" ] && CWD="${SLACK_PROJECT_DIR}"

# 2) 경과 시간 계산
START_FILE="${SLACK_STATE_DIR}/start-${SESSION_ID}"
ELAPSED=0
if [ -f "$START_FILE" ]; then
  START=$(cat "$START_FILE" 2>/dev/null || echo "0")
  NOW_SEC=$(date +%s)
  ELAPSED=$((NOW_SEC - START))
  rm -f "$START_FILE"
fi

# 3) 임계값 가드 (기본 10초, env로 조정 가능)
THRESHOLD="${CLAUDE_SLACK_STOP_THRESHOLD:-10}"
if [ "$ELAPSED" -lt "$THRESHOLD" ]; then
  exit 0
fi

WEBHOOK=$(slack_get_webhook) || exit 0

# 4) 메시지 빌드
HOST=$(slack_hostname)
PROJECT=$(basename "$CWD")
BRANCH=$(slack_git_branch "$CWD" || printf '(no git)')
SESSION_SHORT=$(slack_short_session "$SESSION_ID")
NOW=$(slack_kst_now)

# 경과 시간 사람 친화적 포맷
if [ "$ELAPSED" -lt 60 ]; then
  ELAPSED_HUMAN="${ELAPSED}초"
else
  MIN=$((ELAPSED / 60))
  SEC=$((ELAPSED % 60))
  ELAPSED_HUMAN="${MIN}분 ${SEC}초"
fi

PREVIEW=":white_check_mark: [${PROJECT}] 작업 완료 (${ELAPSED_HUMAN})"

PAYLOAD=$(jq -n \
  --arg text    "$PREVIEW" \
  --arg project "$PROJECT" \
  --arg branch  "$BRANCH" \
  --arg host    "$HOST" \
  --arg session "$SESSION_SHORT" \
  --arg elapsed "$ELAPSED_HUMAN" \
  --arg reason  "$STOP_REASON" \
  --arg cwd     "$CWD" \
  --arg now     "$NOW" \
'{
  text: $text,
  blocks: [
    { type: "section",
      text: { type: "mrkdwn",
        text: (":white_check_mark: *Claude Code 작업 완료* — `" + $project + "` (" + $elapsed + ")") } },
    { type: "context",
      elements: [
        { type: "mrkdwn", text: (
            ":seedling: `" + $branch + "`  •  " +
            ":computer: `" + $host   + "`  •  " +
            ":id: `"       + $session + "`  •  " +
            ":clock3: "    + $now
          ) }
      ] }
  ]
}')

slack_post_async "$WEBHOOK" "$PAYLOAD"
exit 0
