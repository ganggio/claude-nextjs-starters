"use client";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { mockRecentActivities } from "@/lib/mock-data";
import { formatRelativeTime } from "@/lib/format";

/**
 * 알림 메뉴 (헤더 우측)
 * - 데모: mock 활동 데이터를 알림으로 표시
 * - 실제로는 WebSocket/SSE 등으로 실시간 알림 수신
 */
export function NotificationsMenu() {
  const notifications = mockRecentActivities;
  const hasUnread = notifications.length > 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="알림"
          className="relative"
        >
          <Bell className="size-4" />
          {hasUnread && (
            <span
              aria-hidden
              className="absolute right-2 top-2 size-1.5 rounded-full bg-primary"
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="px-4 py-3">
          <h3 className="text-sm font-semibold">알림</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            최근 {notifications.length}건의 활동
          </p>
        </div>
        <Separator />
        <ScrollArea className="h-72">
          <ul className="flex flex-col">
            {notifications.map((item) => (
              <li
                key={item.id}
                className="px-4 py-3 border-b last:border-b-0 hover:bg-muted/50 transition-colors"
              >
                <p className="text-sm">
                  <span className="font-medium">{item.user}</span>
                  <span className="text-muted-foreground"> · {item.action}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatRelativeTime(item.timestamp)}
                </p>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
