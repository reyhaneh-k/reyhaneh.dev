import type { ReactNode } from "react";

import type { WritingKind } from "@/pages/writing/index.types";

type FeedCardTone = "surface" | "muted" | "ink";

interface FeedCardBase {
  kind: WritingKind;
  tone?: FeedCardTone;
  className?: string;
  chipClassName?: string;
  showChip?: boolean;
  children: ReactNode;
}

type FeedCardProps = FeedCardBase &
  (
    | {
        to: "/writing/articles/$article_id";
        params: { article_id: string };
      }
    | {
        to: "/writing/posts/$post_id";
        params: { post_id: string };
      }
    | {
        to: "/writing/carousels/$carousel_id";
        params: { carousel_id: string };
      }
  );

export type { FeedCardProps, FeedCardTone };
