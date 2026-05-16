#!/usr/bin/env bash
# Claude Code Slack 알림 공통 라이브러리
# 권한 요청/완료 hook 스크립트가 source 해서 사용한다.
set -euo pipefail

# ─── 경로 ──────────────────────────────────────────────────────────
# CLAUDE_PROJECT_DIR이 비어 있으면 호출자 cwd 사용
SLACK_PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$PWD}"
SLACK_STATE_DIR="${SLACK_PROJECT_DIR}/.claude/state/slack-hooks"
mkdir -p "$SLACK_STATE_DIR"

# ─── 시크릿 조회: settings.local.json의 env에서 주입된 환경변수 ─────
slack_get_webhook() {
  if [ -n "${SLACK_WEBHOOK_URL:-}" ]; then
    printf '%s' "$SLACK_WEBHOOK_URL"
    return 0
  fi
  return 1
}

# 사용자 멘션 (그룹 채널에서만 의미 있음). 기본은 빈값 = 멘션 없음
slack_get_user_id() {
  if [ -n "${SLACK_USER_ID:-}" ]; then
    printf '%s' "$SLACK_USER_ID"
    return 0
  fi
  return 1
}

# ─── 컨텍스트 수집 ──────────────────────────────────────────────────
slack_hostname() {
  scutil --get LocalHostName 2>/dev/null || hostname -s
}

slack_git_branch() {
  local dir="$1"
  git -C "$dir" rev-parse --is-inside-work-tree >/dev/null 2>&1 || return 1
  git -C "$dir" branch --show-current 2>/dev/null
}

slack_short_session() {
  printf '%s' "${1:0:8}"
}

slack_kst_now() {
  TZ="Asia/Seoul" date "+%Y-%m-%d %H:%M:%S KST"
}

# ─── 비동기 POST ───────────────────────────────────────────────────
# turn 종료를 지연시키지 않도록 백그라운드 fork + disown
# 429(rate limit) 시 최대 3회 재시도
slack_post_async() {
  local webhook="$1"
  local payload="$2"
  local logfile="${SLACK_STATE_DIR}/post.log"

  (
    local attempt=0
    local max_attempts=3
    local response=""
    while [ $attempt -lt $max_attempts ]; do
      response=$(curl -sS -o /dev/null -w "%{http_code}" \
        -X POST -H "Content-Type: application/json" \
        --max-time 8 \
        --data "$payload" \
        "$webhook" 2>>"$logfile") || true

      if [ "$response" = "200" ]; then
        exit 0
      fi
      if [ "$response" = "429" ]; then
        sleep 2
        attempt=$((attempt + 1))
        continue
      fi
      attempt=$((attempt + 1))
      sleep 1
    done
    printf '[%s] slack post failed after %d attempts (last=%s)\n' \
      "$(date '+%Y-%m-%d %H:%M:%S')" "$max_attempts" "${response:-none}" >> "$logfile"
  ) </dev/null >/dev/null 2>&1 &
  disown 2>/dev/null || true
}

# ─── ON/OFF 스위치 ──────────────────────────────────────────────────
# CLAUDE_SLACK_NOTIFY=0 이면 알림 끔 (기본 ON)
slack_enabled() {
  [ "${CLAUDE_SLACK_NOTIFY:-1}" != "0" ]
}
