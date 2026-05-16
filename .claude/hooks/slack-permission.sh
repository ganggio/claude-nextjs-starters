#!/usr/bin/env bash
# Notification hook (matcher="permission_prompt")
# 권한 다이얼로그가 뜨는 즉시 Slack DM으로 알림. 항상 발송.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/slack-common.sh
source "${SCRIPT_DIR}/lib/slack-common.sh"

slack_enabled || exit 0

INPUT=$(cat)
SESSION_ID=$(printf '%s' "$INPUT" | jq -r '.session_id // ""')
MESSAGE=$(printf '%s'   "$INPUT" | jq -r '.message // "권한 요청"')
CWD=$(printf '%s'       "$INPUT" | jq -r '.cwd // empty')
[ -z "$CWD" ] && CWD="${SLACK_PROJECT_DIR}"

WEBHOOK=$(slack_get_webhook) || exit 0

HOST=$(slack_hostname)
PROJECT=$(basename "$CWD")
BRANCH=$(slack_git_branch "$CWD" || printf '(no git)')
SESSION_SHORT=$(slack_short_session "$SESSION_ID")
NOW=$(slack_kst_now)

# 멘션 (있을 때만)
MENTION=""
if USER_ID=$(slack_get_user_id); then
  MENTION="<@${USER_ID}> "
fi

PREVIEW=":rotating_light: [${PROJECT}] 권한 요청: ${MESSAGE}"

PAYLOAD=$(jq -n \
  --arg text    "$PREVIEW" \
  --arg mention "$MENTION" \
  --arg message "$MESSAGE" \
  --arg host    "$HOST" \
  --arg project "$PROJECT" \
  --arg branch  "$BRANCH" \
  --arg session "$SESSION_SHORT" \
  --arg cwd     "$CWD" \
  --arg now     "$NOW" \
'{
  text: $text,
  blocks: [
    { type: "header",
      text: { type: "plain_text", text: ":rotating_light: Claude Code 권한 요청", emoji: true } },
    { type: "section",
      text: { type: "mrkdwn", text: ($mention + "*" + $message + "*") } },
    { type: "section",
      fields: [
        { type: "mrkdwn", text: ("*프로젝트*\n`" + $project + "`") },
        { type: "mrkdwn", text: ("*브랜치*\n`"   + $branch  + "`") },
        { type: "mrkdwn", text: ("*호스트*\n`"   + $host    + "`") },
        { type: "mrkdwn", text: ("*세션*\n`"     + $session + "`") }
      ] },
    { type: "context",
      elements: [
        { type: "mrkdwn", text: (":file_folder: `" + $cwd + "`  •  :clock3: " + $now) }
      ] }
  ]
}')

slack_post_async "$WEBHOOK" "$PAYLOAD"
exit 0
